"use client";

import { useState, useEffect, useRef } from "react";

// Picker styles injected verbatim from PICKER.md
const PICKER_STYLES = `
.proto-picker {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.82);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    0 8px 24px rgba(0, 0, 0, 0.24),
    0 2px 6px rgba(0, 0, 0, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
}

.proto-picker-highlight {
  position: absolute;
  top: 4px;
  left: 0;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  will-change: transform;
}

.proto-picker[data-ready] .proto-picker-highlight {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    width 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (prefers-reduced-motion: reduce) {
  .proto-picker[data-ready] .proto-picker-highlight { transition: none; }
}

.proto-picker-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  cursor: pointer;
  transition: color 150ms ease-out;
}

.proto-picker-item:hover {
  color: rgba(255, 255, 255, 0.85);
}

.proto-picker-item:active {
  transform: scale(0.97);
}

.proto-picker-item:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 2px;
}

.proto-picker-item[data-active] {
  color: #fff;
}

.proto-picker-divider {
  width: 1px;
  height: 16px;
  margin: 0 4px;
  background: rgba(255, 255, 255, 0.12);
}

.proto-picker-replay {
  padding: 0 10px;
  font-size: 14px;
}
`;

const VARIANTS = [
  { name: "Orbital", axis: "3D sphere, space-finance", importFn: () => import("./variant-orbital") },
  { name: "Editorial", axis: "Large type, ink-stroke", importFn: () => import("./variant-editorial") },
  { name: "Velocity", axis: "Kinetic waves, terminal", importFn: () => import("./variant-velocity") },
];

export default function LandingPrototypePicker() {
  // Read from URL or default to 0
  const getInitialVariant = () => {
    if (typeof window === "undefined") return 0;
    const v = parseInt(new URLSearchParams(window.location.search).get("v") ?? "1", 10);
    return Math.max(0, Math.min(VARIANTS.length - 1, v - 1));
  };

  const [current, setCurrent] = useState(0);
  const [mountKey, setMountKey] = useState(0);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Init from URL
  useEffect(() => {
    setCurrent(getInitialVariant());
  }, []);

  // Load component when index changes
  useEffect(() => {
    let cancelled = false;
    VARIANTS[current].importFn().then((mod) => {
      if (!cancelled) {
        setComponent(() => mod.default);
        setMountKey((k) => k + 1);
      }
    });
    return () => { cancelled = true; };
  }, [current]);

  // Sync highlight
  function moveHighlight() {
    const el = buttonRefs.current[current];
    const highlight = highlightRef.current;
    if (!el || !highlight) return;
    highlight.style.width = el.offsetWidth + "px";
    highlight.style.transform = `translateX(${el.offsetLeft}px)`;
  }

  useEffect(() => {
    moveHighlight();
  }, [current, isReady]);

  useEffect(() => {
    window.addEventListener("resize", moveHighlight);
    return () => window.removeEventListener("resize", moveHighlight);
  }, [current]);

  // Enable slide after first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setIsReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  function setActive(i: number) {
    if (i < 0 || i >= VARIANTS.length) return;
    setCurrent(i);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(i + 1));
    history.replaceState(null, "", url);
  }

  function replay() {
    setMountKey((k) => k + 1);
  }

  // Keyboard wiring
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= VARIANTS.length) setActive(num - 1);
      else if (e.key === "ArrowRight") setActive((current + 1) % VARIANTS.length);
      else if (e.key === "ArrowLeft") setActive((current - 1 + VARIANTS.length) % VARIANTS.length);
      else if (e.key === "r" || e.key === "R") replay();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PICKER_STYLES }} />

      {/* Variant stage — full size, re-keyed to re-mount entrance animations */}
      <div key={mountKey} style={{ minHeight: "100vh" }}>
        {Component ? <Component /> : (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#000",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "system-ui, sans-serif",
              fontSize: 14,
            }}
          >
            Loading variant…
          </div>
        )}
      </div>

      {/* Picker — verbatim from PICKER.md */}
      <nav
        ref={pickerRef}
        className="proto-picker"
        aria-label="Prototype variants"
        {...(isReady ? { "data-ready": "" } : {})}
      >
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
        {VARIANTS.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => { buttonRefs.current[i] = el; }}
            className="proto-picker-item"
            {...(i === current ? { "data-active": "", "aria-current": "true" } : {})}
            onClick={() => setActive(i)}
          >
            {v.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={replay}
        >
          ↻
        </button>
      </nav>
    </>
  );
}
