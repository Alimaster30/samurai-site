"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// SVG ink brush stroke used as a clip-path mask that "paints" the headline in
function InkBrushMask() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <clipPath id="ink-reveal" clipPathUnits="objectBoundingBox">
          {/*
            A single horizontal rect that starts at width=0 and animates to width=1.
            GSAP drives the `width` attribute directly via the `#ink-rect` id.
          */}
          <rect id="ink-rect" x="0" y="0" width="0" height="1" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function UIOverlay() {
  const container = useRef();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      if (!prefersReduced) {
        // 1. Ink brush sweeps across the H1 (drives the SVG clipPath rect width 0→1)
        tl.to("#ink-rect", {
          attr: { width: 1 },
          duration: 1.2,
          ease: "power3.inOut",
        })
          // 2. Staggered reveal of the remaining UI elements
          .from(
            ".reveal",
            {
              y: 80,
              opacity: 0,
              stagger: 0.15,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.4"
          );
      } else {
        // Reduced motion: just show everything instantly
        gsap.set("#ink-rect", { attr: { width: 1 } });
        gsap.set(".reveal", { opacity: 1, y: 0 });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative z-10 flex h-full items-center px-8 md:px-20">
      <InkBrushMask />

      <div className="max-w-2xl">
        {/* Eyebrow */}
        <p className="reveal mb-4 font-mono text-xs uppercase tracking-[0.4em] text-red-600">
          Premium Web Experiences
        </p>

        {/* H1 — clipped by the ink-brush SVG mask */}
        <h1
          className="text-7xl font-black uppercase leading-none text-white italic md:text-8xl"
          style={{ clipPath: "url(#ink-reveal)" }}
        >
          Bushido{" "}
          <span className="text-red-600 underline decoration-red-600/50">
            Digital
          </span>
        </h1>

        {/* Red ink underline that draws in after the text */}
        <div className="reveal mt-2 h-[3px] w-0 bg-red-600 shadow-[0_0_12px_rgba(230,57,70,0.6)]"
          ref={(el) => {
            if (el) gsap.to(el, { width: "100%", duration: 0.8, ease: "power2.out", delay: 1.4 });
          }}
        />

        <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-gray-400">
          Precision-crafted digital experiences with a warrior's discipline.
        </p>

        <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="border border-red-600 px-8 py-4 text-center font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
          >
            Enter the Dojo
          </a>
          <a
            href="#work"
            className="border border-white/20 px-8 py-4 text-center font-black uppercase tracking-widest text-white/60 transition-all hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            View Work
          </a>
        </div>
      </div>
    </div>
  );
}
