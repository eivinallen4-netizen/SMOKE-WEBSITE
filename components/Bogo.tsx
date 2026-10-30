import { site } from "@/data/site";
import SectionHead from "./SectionHead";
import ProductCard from "./ProductCard";
import Icon from "./Icons";

export default function Bogo() {
  const b = site.bogo;
  return (
    <section className="section section-cream" id="deals">
      <div className="container narrow">
        <SectionHead eyebrow={b.eyebrow} title={b.title} text={b.text} />
        <div className="bogo-grid">
          {b.items.map((p, i) => (
            <div key={p.name} className="grid-card scroll-trigger animate--slide-in" style={{ "--animation-order": i + 1 } as React.CSSProperties}>
              <ProductCard p={p} />
            </div>
          ))}
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
