"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import { site } from "@/data/site";
import SectionHead from "./SectionHead";
import Icon, { Stars } from "./Icons";

// Theme behavior: 1 per view, auto height, clickable outlined bullets, arrows outside the card.
export default function Testimonials() {
  const t = site.testimonials;
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  return (
    <section className="section section-dark" id="reviews">
      <div className="container narrow">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="testimonials">
          <button ref={prev} className="slider-btn slider-btn--prev slider-btn--light" aria-label="Previous"><Icon name="left" size={16} /></button>
          <button ref={next} className="slider-btn slider-btn--next slider-btn--light" aria-label="Next"><Icon name="right" size={16} /></button>
          <div className={`fade-in-wrap ${ready ? "" : "is-see-through"}`}>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={20}
              autoHeight
              resistanceRatio={0.65}
              onBeforeInit={(s) => {
                const nav = s.params.navigation as NavigationOptions;
                nav.prevEl = prev.current;
                nav.nextEl = next.current;
                nav.lockClass = "is-locked";
              }}
              navigation
              pagination={{ clickable: true }}
              onInit={() => requestAnimationFrame(() => setReady(true))}
            >
              {t.items.map((item) => (
                <SwiperSlide key={item.author}>
                  <div className="testimonial">
                    <Stars />
                    <p>{item.text}</p>
                    <div className="testimonial-author">
                      <span className="avatar"><Icon name="user" size={16} /></span>
                      <div>
                        <b>{item.author}</b>
                        <span className="testimonial-product">{item.product}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="slider-link-wrap">
          <a href={t.link.href} className="text-link" target="_blank" rel="noopener">
            <span className="u-link">{t.link.label}</span> <Icon name="right" size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
