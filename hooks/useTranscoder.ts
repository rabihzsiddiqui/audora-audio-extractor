"use client";

import { useState, useRef, useCallback } from "react";
import { parseTime } from "@/lib/time";
import { getOutputFilename } from "@/lib/file";
import { fetchMediaBlob } from "@/lib/url";

export type TranscoderState =
  | "idle"
  | "loading"
  | "ready"
  | "converting"
  | "done"
  | "error";

export interface ConvertOptions {
  bitrate: string;
  mono: boolean;
  startTime: string;
  duration: string;
}

export interface TranscoderResult {
  state: TranscoderState;
  progress: number;
  statusText: string;
  logs: string[];
  outputUrl: string | null;
  outputFileName: string;
  outputSize: number | null;
  error: string | null;
  convertFromFile: (file: File, options: ConvertOptions) => Promise<void>;
  convertFromUrl: (url: string, options: ConvertOptions) => Promise<void>;
  reset: () => void;
}

export function useTranscoder(): TranscoderResult {
  const [state, setState] = useState<TranscoderState>("idle");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [outputSize, setOutputSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef<import("@ffmpeg/ffmpeg").FFmpeg | null>(null);
  const prevOutputUrl = useRef<string | null>(null);

  const appendLog = useCallback((msg: string) => {
    setLogs((prev) => [...prev, msg]);
  }, []);

  const revokeOutputUrl = useCallback(() => {
    if (prevOutputUrl.current) {
      URL.revokeObjectURL(prevOutputUrl.current);
      prevOutputUrl.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    revokeOutputUrl();
    setState("idle");
    setProgress(0);
    setStatusText("");
    setLogs([]);
    setOutputUrl(null);
    setOutputFileName("");
    setOutputSize(null);
    setError(null);
  }, [revokeOutputUrl]);

  const loadFfmpeg = useCallback(async () => {
    if (ffmpegRef.current) return ffmpegRef.current;

    setState("loading");
    setStatusText("loading converter...");
    appendLog("Loading ffmpeg.wasm...");

    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");

    const ffmpeg = new FFmpeg();

    ffmpeg.on("log", ({ message }) => {
      appendLog(message);
    });

    ffmpeg.on("progress", ({ progress: p }) => {
      setProgress(Math.round(Math.max(0, Math.min(100, p * 100))));
    });

    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    appendLog("ffmpeg.wasm loaded.");
    ffmpegRef.current = ffmpeg;
    setState("ready");
    return ffmpeg;
  }, [appendLog]);

  const runConversion = useCallback(
    async (blob: Blob, inputName: string, options: ConvertOptions) => {
      const { fetchFile } = await import("@ffmpeg/util");

      const ffmpeg = await loadFfmpeg();

      setState("converting");
      setProgress(0);
      setStatusText("converting...");

      const inputFileName = "input." + (inputName.split(".").pop() ?? "mp4");
      const outputName = getOutputFilename(inputName);

      appendLog(`Writing input: ${inputFileName}`);
      await ffmpeg.writeFile(inputFileName, await fetchFile(blob));

      // Build ffmpeg args
      const args: string[] = [];

      const startSecs = parseTime(options.startTime);
      if (!isNaN(startSecs) && options.startTime.trim() !== "") {
        args.push("-ss", String(startSecs));
      }

      args.push("-i", inputFileName);

      const durationSecs = parseTime(options.duration);
      if (!isNaN(durationSecs) && options.duration.trim() !== "") {
        args.push("-t", String(durationSecs));
      }

      args.push("-vn"); // no video
      args.push("-c:a", "libmp3lame");
      args.push("-b:a", `${options.bitrate}k`);

      if (options.mono) {
        args.push("-ac", "1");
      }

      args.push(outputName);

      appendLog(`Running: ffmpeg ${args.join(" ")}`);

      try {
        await ffmpeg.exec(args);
      } catch (err) {
        throw new Error(`Conversion failed: ${String(err)}`);
      }

      appendLog("Reading output...");
      const data = await ffmpeg.readFile(outputName);
      // .slice() copies into a plain ArrayBuffer, required by Blob in strict TS
      const blobPart = data instanceof Uint8Array
        ? data.slice()
        : new TextEncoder().encode(String(data));
      const mp3Blob = new Blob([blobPart], { type: "audio/mpeg" });

      revokeOutputUrl();
      const url = URL.createObjectURL(mp3Blob);
      prevOutputUrl.current = url;

      setOutputUrl(url);
      setOutputFileName(outputName);
      setOutputSize(mp3Blob.size);
      setProgress(100);
      setStatusText("done!");
      setState("done");

      // Cleanup ffmpeg virtual FS
      try {
        await ffmpeg.deleteFile(inputFileName);
        await ffmpeg.deleteFile(outputName);
      } catch {
        // Non-critical
      }
    },
    [loadFfmpeg, appendLog, revokeOutputUrl]
  );

  const convertFromFile = useCallback(
    async (file: File, options: ConvertOptions) => {
      revokeOutputUrl();
      setLogs([]);
      setError(null);

      try {
        await runConversion(file, file.name, options);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setState("error");
        setStatusText("error");
        appendLog(`ERROR: ${msg}`);
      }
    },
    [runConversion, revokeOutputUrl, appendLog]
  );

  const convertFromUrl = useCallback(
    async (url: string, options: ConvertOptions) => {
      revokeOutputUrl();
      setLogs([]);
      setError(null);

      try {
        setState("loading");
        setStatusText("fetching media from URL...");
        appendLog(`Fetching: ${url}`);

        const { blob, filename } = await fetchMediaBlob(url);
        appendLog(`Fetched ${filename} (${blob.size} bytes)`);

        await runConversion(blob, filename, options);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setState("error");
        setStatusText("error");
        appendLog(`ERROR: ${msg}`);
      }
    },
    [runConversion, revokeOutputUrl, appendLog]
  );

  return {
    state,
    progress,
    statusText,
    logs,
    outputUrl,
    outputFileName,
    outputSize,
    error,
    convertFromFile,
    convertFromUrl,
    reset,
  };
}
