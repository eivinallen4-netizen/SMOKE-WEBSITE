"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// Strokes are drawn in with stroke-dashoffset (pathLength=1), then each icon runs a small looping motion.
const icons: Record<string, React.ReactNode> = {
  truck: (
    <>
      <path pathLength={1} d="M2 6h12v10H2z" />
      <path pathLength={1} d="M14 9.5h4.2l3.3 3.5v3H14z" />
      <circle pathLength={1} cx="6" cy="17.5" r="2" />
      <circle pathLength={1} cx="17.5" cy="17.5" r="2" />
    </>
  ),
  clock: (
    <>
      <circle pathLength={1} cx="12" cy="12" r="9" />
      <path pathLength={1} d="M12 7v5l3.5 2" />
    </>
  ),
  gift: (
    <>
      <path pathLength={1} d="M4 11h16v10H4z" />
      <path pathLength={1} d="M3 7h18v4H3z" />
      <path pathLength={1} d="M12 7v14" />
      <path pathLength={1} d="M12 7C10 3 6 4 7.5 7M12 7c2-4 6-3 4.5 0" />
    </>
  ),
  star: <path pathLength={1} d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" />,
  headset: (
    <>
      <path pathLength={1} d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path pathLength={1} d="M4 14h3v6H4zM17 14h3v6h-3z" />
      <path pathLength={1} d="M20 20c0 1.5-2 2-5 2" />
    </>
  ),
};

export default function FeatureStrip() {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);

  // Like the theme: start once 75% of the strip is on screen, then play icons one after another 500ms apart.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.75) {
          setPlay(true);
          obs.disconnect();
        }
      },
      { threshold: [0.01, 0.75] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`features ${play ? "is-playing" : ""}`} ref={ref}>
      <div className="container features-inner">
        {site.features.map((f, i) => (
          <div key={f.title} className="feature" style={{ "--i": i } as React.CSSProperties}>
            <svg className={`feature-icon feature-icon--${f.icon}`} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {icons[f.icon]}
            </svg>
            <div>
              <b>{f.title}</b>
              {f.text && <small>{f.text}</small>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
