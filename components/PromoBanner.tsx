import { site } from "@/data/site";
import Placeholder from "./Placeholder";

export default function PromoBanner() {
  const p = site.promo;
  return (
    <section className="section">
      <div className="container narrow">
        <div className="promo scroll-trigger animate--slide-in">
          <div className="promo-copy">
            <span className="pill">{p.eyebrow}</span>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
            <a href={p.cta.href} className="btn"><span>{p.cta.label}</span></a>
          </div>
          <Placeholder src={p.image} alt="Promo product" className="promo-img" />
        </div>
      </div>
    </section>
  );
}
