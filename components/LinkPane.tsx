"use client";

import { useState } from "react";
import { validateUrl, isDirectMediaUrl } from "@/lib/url";

interface LinkPaneProps {
  onUrlChange: (url: string) => void;
  url: string;
}

export default function LinkPane({ onUrlChange, url }: LinkPaneProps) {
  const [touched, setTouched] = useState(false);

  const urlError = touched ? validateUrl(url) : null;
  const isDirect = url.trim() !== "" && !urlError && isDirectMediaUrl(url);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="media-url" className="text-sm font-medium text-zinc-300">
          direct media URL
        </label>
        <div className="relative">
          <input
            id="media-url"
            type="url"
            value={url}
            onChange={(e) => { onUrlChange(e.target.value); }}
            onBlur={() => setTouched(true)}
            placeholder="https://example.com/video.mp4"
            className={`w-full px-4 py-3 rounded-xl bg-zinc-800/70 border text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-400/40 ${
              urlError
                ? "border-red-500/60 focus:border-red-500"
                : "border-zinc-700/50 focus:border-cyan-400/60"
            }`}
          />
          {url && !urlError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isDirect ? (
                <span className="text-xs text-emerald-400">direct link detected</span>
              ) : (
                <span className="text-xs text-amber-400">may not be a direct link</span>
              )}
            </div>
          )}
        </div>

        {urlError && (
          <p className="text-xs text-red-400">{urlError}</p>
        )}

        <p className="text-xs text-zinc-500">
          works best with direct media links like .mp4 or .webm. CORS must allow browser access.
        </p>
      </div>

      {/* Info card */}
      <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
        <p className="text-xs font-medium text-zinc-400 mb-2">how link mode works</p>
        <ul className="text-xs text-zinc-500 space-y-1 list-disc list-inside">
          <li>your browser fetches the media file directly</li>
          <li>no proxy or server is involved</li>
          <li>if the server blocks cross-origin requests, the fetch will fail</li>
          <li>in that case, download the file and use upload instead</li>
        </ul>
      </div>
    </div>
  );
}
