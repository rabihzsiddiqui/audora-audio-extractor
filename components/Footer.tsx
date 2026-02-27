import Link from "next/link";
import { GITHUB_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-white font-semibold text-lg tracking-tight hover:opacity-90 transition-opacity"
            >
              audoRa<span className="text-cyan-400">.</span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs">
              Extract MP3 audio from a video file, locally in your browser.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-zinc-500 tracking-wider">
              navigation
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                home
              </Link>
              <Link
                href="/about"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                about
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                privacy
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-zinc-500 tracking-wider">
              links
            </p>
            <div className="flex gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-4 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all duration-200"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} audoRa. All conversion happens locally in your browser.
          </p>
          <p className="text-xs text-zinc-600">
            Only convert content you own or have permission to use.
          </p>
        </div>
      </div>
    </footer>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
