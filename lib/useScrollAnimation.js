import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (containerRef, animations = []) => {
  useEffect(() => {
    if (!containerRef?.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      animations.forEach(({ target, fromVars = { opacity: 0, y: 40 }, toVars, trigger, start, end, scrub, stagger }) => {
        if (prefersReduced) {
          gsap.set(target, toVars ?? { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(target, fromVars, {
          ...(toVars ?? { opacity: 1, y: 0 }),
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: trigger || containerRef.current,
            start: start || "top 80%",
            end: end || "bottom center",
            scrub: scrub ?? false,
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
};

export { ScrollTrigger };
