"use client";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import UIOverlay from "@/components/UIOverlay";

gsap.registerPlugin(ScrollTrigger);

const Hero3DScene = dynamic(() => import("@/components/Hero3DScene"), { ssr: false });
const WorkSection = dynamic(() => import("@/components/WorkSection"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));

export default function LandingPage() {
  // Single scroll container — shared with the 3D scene for scroll-driven animations
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Register the custom scroll container with ScrollTrigger
    ScrollTrigger.defaults({ scroller: el });

    // Fade + slide each below-fold section in as it enters the viewport
    const sections = el.querySelectorAll(".scroll-section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main
      ref={scrollRef}
      className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-black"
      style={{ scrollBehavior: "smooth" }}
    >
      <Preloader />

      {/* Hero — sticky full viewport */}
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        <Hero3DScene scrollRef={scrollRef} />
        <UIOverlay />
      </section>

      {/* Below-fold content */}
      <div id="work" className="scroll-section relative z-10 bg-black">
        <WorkSection />
      </div>
      <div className="scroll-section relative z-10">
        <ProcessSection />
      </div>
      <div className="scroll-section relative z-10 bg-black">
        <AboutSection />
      </div>
      <div id="contact" className="scroll-section relative z-10">
        <ContactSection />
      </div>
    </main>
  );
}
