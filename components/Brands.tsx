"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import { site } from "@/data/site";
import SectionHead from "./SectionHead";
import Icon from "./Icons";

// Theme behavior: each slide is a column of 2 brand tiles; 2 / 3 / 4 columns per view at
// 0 / 750 / 1200px. Arrows auto-hide when everything fits. Tiles scale to 1.08 on hover.
export default function Brands() {
  const b = site.brands;
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  const columns: (typeof b.items)[] = [];
  for (let i = 0; i < b.items.length; i += 2) columns.push(b.items.slice(i, i + 2));

  return (
    <section className="section section-gray" id="brands">
      <div className="container narrow">
        <SectionHead eyebrow={b.eyebrow} title={b.title} />
        <div className="brands-slider">
          <button ref={prev} className="slider-btn slider-btn--prev" aria-label="Previous"><Icon name="left" size={16} /></button>
          <button ref={next} className="slider-btn slider-btn--next" aria-label="Next"><Icon name="right" size={16} /></button>
          <div className={`fade-in-wrap ${ready ? "" : "is-see-through"}`}>
            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={16}
              breakpoints={{ 750: { slidesPerView: 3, spaceBetween: 20 }, 1200: { slidesPerView: 4, spaceBetween: 20 } }}
              resistanceRatio={0.65}
              onBeforeInit={(s) => {
                const nav = s.params.navigation as NavigationOptions;
                nav.prevEl = prev.current;
                nav.nextEl = next.current;
                nav.lockClass = "is-locked";
              }}
              navigation
              onInit={() => requestAnimationFrame(() => setReady(true))}
            >
              {columns.map((col, i) => (
                <SwiperSlide key={i} className="brand-col">
                  {col.map((item) => (
                    <div key={item.name} className="brand-tile">
                      <a href={item.href} className="brand-link">
                        {item.logo ? <img src={item.logo} alt={item.name} /> : <span>{item.name}</span>}
                      </a>
                    </div>
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="slider-link-wrap">
          <a href={b.link.href} className="text-link">
            <span className="u-link">{b.link.label}</span> <Icon name="right" size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
