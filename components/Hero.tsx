"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import Placeholder from "./Placeholder";
import { Stars } from "./Icons";
import OpenStatus from "./OpenStatus";
import { PickupButton } from "./Pickup";

type Slide = (typeof site.hero.slides)[number];

function Badge({ s }: { s: Slide }) {
  return (
    <span className="hero-badge" style={{ background: s.badgeColor }}>
      {s.badgeLogo && <img src={s.badgeLogo} alt="" width={24} height={24} />}
      {s.badge}
    </span>
  );
}

function TopLine({ s }: { s: Slide }) {
  return (
    <div className="hero-meta">
      <Badge s={s} />
      <span className="hero-rating"><Stars /> <b>{s.ratingText}</b> {s.reviewCount}</span>
      <OpenStatus />
    </div>
  );
}

export default function Hero() {
  const { slides, autoplaySeconds } = site.hero;
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(0); // gets set one frame after `active` so the fade/rise transition runs
  const [ctaReady, setCtaReady] = useState(false);
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sepRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const raf = useRef<number | undefined>(undefined);

  const goTo = useCallback((i: number) => setActive(i), []);

  // Show the new slide one frame later (display:block first, then transition opacity/transform),
  // and arm the CTA hover animation 600ms after it appears.
  useEffect(() => {
    setCtaReady(false);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setVisible(active));
    });
    const t = setTimeout(() => setCtaReady(true), 600);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      clearTimeout(t);
    };
  }, [active]);

  // Autoplay: the active nav button fills a conic-gradient ring (and on mobile the separator line
  // fills) over the interval, then advances to the next slide.
  useEffect(() => {
    if (slides.length < 2) return;
    const duration = autoplaySeconds * 1000;
    const ring = ringRefs.current[active];
    const sep = sepRefs.current[active];
    let t0: number | undefined;

    const step = (t: number) => {
      if (t0 === undefined) t0 = t;
      const pct = (t - t0) / duration;
      const deg = Math.min(360 * pct, 360);
      if (sep) sep.style.width = `${Math.min(100 * pct, 100)}%`;
      if (ring) ring.style.background = `conic-gradient(currentColor ${deg}deg, transparent ${deg}deg ${360 - deg}deg)`;
      if (deg !== 360) raf.current = requestAnimationFrame(step);
      else setActive((a) => (a === slides.length - 1 ? 0 : a + 1));
    };
    raf.current = requestAnimationFrame(step);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      ringRefs.current.forEach((r) => r && (r.style.background = "transparent"));
      sepRefs.current.forEach((s) => s && (s.style.width = ""));
    };
  }, [active, autoplaySeconds, slides.length]);

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-slides">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`hero-slide ${i === active ? "" : "is-hidden"} ${i === visible && i === active ? "is-visible" : ""}`}
              aria-hidden={i !== active}
            >
              <div className="mobile-only-block"><TopLine s={s} /></div>
              <div className="hero-copy">
                <div className="desktop-only-block"><TopLine s={s} /></div>
                <h1>{s.title}</h1>
                {s.subtitle && <p className="hero-subtitle">{s.subtitle}</p>}
                <div className="hero-ctas">
                  <a href={s.cta.href} className={`btn ${ctaReady && i === active ? "btn-ready" : ""}`} data-manual-ready>
                    <span>{s.cta.label}</span>
                  </a>
                  <PickupButton className="btn btn-outline btn-ready" />
                </div>
                <a href="#categories" className="text-link hero-browse">
                  <span className="u-link">Browse what we carry</span>
                </a>
                <div className="hero-quote">
                  <Stars />
                  <p>{s.quote}</p>
                  <small>{s.author}</small>
                </div>
              </div>
              <div className="hero-media">
                <Placeholder src={s.image} alt={`Hero image ${i + 1}`} className="hero-img" />
              </div>
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <div className="hero-nav">
            {slides.map((s, i) => (
              <span key={i} className="hero-nav-item">
                <button
                  className={`hero-nav-btn ${i === active ? "is-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Show slide ${i + 1}`}
                >
                  <span className="hero-nav-ring" ref={(el) => { ringRefs.current[i] = el; }}>
                    <span className="hero-nav-content">
                      {s.badgeLogo ? <img src={s.badgeLogo} alt="" /> : <span className="hero-nav-letter">{s.badge[0]}</span>}
                    </span>
                  </span>
                </button>
                {i < slides.length - 1 && (
                  <span className="hero-nav-sep">
                    <span ref={(el) => { sepRefs.current[i] = el; }} />
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
