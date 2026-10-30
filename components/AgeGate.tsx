"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const KEY = "age-verified-21";

// Nevada requires 21+ for tobacco/vape. Remembers the answer in this browser only.
export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    let ok = false;
    try { ok = localStorage.getItem(KEY) === "1"; } catch {}
    if (!ok) setShow(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
  }, [show]);

  if (!show) return null;

  const confirm = () => {
    try { localStorage.setItem(KEY, "1"); } catch {}
    setShow(false);
  };

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="age-card">
        <img src={site.brand.logo} alt={site.brand.name} />
        {denied ? (
          <>
            <h2 id="age-title">Sorry, you must be 21+</h2>
            <p>You must be 21 or older to enter this site.</p>
          </>
        ) : (
          <>
            <h2 id="age-title">Are you 21 or older?</h2>
            <p>You must be of legal smoking age to enter this site.</p>
            <div className="age-actions">
              <button className="btn btn-accent btn-ready" onClick={confirm}><span>Yes, I&apos;m 21+</span></button>
              <button className="btn btn-outline-light btn-ready" onClick={() => setDenied(true)}><span>No</span></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
