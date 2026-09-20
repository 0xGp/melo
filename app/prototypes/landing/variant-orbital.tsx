"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const STOCKS = [
  { ticker: "AAPL", name: "Apple", spend: "$1,240", reward: "$24.80", change: "+8.2%", color: "#34d399" },
  { ticker: "COST", name: "Costco", spend: "$890", reward: "$17.80", change: "+4.1%", color: "#60a5fa" },
  { ticker: "AMZN", name: "Amazon", spend: "$2,100", reward: "$42.00", change: "+11.3%", color: "#a78bfa" },
  { ticker: "GOOGL", name: "Alphabet", spend: "$340", reward: "$6.80", change: "+6.2%", color: "#fbbf24" },
  { ticker: "MSFT", name: "Microsoft", spend: "$760", reward: "$15.20", change: "+9.7%", color: "#fb923c" },
];

const NAV_LINKS = ["Protocol", "How It Works", "Portfolio", "Roadmap"];

function OrbitalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    function resize() {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas!.offsetWidth;
    const H = () => canvas!.offsetHeight;

    // Particles
    const particles = Array.from({ length: 180 }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      r: 160 + Math.random() * 40,
      speed: (Math.random() - 0.5) * 0.003,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // Orbit rings config
    const rings = [
      { tilt: 0.3, radius: 200, speed: 0.004, dotCount: 3, color: "rgba(96,165,250,0.7)" },
      { tilt: -0.6, radius: 260, speed: -0.003, dotCount: 4, color: "rgba(167,139,250,0.6)" },
      { tilt: 0.9, radius: 320, speed: 0.002, dotCount: 5, color: "rgba(52,211,153,0.5)" },
    ];

    function draw() {
      t += 1;
      ctx.clearRect(0, 0, W(), H());

      const cx = W() / 2;
      const cy = H() / 2;

      // Glow background
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 340);
      grd.addColorStop(0, "rgba(96,165,250,0.08)");
      grd.addColorStop(0.5, "rgba(167,139,250,0.04)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W(), H());

      // Sphere particles
      particles.forEach((p) => {
        p.theta += p.speed;
        const x3d = p.r * Math.sin(p.phi) * Math.cos(p.theta);
        const y3d = p.r * Math.cos(p.phi);
        const z3d = p.r * Math.sin(p.phi) * Math.sin(p.theta);

        // Simple perspective
        const perspective = 600;
        const scale = perspective / (perspective - z3d);
        const x = cx + x3d * scale;
        const y = cy + y3d * scale;
        const depthOpacity = (z3d + p.r) / (2 * p.r);

        ctx.beginPath();
        ctx.arc(x, y, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${p.opacity * depthOpacity})`;
        ctx.fill();
      });

      // Orbit rings
      rings.forEach((ring) => {
        const ringT = t * ring.speed;

        // Draw ellipse for ring
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radius, ring.radius * Math.abs(Math.sin(ring.tilt + 0.3)), 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color.replace("0.", "0.15");
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dots on ring
        for (let d = 0; d < ring.dotCount; d++) {
          const angle = ringT + (d / ring.dotCount) * Math.PI * 2;
          const rx = ring.radius * Math.cos(angle);
          const ry = ring.radius * Math.abs(Math.sin(ring.tilt + 0.3)) * Math.sin(angle);
          ctx.beginPath();
          ctx.arc(rx, ry, 3, 0, Math.PI * 2);
          ctx.fillStyle = ring.color;
          ctx.fill();

          // Glow
          const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, 12);
          glow.addColorStop(0, ring.color.replace(/[\d.]+\)$/, "0.4)"));
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fillRect(rx - 12, ry - 12, 24, 24);
        }
        ctx.restore();
      });

      // Center core glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      coreGlow.addColorStop(0, "rgba(96,165,250,0.15)");
      coreGlow.addColorStop(0.4, "rgba(167,139,250,0.08)");
      coreGlow.addColorStop(1, "transparent");
      ctx.fillStyle = coreGlow;
      ctx.fillRect(cx - 80, cy - 80, 160, 160);

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
}

function PortfolioCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % STOCKS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const total = STOCKS.reduce((sum, s) => sum + parseFloat(s.reward.replace("$", "")), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full max-w-xs rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,15,25,0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 0 1px rgba(96,165,250,0.1), 0 32px 64px rgba(0,0,0,0.5)",
      }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-500 tracking-widest uppercase">Portfolio</span>
          <span className="text-xs text-emerald-400 font-medium">Live</span>
        </div>
        <div className="text-3xl font-bold text-white mb-4">
          ${total.toFixed(2)}
        </div>

        <div className="space-y-2">
          {STOCKS.map((s, i) => (
            <motion.div
              key={s.ticker}
              className="flex items-center justify-between py-2 px-3 rounded-xl transition-colors"
              animate={{
                background: i === activeIndex ? "rgba(96,165,250,0.08)" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
                />
                <div>
                  <div className="text-sm font-semibold text-white">{s.ticker}</div>
                  <div className="text-xs text-slate-500">{s.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">{s.reward}</div>
                <div className="text-xs text-emerald-400">{s.change}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="px-5 py-3 text-xs text-slate-600"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        Rewards from your last 30 days of spending
      </div>
    </motion.div>
  );
}

function TransactionFeed() {
  const [items, setItems] = useState(STOCKS.slice(0, 3));
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...STOCKS].sort(() => Math.random() - 0.5).slice(0, 3);
        return next;
      });
      setKey((k) => k + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-600 uppercase tracking-widest mb-3">Live rewards</div>
      <AnimatePresence mode="popLayout">
        {items.map((s) => (
          <motion.div
            key={`${s.ticker}-${key}`}
            initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 16, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-3 py-2.5 px-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: `${s.color}20`, color: s.color }}
            >
              {s.ticker.slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="text-sm text-white font-medium">Spent {s.spend} at {s.name}</div>
              <div className="text-xs text-slate-500">Earned {s.reward} of {s.ticker}</div>
            </div>
            <div className="text-xs text-emerald-400 font-medium">+{s.reward}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function VariantOrbital() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
    >
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
            style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}
          >
            M
          </div>
          <span className="text-white font-semibold tracking-tight">MELO</span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-slate-400 hover:text-white transition-colors duration-200">Sign in</button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm font-medium px-4 py-2 rounded-full text-black"
            style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}
          >
            Get early access
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Canvas bg */}
        <div className="absolute inset-0">
          <OrbitalCanvas />
        </div>

        {/* Star field */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{ opacity: [null, 0, Math.random() * 0.5 + 0.1] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
              style={{
                background: "rgba(96,165,250,0.1)",
                border: "1px solid rgba(96,165,250,0.2)",
                color: "#60a5fa",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Spend-to-Own Protocol · v1.0
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6"
            >
              <span className="text-white">Spend.</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Earn.
              </span>
              <br />
              <span className="text-white">Own.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-md"
            >
              Every purchase you make earns fractional ownership in the companies you already support. 
              Turn your spending into a portfolio — automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(96,165,250,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 rounded-full font-semibold text-black text-sm"
                style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}
              >
                Join the waitlist →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 rounded-full font-medium text-white text-sm"
                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
              >
                Read the whitepaper
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex gap-8 mt-12"
            >
              {[
                { val: "$2.1B", label: "Protocol Volume" },
                { val: "8,400+", label: "Waitlist Members" },
                { val: "47", label: "Partner Merchants" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white">{s.val}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right card */}
          <div className="flex flex-col gap-6 items-center lg:items-start">
            <PortfolioCard />
            <div
              className="w-full max-w-xs rounded-2xl p-5"
              style={{
                background: "rgba(15,15,25,0.85)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <TransactionFeed />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <section className="py-32 px-6 relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.08), transparent 60%)" }}
        />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-20"
          >
            <div className="text-xs text-blue-400 tracking-widest uppercase mb-4">How it works</div>
            <h2 className="text-4xl lg:text-5xl font-black text-white">Three steps to ownership</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Spend normally",
                desc: "Shop at participating merchants using your existing payment method. No new card required.",
                color: "#60a5fa",
                icon: "🛍",
              },
              {
                step: "02",
                title: "Earn equity rewards",
                desc: "MELO identifies qualifying purchases and calculates your investment reward automatically.",
                color: "#a78bfa",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Build your portfolio",
                desc: "Rewards are converted to fractional shares of the companies you spend with. Own a piece of what you buy.",
                color: "#34d399",
                icon: "📈",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="relative p-7 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${item.color}20`,
                  boxShadow: `0 0 40px ${item.color}08`,
                }}
              >
                <div
                  className="text-3xl mb-4"
                  style={{ filter: `drop-shadow(0 0 8px ${item.color}60)` }}
                >
                  {item.icon}
                </div>
                <div className="text-xs font-bold mb-2" style={{ color: item.color }}>
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl mx-auto text-center p-16 rounded-3xl relative overflow-hidden"
          style={{
            background: "rgba(15,15,30,0.9)",
            border: "1px solid rgba(96,165,250,0.15)",
            boxShadow: "0 0 80px rgba(96,165,250,0.08), 0 0 160px rgba(167,139,250,0.04)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.3), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
              The economy should work <span style={{ color: "#60a5fa" }}>for you.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
              Join thousands already on the waitlist. Be the first to turn your spending into ownership.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 outline-none focus:border-blue-400/40 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full font-semibold text-sm text-black whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}
              >
                Get access
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black"
              style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}
            >
              M
            </div>
            <span className="text-white font-semibold text-sm">MELO</span>
          </div>
          <div className="text-xs text-slate-600">
            © 2026 MELO Protocol · Spend. Earn. Own.
          </div>
        </div>
      </footer>
    </div>
  );
}
