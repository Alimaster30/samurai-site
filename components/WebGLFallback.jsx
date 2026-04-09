"use client";

export default function WebGLFallback() {
  return (
    <div
      className="absolute inset-0 z-0 flex items-center justify-center bg-black"
      aria-label="Static samurai scene — WebGL not available"
      role="img"
    >
      {/* Decorative static composition */}
      <div className="pointer-events-none select-none text-center opacity-20">
        <div className="text-[20rem] font-black leading-none text-white">武</div>
      </div>
      {/* Red vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(230,57,70,0.15)_100%)]" />
    </div>
  );
}
