import type { Metadata } from "next";
import AuroraBackground from "@/components/AuroraBackground";
import { GITHUB_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About - audoRa",
  description: "How audoRa works: local audio extraction using ffmpeg.wasm in the browser.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative overflow-hidden">
        <AuroraBackground />

        {/* Header */}
        <section className="relative pt-36 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-4 mb-12">
              <span className="px-2.5 py-1 rounded-full border text-xs font-medium bg-indigo-500/10 text-indigo-400 border-indigo-500/20 w-fit">
                architecture
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                how audoRa works
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">
                audoRa converts video to MP3 entirely inside your browser using WebAssembly.
                no data ever leaves your device.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Content */}
      <section className="py-8 pb-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* Architecture */}
          <div className="p-6 md:p-8 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">architecture</h2>
            <div className="flex flex-col gap-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                audoRa uses <strong className="text-zinc-200">ffmpeg.wasm</strong>, a port of ffmpeg compiled to
                WebAssembly, to transcode media files directly in your browser. the WASM binary is loaded
                from a CDN on first use and cached by the browser. after that, conversion works offline.
              </p>
              <p>
                the conversion pipeline works as follows:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>you select a file or provide a direct URL to a media file.</li>
                <li>for uploads: the file is read directly from disk using the File API.</li>
                <li>for URLs: the browser fetches the resource. CORS must allow the request.</li>
                <li>the media data is written to ffmpeg&apos;s virtual in-memory filesystem.</li>
                <li>ffmpeg.wasm runs the transcoding with your chosen settings.</li>
                <li>the output MP3 is read back and offered as a download via a Blob URL.</li>
              </ol>
            </div>
          </div>

          {/* Limitations */}
          <div className="p-6 md:p-8 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">limitations</h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "performance depends on your device",
                  desc: "webAssembly runs at near-native speed, but converting large files is CPU-intensive. a 500 MB file may take several minutes on a mobile device.",
                },
                {
                  title: "link mode requires CORS",
                  desc: "browsers block cross-origin requests unless the server sends the right headers. most streaming platforms block this. use upload mode for reliable results.",
                },
                {
                  title: "memory usage",
                  desc: "both the source and output file are held in memory during conversion. very large files may exhaust available RAM, especially on mobile.",
                },
                {
                  title: "SharedArrayBuffer requirement",
                  desc: "ffmpeg.wasm requires SharedArrayBuffer, which requires the page to be cross-origin isolated (COOP/COEP headers). these are set in next.config.ts.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="flex h-2 w-2 mt-2 rounded-full bg-amber-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-zinc-200 mb-1">{item.title}</p>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="p-6 md:p-8 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">tech stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                ["Next.js 15", "app router, TypeScript"],
                ["Tailwind CSS v4", "styling"],
                ["ffmpeg.wasm 0.12", "audio transcoding"],
                ["@ffmpeg/util", "file helpers"],
                ["Vitest", "unit tests"],
                ["Vercel", "hosting"],
              ].map(([name, desc]) => (
                <div key={name} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <p className="text-sm font-medium text-zinc-200">{name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="p-6 md:p-8 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">open source</h2>
              <p className="text-sm text-zinc-400">
                audoRa is open source. view the code, report issues, or contribute on GitHub.
              </p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
            >
              view on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
