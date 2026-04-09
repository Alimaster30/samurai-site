"use client";
import { useRef } from "react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const projects = [
  { id: 1, title: "Obsidian Finance", category: "SaaS / Dashboard", year: "2024" },
  { id: 2, title: "Kōbō Studio", category: "Creative Agency", year: "2024" },
  { id: 3, title: "Ronin Protocol", category: "Web3 / DeFi", year: "2023" },
  { id: 4, title: "Mugen AI", category: "AI Platform", year: "2023" },
];

export default function WorkSection() {
  const sectionRef = useRef();

  useScrollAnimation(sectionRef, [
    {
      target: ".work-item",
      toVars: { y: 0, opacity: 1 },
      start: "top 80%",
      end: "top 40%",
      scrub: false,
      stagger: 0.15,
    },
  ]);

  return (
    <section ref={sectionRef} className="bg-black px-8 py-32 md:px-20">
      <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-8">
        <h2 className="text-5xl font-black uppercase text-white">
          Selected <span className="text-red-600">Work</span>
        </h2>
        <span className="font-mono text-xs text-white/30">[ 2023 — 2024 ]</span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-white/5 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="work-item group cursor-pointer bg-black p-10 transition-all duration-500 hover:bg-zinc-950"
          >
            <div className="mb-6 font-mono text-xs text-red-600">{String(p.id).padStart(2, "0")}</div>
            <h3 className="mb-2 text-3xl font-black uppercase text-white group-hover:text-red-600 transition-colors">
              {p.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40">{p.category}</span>
              <span className="font-mono text-xs text-white/20">{p.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
