import AuroraBackground from "@/components/AuroraBackground";
import ConverterCard from "@/components/ConverterCard";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Aurora background layer */}
      <div className="relative overflow-hidden">
        <AuroraBackground />

        {/* Hero section */}
        <section className="relative pt-36 pb-16 px-6">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
            {/* Badge row */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-2.5 py-1 rounded-full border text-xs font-medium bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                runs locally
              </span>
              <span className="px-2.5 py-1 rounded-full border text-xs font-medium bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                no uploads
              </span>
              <span className="px-2.5 py-1 rounded-full border text-xs font-medium bg-blue-500/10 text-blue-400 border-blue-500/20">
                browser-based
              </span>
            </div>

            {/* Hero headline */}
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  audoRa
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
                extract MP3 audio from a video file, locally in your browser.
              </p>
            </div>

            {/* Sub-description */}
            <p className="text-base text-zinc-500 max-w-lg leading-relaxed">
              all processing happens on your device using ffmpeg.wasm. no files are sent to any server.
              works entirely offline once loaded.
            </p>
          </div>
        </section>

        {/* Converter card */}
        <section className="relative pb-32 px-6">
          <div className="max-w-2xl mx-auto">
            <ConverterCard />
          </div>
        </section>
      </div>

      {/* Features strip */}
      <section className="py-24 px-6 border-t border-zinc-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<LockIcon className="w-5 h-5" />}
              title="fully private"
              description="your video never leaves your device. all transcoding runs inside your browser using WebAssembly."
            />
            <FeatureCard
              icon={<CpuIcon className="w-5 h-5" />}
              title="powered by ffmpeg.wasm"
              description="industry-standard ffmpeg, compiled to WebAssembly. full bitrate control from 128 to 320 kbps."
            />
            <FeatureCard
              icon={<TrimIcon className="w-5 h-5" />}
              title="trim and export"
              description="optionally specify a start time and duration to export only a section of the audio."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  );
}

function TrimIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
    </svg>
  );
}
