"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

// Live "Open now" pill, computed in store time (Las Vegas) so it's right for visitors anywhere.
// Renders nothing on the server to avoid a hydration mismatch.
function status() {
  const { opensHour, closesHour, timeZone } = site.brand.schedule;
  const hour = Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone }).format(new Date()));
  const open = hour >= opensHour && hour < closesHour;
  if (!open) return { open, text: "Closed now · opens 8AM" };
  if (hour === closesHour - 1) return { open, text: "Open now · closing soon (midnight)" };
  return { open, text: "Open now · till midnight" };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const [s, setS] = useState<ReturnType<typeof status> | null>(null);
  useEffect(() => {
    setS(status());
    const t = setInterval(() => setS(status()), 60_000);
    return () => clearInterval(t);
  }, []);
  if (!s) return null;
  return <span className={`open-status ${s.open ? "is-open" : "is-closed"} ${className}`}>{s.text}</span>;
}
