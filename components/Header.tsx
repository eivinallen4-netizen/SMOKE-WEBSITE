"use client";
import { useState } from "react";
import { site } from "@/data/site";
import Icon from "./Icons";
import { PickupButton } from "./Pickup";

export function Logo() {
  return site.brand.logo ? (
    <img src={site.brand.logo} alt={site.brand.name} className="logo-img" />
  ) : (
    <span className="logo">{site.brand.name}</span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <button className="icon-btn mobile-only" onClick={() => setOpen(!open)} aria-label="Menu">
          <Icon name={open ? "close" : "menu"} />
        </button>
        <a href="/" className="logo-link"><Logo /></a>
        <nav className={`nav ${open ? "open" : ""}`}>
          {site.nav.map((n) => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)}><span className="u-link">{n.label}</span></a>
          ))}
        </nav>
        <div className="header-icons">
          <a href={site.brand.directions} target="_blank" rel="noopener" className="icon-btn desktop-only" aria-label="Directions"><Icon name="pin" /></a>
          <span className="desktop-only"><PickupButton className="btn btn-outline-light btn-sm btn-ready header-call" label="Pickup" /></span>
          <a href={site.brand.tel} className="btn btn-accent btn-sm header-call"><span>Call</span></a>
        </div>
      </div>
    </header>
  );
}
