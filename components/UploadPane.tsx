"use client";

import { useRef, useState, useCallback } from "react";
import { formatBytes, isLargeFile, isAcceptedVideoFile, ACCEPTED_EXTENSIONS } from "@/lib/file";

interface UploadPaneProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
}

export default function UploadPane({ onFileSelected, selectedFile }: UploadPaneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!isAcceptedVideoFile(file)) {
        alert(`Unsupported file type. Accepted: ${ACCEPTED_EXTENSIONS.join(", ")}`);
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-cyan-400 bg-cyan-400/5 scale-[1.01]"
            : selectedFile
            ? "border-emerald-500/50 bg-emerald-500/5"
            : "border-zinc-700 bg-zinc-800/30 hover:border-zinc-600 hover:bg-zinc-800/50"
        }`}
      >
        {/* Aurora glow when dragging */}
        {dragging && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-violet-400/10 blur-sm pointer-events-none" />
        )}

        <UploadIcon
          className={`w-8 h-8 transition-colors ${
            dragging ? "text-cyan-400" : selectedFile ? "text-emerald-400" : "text-zinc-500"
          }`}
        />

        <div className="text-center">
          <p className="text-sm font-medium text-zinc-300">
            {selectedFile ? "change file" : "drop your video file here"}
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            or click to browse &mdash; {ACCEPTED_EXTENSIONS.join(", ")}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(",")}
          onChange={onInputChange}
          className="hidden"
        />
      </div>

      {/* Selected file info */}
      {selectedFile && (
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
            <div className="flex items-center gap-3 min-w-0">
              <FileIcon className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-100 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {selectedFile.type || "unknown type"} &bull; {formatBytes(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onFileSelected(null); }}
              className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 mt-0.5"
              aria-label="Remove file"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Large file warning */}
          {isLargeFile(selectedFile) && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <WarningIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs text-amber-400">
                Large files may take longer to convert depending on your device.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}
