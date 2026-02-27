# audoRa

> Extract MP3 audio from a video file, locally in your browser.

audoRa is a client-side audio extraction tool built with Next.js, TypeScript, and Tailwind CSS v4.
All processing happens inside the browser using [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm).
No files are sent to any server.

## How it works

1. You select a video file (Upload tab) or paste a direct media URL (Link tab).
2. Choose your options: bitrate (128-320 kbps), mono/stereo, and optional trim range.
3. Click "Convert to MP3". ffmpeg.wasm loads from CDN on first use and is then cached.
4. The video is decoded and re-encoded to MP3 entirely inside your browser tab.
5. A download link appears. Nothing is sent anywhere.

### Upload mode

Uses the browser File API to read the file from disk. Works for any supported format:
MP4, WebM, OGG, MOV, AVI, MKV, 3GP.

### Link mode

Your browser fetches the URL directly. This only works when the server allows cross-origin
requests (CORS). Most streaming platforms do not allow this. In that case, download the
video locally and use Upload mode instead.

### SharedArrayBuffer requirement

ffmpeg.wasm requires SharedArrayBuffer, which is only available in cross-origin isolated
contexts. The `next.config.ts` sets the required `Cross-Origin-Opener-Policy` and
`Cross-Origin-Embedder-Policy` headers automatically.

## Limitations

- **Performance depends on your device.** Transcoding is CPU-intensive. Large files
  may take several minutes on slower devices.
- **Link mode depends on CORS.** If the server does not send permissive CORS headers,
  the fetch will fail. Use Upload instead.
- **Memory.** Both the source and output are held in memory during conversion.
  Very large files (> 1 GB) may cause issues on memory-constrained devices.
- **First load.** The ffmpeg.wasm core (~30 MB) is fetched from unpkg.com on first use.
  Subsequent uses are served from the browser cache.

## Project structure

```
app/
  layout.tsx          Root layout with Navbar and Footer
  page.tsx            Home page with hero and converter
  about/page.tsx      Architecture and limitations
  privacy/page.tsx    Privacy statement
components/
  Navbar.tsx          Fixed top navigation
  Footer.tsx          Site footer
  AuroraBackground.tsx Animated aurora glow blobs
  ConverterCard.tsx   Main converter shell with tabs
  UploadPane.tsx      File drag-and-drop input
  LinkPane.tsx        URL input
  OptionsPanel.tsx    Bitrate, channels, trim options
  ProgressPanel.tsx   Progress bar and logs
  OutputPanel.tsx     Download link and audio preview
lib/
  constants.ts        Shared constants
  time.ts             parseTime / formatTime utilities
  validators.ts       Trim and option validation
  file.ts             File type helpers and formatBytes
  url.ts              URL validation and fetch helper
hooks/
  useTranscoder.ts    Core ffmpeg.wasm hook
tests/
  time.test.ts
  validators.test.ts
  url.test.ts
```

## Portfolio framing

> **audoRa** is a browser-native audio extraction tool I built as a side project.
> It converts video files to MP3 entirely on-device using ffmpeg.wasm (WebAssembly),
> with no server involvement. I designed it as a natural extension of my portfolio's
> design system, adding an aurora gradient accent to the base zinc/indigo palette.
> The project demonstrates client-side media processing, WebAssembly integration,
> and a polished UI built with Next.js App Router and Tailwind CSS v4.

## License

MIT
