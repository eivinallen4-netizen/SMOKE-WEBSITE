import type { Product } from "@/data/site";
import Placeholder from "./Placeholder";
import { Stars } from "./Icons";
import { AddToPickup } from "./Pickup";

// Hover (desktop): image zooms to 1.03 and the "Add to pickup" button slides up over the image.
// Mobile: the button is always shown under the info. Products only link out when href is a real URL.
export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="product-card">
      <Wrap href={p.href} className="product-img">
        {p.badge && <span className="badge">{p.badge}</span>}
        <Placeholder src={p.image} alt={p.name} className="square product-media" />
      </Wrap>
      <div className="product-info">
        <div className="quick-add">
          <AddToPickup name={p.name} price={`${p.fromPrice ? "From " : ""}${p.price}`} />
        </div>
        <Wrap href={p.href} className="product-name">{p.name}</Wrap>
        {p.rating && (
          <span className="product-rating"><Stars n={p.rating} /> <small>({p.reviews})</small></span>
        )}
        <span className="product-price">{p.fromPrice && "From "}{p.price}</span>
      </div>
    </div>
  );
}

function Wrap({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href && href !== "#" ? <a href={href} className={className}>{children}</a> : <div className={className}>{children}</div>;
}
