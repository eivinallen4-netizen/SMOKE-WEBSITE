"use client";
import { useEffect } from "react";

// Mirrors the theme's animations.js:
// - Any `.scroll-trigger` element starts hidden (see CSS) and gets `--offscreen` while out of view.
//   Once it enters the viewport (minus 50px at the bottom) the class is removed and the
//   slide-in keyframe plays, delayed by `--animation-order` * 75ms for staggered grids.
// - Buttons get `btn-ready` shortly after load, which arms the hover "bubble" animation
//   (prevents the exit animation from flashing on first paint).
export default function ScrollAnimations() {
  useEffect(() => {
    const els = Array.from(document.getElementsByClassName("scroll-trigger")) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.remove("scroll-trigger--offscreen");
            obs.unobserve(el);
          } else {
            el.classList.add("scroll-trigger--offscreen");
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));

    const t = setTimeout(() => {
      document.querySelectorAll(".btn:not([data-manual-ready])").forEach((b) => b.classList.add("btn-ready"));
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  return null;
}
