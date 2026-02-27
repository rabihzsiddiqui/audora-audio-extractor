"use client";

import { useState } from "react";
import { formatBytes } from "@/lib/file";
import { TranscoderState } from "@/hooks/useTranscoder";

interface OutputPanelProps {
  state: TranscoderState;
  outputUrl: string | null;
  outputFileName: string;
  outputSize: number | null;
  logs: string[];
  error: string | null;
  onReset: () => void;
}

export default function OutputPanel({
  state,
  outputUrl,
  outputFileName,
  outputSize,
  logs,
  error,
  onReset,
}: OutputPanelProps) {
  const [showLogs, setShowLogs] = useState(false);

  if (state === "done" && outputUrl) {
    return (
      <div className="flex flex-col gap-5 p-5 rounded-xl bg-zinc-800/30 border border-emerald-500/20">
        {/* Success header */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            MP3 ready
          </span>
          {outputSize && (
            <span className="text-xs text-zinc-500">{formatBytes(outputSize)}</span>
          )}
        </div>

        {/* Audio preview */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-zinc-500">preview</p>
          <audio
            controls
            src={outputUrl}
            className="w-full h-10 rounded-lg"
            style={{ colorScheme: "dark" }}
          />
        </div>

        {/* Output filename */}
        <p className="text-xs text-zinc-500 truncate">{outputFileName}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={outputUrl}
            download={outputFileName}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
          >
            <DownloadIcon className="w-4 h-4" />
            download MP3
          </a>
          <button
            onClick={onReset}
            className="flex-1 px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-200"
          >
            convert another
          </button>
        </div>
      </div>
    );
  }

  if (state === "error" && error) {
    return (
      <div className="flex flex-col gap-4 p-5 rounded-xl bg-zinc-800/30 border border-red-500/20">
        {/* Error header */}
        <div className="flex items-center gap-2">
          <ErrorIcon className="w-5 h-5 text-red-400 shrink-0" />
          <p className="text-sm font-medium text-red-400">conversion failed</p>
        </div>

        <p className="text-sm text-zinc-400">{error}</p>

        {/* Log toggle */}
        {logs.length > 0 && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-400 transition-colors w-fit"
            >
              <ChevronIcon
                className={`w-3 h-3 transition-transform duration-200 ${showLogs ? "rotate-90" : ""}`}
              />
              {showLogs ? "hide" : "show"} details
            </button>
            {showLogs && (
              <div className="max-h-40 overflow-y-auto rounded-lg bg-zinc-900/80 border border-zinc-800 p-3 font-mono text-xs text-zinc-500 leading-relaxed">
                {logs.map((log, i) => (
                  <div key={i} className="whitespace-pre-wrap break-all">{log}</div>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={onReset}
          className="w-fit px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-200"
        >
          try again
        </button>
      </div>
    );
  }

  return null;
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
