"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import type { Product } from "@/data/site";
import ProductCard from "./ProductCard";
import SectionHead from "./SectionHead";
import Icon from "./Icons";

type Props = { eyebrow: string; title: string; link: { label: string; href: string }; items: Product[] };

// Same settings as the theme's product slider: 2 per view with a peek on mobile,
// 4 per view from 750px, draggable scrollbar, arrows that hide when there's nothing to scroll.
export default function ProductCarousel({ eyebrow, title, link, items }: Props) {
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  return (
    <section className="section section--slider">
      <div className="container narrow">
        <SectionHead eyebrow={eyebrow} title={title} />
        <div className="p-slider">
          <button ref={prev} className="slider-btn slider-btn--prev" aria-label="Previous"><Icon name="left" size={16} /></button>
          <button ref={next} className="slider-btn slider-btn--next" aria-label="Next"><Icon name="right" size={16} /></button>
          <div className={`p-slider__inner ${ready ? "" : "is-see-through"}`}>
            <Swiper
              modules={[Navigation, Scrollbar]}
              slidesPerView={2}
              spaceBetween={14}
              breakpoints={{ 750: { slidesPerView: 4, spaceBetween: 20 } }}
              resistanceRatio={0.65}
              onBeforeInit={(s) => {
                const nav = s.params.navigation as NavigationOptions;
                nav.prevEl = prev.current;
                nav.nextEl = next.current;
                nav.lockClass = "is-locked";
              }}
              navigation
              scrollbar={{ draggable: true }}
              onInit={() => requestAnimationFrame(() => setReady(true))}
            >
              {items.map((p) => (
                <SwiperSlide key={p.name}>
                  <ProductCard p={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="slider-link-wrap">
          <a href={link.href} className="text-link">
            <span className="u-link">{link.label}</span> <Icon name="right" size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
