"use client";

import { BITRATE_OPTIONS, BitrateValue } from "@/lib/constants";
import { validateTrim } from "@/lib/validators";

interface OptionsPanelProps {
  bitrate: BitrateValue;
  onBitrateChange: (v: BitrateValue) => void;
  mono: boolean;
  onMonoChange: (v: boolean) => void;
  startTime: string;
  onStartTimeChange: (v: string) => void;
  duration: string;
  onDurationChange: (v: string) => void;
  showTrimErrors: boolean;
}

export default function OptionsPanel({
  bitrate,
  onBitrateChange,
  mono,
  onMonoChange,
  startTime,
  onStartTimeChange,
  duration,
  onDurationChange,
  showTrimErrors,
}: OptionsPanelProps) {
  const trimErrors = showTrimErrors ? validateTrim({ startTime, duration }) : {};

  return (
    <div className="flex flex-col gap-6 p-5 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
      <p className="text-sm font-semibold text-white">options</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bitrate */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400">bitrate</label>
          <select
            value={bitrate}
            onChange={(e) => onBitrateChange(e.target.value as BitrateValue)}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700/50 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all duration-200 cursor-pointer"
          >
            {BITRATE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-zinc-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mono/Stereo */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400">channels</label>
          <div className="flex gap-2">
            <ChannelButton active={!mono} onClick={() => onMonoChange(false)}>
              stereo
            </ChannelButton>
            <ChannelButton active={mono} onClick={() => onMonoChange(true)}>
              mono
            </ChannelButton>
          </div>
        </div>

        {/* Start time */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400">
            start time{" "}
            <span className="text-zinc-600 font-normal">(mm:ss, optional)</span>
          </label>
          <input
            type="text"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            placeholder="0:00"
            className={`w-full px-3 py-2.5 rounded-lg bg-zinc-800 border text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 ${
              trimErrors.startTime
                ? "border-red-500/60 focus:border-red-500"
                : "border-zinc-700/50 focus:border-indigo-500/60"
            }`}
          />
          {trimErrors.startTime && (
            <p className="text-xs text-red-400">{trimErrors.startTime}</p>
          )}
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400">
            duration{" "}
            <span className="text-zinc-600 font-normal">(mm:ss, optional)</span>
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            placeholder="1:00"
            className={`w-full px-3 py-2.5 rounded-lg bg-zinc-800 border text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 ${
              trimErrors.duration
                ? "border-red-500/60 focus:border-red-500"
                : "border-zinc-700/50 focus:border-indigo-500/60"
            }`}
          />
          {trimErrors.duration && (
            <p className="text-xs text-red-400">{trimErrors.duration}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ChannelButton({
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
      type="button"
      onClick={onClick}
      className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-zinc-800 text-zinc-400 border border-zinc-700/50 hover:text-zinc-200 hover:bg-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}
