"use client";

import { useState } from "react";
import UploadPane from "./UploadPane";
import LinkPane from "./LinkPane";
import OptionsPanel from "./OptionsPanel";
import ProgressPanel from "./ProgressPanel";
import OutputPanel from "./OutputPanel";
import { useTranscoder } from "@/hooks/useTranscoder";
import { DEFAULT_BITRATE, BitrateValue } from "@/lib/constants";
import { validateUrl } from "@/lib/url";
import { isTrimValid } from "@/lib/validators";

type Tab = "upload" | "link";

export default function ConverterCard() {
  const [tab, setTab] = useState<Tab>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [bitrate, setBitrate] = useState<BitrateValue>(DEFAULT_BITRATE);
  const [mono, setMono] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [showTrimErrors, setShowTrimErrors] = useState(false);

  const transcoder = useTranscoder();
  const isActive = transcoder.state === "loading" || transcoder.state === "converting";
  const isFinished = transcoder.state === "done" || transcoder.state === "error";

  const canConvert =
    !isActive &&
    transcoder.state !== "done" &&
    (tab === "upload" ? !!selectedFile : !validateUrl(url));

  const handleConvert = async () => {
    setShowTrimErrors(true);
    if (!isTrimValid({ startTime, duration })) return;

    const options = { bitrate, mono, startTime, duration };

    if (tab === "upload" && selectedFile) {
      await transcoder.convertFromFile(selectedFile, options);
    } else if (tab === "link" && !validateUrl(url)) {
      await transcoder.convertFromUrl(url, options);
    }
  };

  const handleReset = () => {
    transcoder.reset();
    setSelectedFile(null);
    setUrl("");
    setStartTime("");
    setDuration("");
    setShowTrimErrors(false);
  };

  return (
    <div className="relative bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl shadow-black/30">
      {/* Aurora inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-400/5 pointer-events-none" />

      {!isFinished && (
        <>
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-zinc-900/70 border border-zinc-800">
            <TabButton active={tab === "upload"} onClick={() => setTab("upload")}>
              upload
            </TabButton>
            <TabButton active={tab === "link"} onClick={() => setTab("link")}>
              link
            </TabButton>
          </div>

          {/* Input pane */}
          <div>
            {tab === "upload" ? (
              <UploadPane onFileSelected={setSelectedFile} selectedFile={selectedFile} />
            ) : (
              <LinkPane url={url} onUrlChange={setUrl} />
            )}
          </div>

          {/* Options */}
          <OptionsPanel
            bitrate={bitrate}
            onBitrateChange={setBitrate}
            mono={mono}
            onMonoChange={setMono}
            startTime={startTime}
            onStartTimeChange={setStartTime}
            duration={duration}
            onDurationChange={setDuration}
            showTrimErrors={showTrimErrors}
          />

          {/* Convert button */}
          <button
            onClick={handleConvert}
            disabled={!canConvert}
            className="w-full px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            convert to MP3
          </button>

          {/* Disclaimer */}
          <p className="text-xs text-zinc-600 text-center">
            Only convert content you own or have permission to use.
          </p>
        </>
      )}

      {/* Progress panel */}
      {isActive && (
        <ProgressPanel
          state={transcoder.state}
          progress={transcoder.progress}
          statusText={transcoder.statusText}
          logs={transcoder.logs}
        />
      )}

      {/* Output panel */}
      {isFinished && (
        <OutputPanel
          state={transcoder.state}
          outputUrl={transcoder.outputUrl}
          outputFileName={transcoder.outputFileName}
          outputSize={transcoder.outputSize}
          logs={transcoder.logs}
          error={transcoder.error}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-zinc-800 text-white shadow-sm"
          : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {children}
      {active && (
        <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full mt-1 mx-auto w-8" />
      )}
    </button>
  );
}
