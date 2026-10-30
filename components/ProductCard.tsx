import type { Product } from "@/data/site";
import Placeholder from "./Placeholder";
import { Stars } from "./Icons";

// Hover (desktop): image zooms to 1.03 and the "Choose options" button slides up over the image.
// Mobile: the button is always shown under the info.
export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="product-card">
      <a href={p.href} className="product-img">
        {p.badge && <span className="badge">{p.badge}</span>}
        <Placeholder src={p.image} alt={p.name} className="square product-media" />
      </a>
      <div className="product-info">
        <div className="quick-add">
          <a href={p.href} className="btn btn-sm">
            <span>Available in store</span>
          </a>
        </div>
        <a href={p.href} className="product-name">{p.name}</a>
        {p.rating && (
          <span className="product-rating"><Stars n={p.rating} /> <small>({p.reviews})</small></span>
        )}
        <span className="product-price">{p.fromPrice && "From "}{p.price}</span>
      </div>
    </div>
  );
}
