"use client";

const skills = ["React Three Fiber", "GSAP", "WebGL / GLSL", "Next.js", "TypeScript", "Framer Motion"];

export default function AboutSection() {
  return (
    <section className="bg-black px-8 py-32 md:px-20">
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-red-600">
            About
          </div>
          <h2 className="mb-8 text-5xl font-black uppercase leading-none text-white">
            Built for the <br />
            <span className="text-red-600">Uncompromising</span>
          </h2>
          <p className="mb-6 text-base leading-relaxed text-white/50">
            I build digital experiences that sit at the intersection of engineering precision and visual artistry. Specializing in immersive WebGL interfaces, motion-driven narratives, and performance-obsessed front-end architecture.
          </p>
          <p className="text-base leading-relaxed text-white/50">
            Every project is a collaboration — I embed with your team, understand your users, and deliver work that converts and endures.
          </p>
        </div>

        <div>
          <div className="mb-8 font-mono text-xs uppercase tracking-widest text-white/30">
            Technical Arsenal
          </div>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="border border-white/10 px-4 py-3 font-mono text-sm text-white/60 hover:border-red-600 hover:text-white transition-all"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
