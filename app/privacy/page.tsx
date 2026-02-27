import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy - audoRa",
  description: "audoRa privacy statement: all conversion happens locally in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="px-2.5 py-1 rounded-full border text-xs font-medium bg-emerald-500/10 text-emerald-400 border-emerald-500/20 w-fit">
            privacy
          </span>
          <h1 className="text-4xl font-bold text-white">privacy statement</h1>
          <p className="text-zinc-400 leading-relaxed">
            last updated: {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex flex-col gap-6 text-sm text-zinc-400 leading-relaxed">
          <Section title="no data collection">
            audoRa does not collect, store, transmit, or process any personal data. the app has
            no analytics, no tracking pixels, no cookies, and no user accounts.
          </Section>

          <Section title="local processing">
            all audio extraction happens entirely within your browser using WebAssembly (ffmpeg.wasm).
            your video files are never uploaded to any server. they are read locally from your disk
            or fetched by your browser directly from the URL you provide.
          </Section>

          <Section title="third-party resources">
            on first use, audoRa loads the ffmpeg.wasm binary from a public CDN
            (unpkg.com). this is a standard CDN request and may log your IP address
            as any web request would. after the first load, the binary is cached by your browser.
            no other third-party requests are made.
          </Section>

          <Section title="blob URLs">
            the converted MP3 is made available as a temporary Blob URL. this URL exists only
            in your browser memory and is revoked when you leave the page or convert another file.
            nothing is persisted to disk unless you explicitly download the file.
          </Section>

          <Section title="content responsibility">
            audoRa converts media files. you are responsible for ensuring you own or have
            permission to convert any content you use with this tool. only convert content
            you own or have permission to use.
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-5 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
