"use client";
import { useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section className="bg-zinc-950 px-8 py-32 md:px-20" id="contact">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-red-600">
          Contact
        </div>
        <h2 className="mb-12 text-5xl font-black uppercase leading-none text-white">
          Start a <span className="text-red-600">Project</span>
        </h2>

        {status === "sent" ? (
          <div className="border border-red-600 p-8 text-center">
            <p className="text-xl font-black uppercase text-white">Message received.</p>
            <p className="mt-2 text-sm text-white/40">I'll respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-widest text-white/50">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-white placeholder-white/20 focus:border-red-600 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-widest text-white/50">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-white placeholder-white/20 focus:border-red-600 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="budget" className="mb-2 block font-mono text-xs uppercase tracking-widest text-white/50">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full border border-white/10 bg-black px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors"
                >
                  <option value="">Select a range</option>
                  <option value="5k-10k">$5k – $10k</option>
                  <option value="10k-25k">$10k – $25k</option>
                  <option value="25k+">$25k+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-widest text-white/50">
                  Project Brief
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-white placeholder-white/20 focus:border-red-600 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full border border-red-600 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-16 border-t border-white/5 pt-8 text-center font-mono text-xs text-white/20">
          © {new Date().getFullYear()} Bushido Digital. All rights reserved.
        </div>
      </div>
    </section>
  );
}
