"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { site } from "@/data/site";
import Icon from "./Icons";

// Pickup orders are a request, not a checkout: the bag builds a text message to the store,
// the customer pays and shows ID at the counter. No payment or shipping happens on the site.

type Item = { name: string; price: string; qty: number };
type Ctx = {
  items: Item[];
  count: number;
  add: (name: string, price: string) => void;
  setQty: (name: string, qty: number) => void;
  open: () => void;
};

const PickupCtx = createContext<Ctx | null>(null);
const KEY = "pickup-bag";

export function usePickup() {
  const c = useContext(PickupCtx);
  if (!c) throw new Error("usePickup must be used inside <PickupProvider>");
  return c;
}

export function PickupProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, loaded]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // Any link to "#pickup" (footer, Instagram bio, a Google post) opens the bag.
  useEffect(() => {
    const check = () => {
      if (location.hash !== "#pickup") return;
      setOpen(true);
      history.replaceState(null, "", location.pathname + location.search);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  const add = (name: string, price: string) => {
    setItems((list) => {
      const hit = list.find((i) => i.name === name);
      return hit ? list.map((i) => (i === hit ? { ...i, qty: i.qty + 1 } : i)) : [...list, { name, price, qty: 1 }];
    });
  };
  const setQty = (name: string, qty: number) =>
    setItems((list) => (qty < 1 ? list.filter((i) => i.name !== name) : list.map((i) => (i.name === name ? { ...i, qty } : i))));

  const value: Ctx = { items, count: items.reduce((n, i) => n + i.qty, 0), add, setQty, open: () => setOpen(true) };

  return (
    <PickupCtx.Provider value={value}>
      {children}
      {isOpen && <PickupDrawer onClose={() => setOpen(false)} />}
    </PickupCtx.Provider>
  );
}

export function AddToPickup({ name, price }: { name: string; price: string }) {
  const { add } = usePickup();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);
  return (
    <button type="button" className="btn btn-sm btn-ready" onClick={() => { add(name, price); setAdded(true); }}>
      <span>{added ? "Added ✓" : "Add to pickup"}</span>
    </button>
  );
}

export function PickupButton({ className = "btn btn-ready", label = "Order for pickup" }: { className?: string; label?: string }) {
  const { count, open } = usePickup();
  return (
    <button type="button" className={className} onClick={open}>
      <span>{label}{count > 0 && ` (${count})`}</span>
    </button>
  );
}

function PickupDrawer({ onClose }: { onClose: () => void }) {
  const { items, setQty } = usePickup();
  const p = site.pickup;
  const [name, setName] = useState("");
  const [when, setWhen] = useState(p.times[0]);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const lines = [
    `Hi 20 Below! Pickup order${name.trim() ? ` for ${name.trim()}` : ""}:`,
    ...items.map((i) => `- ${i.qty} x ${i.name}`),
    notes.trim() && `Also looking for: ${notes.trim()}`,
    `Pickup: ${when}`,
  ].filter(Boolean);
  const message = lines.join("\n");
  const canSend = items.length > 0 || notes.trim().length > 0;
  // "?&body=" is the form both iOS and Android Messages accept.
  const smsHref = `sms:${p.sms}?&body=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {}
  };

  return (
    <div className="pickup-overlay" onClick={onClose}>
      <aside className="pickup-drawer" role="dialog" aria-modal="true" aria-labelledby="pickup-title" onClick={(e) => e.stopPropagation()}>
        <div className="pickup-head">
          <h2 id="pickup-title">{p.title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        <p className="pickup-intro">{p.intro}</p>

        {items.length > 0 ? (
          <ul className="pickup-items">
            {items.map((i) => (
              <li key={i.name}>
                <div>
                  <b>{i.name}</b>
                  <small>{i.price}</small>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(i.name, i.qty - 1)} aria-label={`Remove one ${i.name}`}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => setQty(i.name, i.qty + 1)} aria-label={`Add one ${i.name}`}>+</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pickup-empty">Nothing added yet. Tap &ldquo;Add to pickup&rdquo; on any product, or just tell us what you want below.</p>
        )}

        <label className="pickup-field">
          <span>What else are you looking for?</span>
          <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={p.notesPlaceholder} />
        </label>
        <div className="pickup-row">
          <label className="pickup-field">
            <span>Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" autoComplete="given-name" />
          </label>
          <label className="pickup-field">
            <span>Pickup time</span>
            <select value={when} onChange={(e) => setWhen(e.target.value)}>
              {p.times.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
        </div>

        <div className="pickup-actions">
          <a href={canSend ? smsHref : undefined} aria-disabled={!canSend} className={`btn btn-accent btn-ready ${canSend ? "" : "is-disabled"}`}>
            <span>Text my order</span>
          </a>
          <a href={site.brand.tel} className="btn btn-outline btn-ready"><span>Call instead</span></a>
        </div>
        {canSend && (
          <button type="button" className="text-link pickup-copy" onClick={copy}>
            <span className="u-link">{copied ? "Copied — text it to " : "On a computer? Copy order to text "}{site.brand.phone}</span>
          </button>
        )}
        <p className="pickup-fine">{p.fine}</p>
      </aside>
    </div>
  );
}
