import { site } from "@/data/site";
import Placeholder from "./Placeholder";
import SectionHead from "./SectionHead";

export default function Categories() {
  const c = site.categories;
  return (
    <section className="section" id="categories">
      <div className="container narrow">
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="cat-grid">
          {c.items.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              className="cat-card scroll-trigger animate--slide-in"
              style={{ "--animation-order": i + 1 } as React.CSSProperties}
            >
              <div className="cat-media"><Placeholder src={item.image} alt={item.name} className="square" /></div>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
