"use client";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep-dive into your brand, goals, and competitive landscape. No templates — every project starts from zero.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Technical blueprint: stack selection, performance budgets, and interaction design mapped before a single line of code.",
  },
  {
    num: "03",
    title: "Forge",
    desc: "Precision engineering. Every animation, shader, and micro-interaction crafted with obsessive attention to detail.",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Edge-optimized delivery. Lighthouse 95+. Handed off with documentation and a 30-day support window.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-zinc-950 px-8 py-32 md:px-20">
      <div className="mb-16 border-b border-white/10 pb-8">
        <h2 className="text-5xl font-black uppercase text-white">
          The <span className="text-red-600">Process</span>
        </h2>
      </div>

      <div className="space-y-0 divide-y divide-white/5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="group flex flex-col gap-4 py-10 md:flex-row md:items-start md:gap-20"
          >
            <span className="font-mono text-4xl font-black text-red-600/30 group-hover:text-red-600 transition-colors md:w-20 shrink-0">
              {step.num}
            </span>
            <div>
              <h3 className="mb-3 text-2xl font-black uppercase text-white">{step.title}</h3>
              <p className="max-w-xl text-base leading-relaxed text-white/50">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
