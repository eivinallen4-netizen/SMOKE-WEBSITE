"use client";
import { site } from "@/data/site";
import Icon from "./Icons";
import { usePickup } from "./Pickup";

// Mobile-only sticky bar: the three things a local visitor actually wants, always one tap away.
export default function ActionBar() {
  const { count, open } = usePickup();
  const b = site.brand;
  return (
    <nav className="action-bar mobile-only-block" aria-label="Quick actions">
      <a href={b.directions} target="_blank" rel="noopener"><Icon name="pin" /><span>Directions</span></a>
      <button type="button" onClick={open} className="is-primary">
        <Icon name="bag" /><span>Pickup{count > 0 && ` (${count})`}</span>
      </button>
      <a href={b.tel}><Icon name="phone" /><span>Call</span></a>
    </nav>
  );
}
