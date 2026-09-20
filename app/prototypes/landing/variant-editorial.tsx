"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const STOCKS = [
  { ticker: "AAPL", name: "Apple Inc.", spend: "$1,240", reward: "$24.80", change: "+8.2%", bg: "#1d1d1f" },
  { ticker: "COST", name: "Costco", spend: "$890", reward: "$17.80", change: "+4.1%", bg: "#0a1628" },
  { ticker: "AMZN", name: "Amazon", spend: "$2,100", reward: "$42.00", change: "+11.3%", bg: "#1a0a00" },
  { ticker: "GOOGL", name: "Alphabet", spend: "$340", reward: "$6.80", change: "+6.2%", bg: "#0d1a00" },
];

const TICKER_ITEMS = [
  "AAPL +8.2%", "COST +4.1%", "AMZN +11.3%", "GOOGL +6.2%", "MSFT +9.7%",
  "TSLA +3.4%", "META +7.1%", "NFLX +5.8%", "SBUX +2.9%", "WMT +4.6%",
];

function RunningTicker() {
  return (
    <div
      className="overflow-hidden py-2 border-t border-b"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span
            key={i}
            className="text-xs font-mono font-medium"
            style={{
              color: item.includes("+") ? "#22c55e" : "#ef4444",
              opacity: 0.7,
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function BigNumber({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col"
    >
      <span
        className="text-8xl font-black leading-none tracking-tighter"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}
      </span>
      <span className="text-sm text-slate-500 mt-2 tracking-widest uppercase">{label}</span>
    </motion.div>
  );
}

function InvestmentArrow() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <motion.path
        d="M8 40 L40 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
      />
      <motion.path
        d="M24 8 L40 8 L40 24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.8 }}
      />
    </svg>
  );
}

function ChartLine() {
  return (
    <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 70 L40 60 L80 50 L120 55 L160 35 L200 40 L240 20 L280 25 L320 10 L360 15 L400 5"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.path
        d="M0 70 L40 60 L80 50 L120 55 L160 35 L200 40 L240 20 L280 25 L320 10 L360 15 L400 5 L400 80 L0 80Z"
        fill="url(#chartGrad)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
      />
    </svg>
  );
}

export default function VariantEditorial() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeStock, setActiveStock] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStock((i) => (i + 1) % STOCKS.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="text-white font-black text-xl tracking-tighter">MELO</div>
        <div className="flex items-center gap-8">
          {["Protocol", "Portfolio", "Docs"].map((l) => (
            <a key={l} href="#" className="text-sm text-white hover:opacity-60 transition-opacity duration-200">
              {l}
            </a>
          ))}
          <button
            className="text-sm font-medium px-5 py-2 rounded-sm"
            style={{ background: "white", color: "black" }}
          >
            Early Access
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-20 px-8 lg:px-16">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Big title */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-xs tracking-[0.3em] text-slate-500 uppercase mb-8">
              Spend-to-Own Protocol · Est. 2026
            </div>
            <h1 className="text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter mb-8 uppercase">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="block"
              >
                Spend.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="block"
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.5)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Earn.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="block"
              >
                Own.
              </motion.span>
            </h1>
          </motion.div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg text-slate-400 max-w-xs leading-relaxed"
            >
              Everyday purchases earn fractional ownership in the companies you support. 
              Investment is no longer a separate activity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-end"
            >
              <InvestmentArrow />
              <div className="flex gap-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 font-bold text-sm text-black bg-white rounded-sm"
                >
                  Join waitlist
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 font-bold text-sm text-white rounded-sm"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  Whitepaper ↗
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Ticker */}
      <RunningTicker />

      {/* Stats strip */}
      <section className="px-8 lg:px-16 py-20 border-b border-white/8">
        <div className="grid grid-cols-3 gap-8">
          <BigNumber value="$2.1B" label="Protocol Volume" />
          <BigNumber value="8.4K" label="Waitlist Members" />
          <BigNumber value="47" label="Merchants" />
        </div>
      </section>

      {/* Feature: Portfolio */}
      <section className="px-8 lg:px-16 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-xs text-slate-500 tracking-widest uppercase mb-4">Portfolio</div>
            <h2 className="text-5xl font-black leading-tight tracking-tight mb-6">
              Your spending becomes<br />
              <span
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.5)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                your portfolio.
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              Every qualifying purchase earns equity exposure in the merchant's stock. 
              Watch your spending history transform into an investment portfolio.
            </p>

            {/* Live cards */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {STOCKS.map((s, i) => (
                  <motion.div
                    key={s.ticker}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: i === activeStock ? 1 : 0.4,
                      y: 0,
                      scale: i === activeStock ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="flex items-center justify-between py-3 px-4 rounded-sm"
                    style={{
                      background: i === activeStock ? "rgba(255,255,255,0.06)" : "transparent",
                      border: `1px solid ${i === activeStock ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}`,
                      transition: "background 0.3s, border 0.3s",
                    }}
                  >
                    <div>
                      <div className="text-sm font-bold">{s.ticker}</div>
                      <div className="text-xs text-slate-500">{s.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{s.reward}</div>
                      <div className="text-xs text-green-400">{s.change}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">from {s.spend}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: big visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div
              className="aspect-square rounded-sm overflow-hidden flex flex-col justify-end p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-xs text-slate-600 uppercase tracking-widest mb-4">Portfolio growth</div>
              <ChartLine />
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-4xl font-black">$1,284</div>
                  <div className="text-xs text-slate-500 mt-1">Total value</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-green-400">+18.4%</div>
                  <div className="text-xs text-slate-500 mt-1">All time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works — Editorial steps */}
      <section className="px-8 lg:px-16 py-24 border-t border-white/8">
        <div className="text-xs text-slate-500 tracking-widest uppercase mb-16">The protocol</div>
        <div className="grid md:grid-cols-5 gap-0">
          {["BUY", "VERIFY", "REWARD", "INVEST", "OWN"].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex flex-col items-start"
            >
              <div
                className="text-4xl font-black leading-none mb-3 tracking-tighter"
                style={{
                  color: i === 4 ? "white" : "rgba(255,255,255,0.25)",
                }}
              >
                {step}
              </div>
              <div className="text-xs text-slate-600 uppercase tracking-widest">Step {String(i + 1).padStart(2, "0")}</div>
              {i < 4 && (
                <div
                  className="absolute right-0 top-4 text-2xl text-slate-700 hidden md:block"
                  style={{ transform: "translateX(50%)" }}
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA — Full width editorial */}
      <section
        className="relative px-8 lg:px-16 py-32 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter">
              The economy<br />
              <span
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.5)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                works for you.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <p className="text-slate-400 text-sm leading-relaxed">
              Join 8,400+ people on the waitlist. Be the first to build ownership through spending.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 text-sm bg-transparent border border-white/20 text-white placeholder-slate-600 outline-none focus:border-white/40 transition-colors"
            />
            <button className="w-full py-3 font-bold text-sm text-black bg-white">
              Get early access →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-8 border-t border-white/8">
        <div className="flex items-center justify-between">
          <div className="text-xl font-black tracking-tighter">MELO</div>
          <div className="text-xs text-slate-600">© 2026 · Spend. Earn. Own.</div>
        </div>
      </footer>
    </div>
  );
}
