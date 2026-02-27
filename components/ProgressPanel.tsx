"use client";

import { useState } from "react";
import { TranscoderState } from "@/hooks/useTranscoder";

interface ProgressPanelProps {
  state: TranscoderState;
  progress: number;
  statusText: string;
  logs: string[];
}

export default function ProgressPanel({ state, progress, statusText, logs }: ProgressPanelProps) {
  const [showLogs, setShowLogs] = useState(false);

  const isActive = state === "loading" || state === "converting";

  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
      {/* Status row */}
      <div className="flex items-center gap-3">
        {isActive ? (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>
        ) : state === "done" ? (
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        ) : (
          <span className="flex h-2.5 w-2.5 rounded-full bg-zinc-600" />
        )}
        <p className="text-sm font-medium text-zinc-300">{statusText}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="h-2 w-full rounded-full bg-zinc-700/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 transition-all duration-300"
            style={{
              width: `${progress}%`,
              boxShadow: isActive ? "0 0 12px rgba(34, 211, 238, 0.5)" : undefined,
            }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-zinc-500">{progress}%</span>
          {state === "converting" && (
            <span className="text-xs text-cyan-400/70">converting...</span>
          )}
        </div>
      </div>

      {/* Logs toggle */}
      {logs.length > 0 && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-400 transition-colors w-fit"
          >
            <ChevronIcon
              className={`w-3 h-3 transition-transform duration-200 ${showLogs ? "rotate-90" : ""}`}
            />
            {showLogs ? "hide" : "show"} details ({logs.length} messages)
          </button>

          {showLogs && (
            <div className="max-h-32 overflow-y-auto rounded-lg bg-zinc-900/80 border border-zinc-800 p-3 font-mono text-xs text-zinc-500 leading-relaxed">
              {logs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap break-all">{log}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
