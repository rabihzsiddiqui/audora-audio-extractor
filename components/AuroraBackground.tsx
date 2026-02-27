export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Aurora blob 1 - top left */}
      <div className="aurora-blob aurora-blob-1 absolute -top-32 -left-24 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/50 via-cyan-400/50 to-violet-400/50 rounded-full blur-[100px]" />

      {/* Aurora blob 2 - top right */}
      <div className="aurora-blob aurora-blob-2 absolute top-24 -right-28 w-[540px] h-[540px] bg-gradient-to-r from-cyan-400/45 via-violet-400/45 to-fuchsia-400/45 rounded-full blur-[110px]" />

      {/* Aurora blob 3 - bottom center */}
      <div className="aurora-blob aurora-blob-3 absolute -bottom-36 left-1/3 w-[580px] h-[580px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/40 to-fuchsia-400/40 rounded-full blur-[110px]" />
    </div>
  );
}
