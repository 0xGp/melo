"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";

const STOCKS = [
  { ticker: "AAPL", name: "Apple", price: 213.42, change: 8.2, reward: 24.80, color: "#00ff9d" },
  { ticker: "COST", name: "Costco", price: 891.15, change: 4.1, reward: 17.80, color: "#00c8ff" },
  { ticker: "AMZN", name: "Amazon", price: 184.32, change: 11.3, reward: 42.00, color: "#ff6b35" },
  { ticker: "GOOGL", name: "Alphabet", price: 172.63, change: 6.2, reward: 6.80, color: "#ffd700" },
  { ticker: "MSFT", name: "Microsoft", price: 411.30, change: 9.7, reward: 15.20, color: "#b088ff" },
  { ticker: "TSLA", name: "Tesla", price: 285.70, change: 3.4, reward: 8.50, color: "#ff3d71" },
];

function WaveCanvas() {
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

    const waves = [
      { amp: 30, freq: 0.008, speed: 0.02, phase: 0, color: "rgba(0,255,157,", y: 0.65 },
      { amp: 20, freq: 0.012, speed: -0.015, phase: 1, color: "rgba(0,200,255,", y: 0.72 },
      { amp: 40, freq: 0.006, speed: 0.025, phase: 2, color: "rgba(176,136,255,", y: 0.60 },
    ];

    function draw() {
      t += 1;
      ctx.clearRect(0, 0, W(), H());

      // Base dark gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H());
      grad.addColorStop(0, "rgba(4,4,20,1)");
      grad.addColorStop(1, "rgba(0,0,8,1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W(), H());

      // Horizontal grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      for (let y = 0; y < H(); y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W(), y);
        ctx.stroke();
      }
      for (let x = 0; x < W(); x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H());
        ctx.stroke();
      }

      waves.forEach((wave) => {
        const baseY = H() * wave.y;

        // Wave path
        ctx.beginPath();
        ctx.moveTo(0, H());

        // Build chart-like ascending wave
        for (let x = 0; x <= W(); x += 2) {
          const progress = x / W();
          const trend = -progress * H() * 0.3; // trending up
          const noise = wave.amp * Math.sin(x * wave.freq + t * wave.speed + wave.phase);
          const y = baseY + trend + noise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Gradient fill below
        const fillGrad = ctx.createLinearGradient(0, 0, 0, H());
        fillGrad.addColorStop(0, `${wave.color}0.06)`);
        fillGrad.addColorStop(1, `${wave.color}0)`);
        ctx.lineTo(W(), H());
        ctx.lineTo(0, H());
        ctx.closePath();
        ctx.fillStyle = fillGrad;
        ctx.fill();

        // Line
        ctx.beginPath();
        for (let x = 0; x <= W(); x += 2) {
          const progress = x / W();
          const trend = -progress * H() * 0.3;
          const noise = wave.amp * Math.sin(x * wave.freq + t * wave.speed + wave.phase);
          const y = baseY + trend + noise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${wave.color}0.5)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Dot at end of each line
        const lastX = W();
        const lastProgress = 1;
        const lastTrend = -lastProgress * H() * 0.3;
        const lastNoise = wave.amp * Math.sin(lastX * wave.freq + t * wave.speed + wave.phase);
        const lastY = baseY + lastTrend + lastNoise;

        ctx.beginPath();
        ctx.arc(lastX - 4, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = `${wave.color}1)`;
        ctx.fill();

        const dotGlow = ctx.createRadialGradient(lastX - 4, lastY, 0, lastX - 4, lastY, 20);
        dotGlow.addColorStop(0, `${wave.color}0.4)`);
        dotGlow.addColorStop(1, "transparent");
        ctx.fillStyle = dotGlow;
        ctx.beginPath();
        ctx.arc(lastX - 4, lastY, 20, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function LiveTicker() {
  const [prices, setPrices] = useState(
    STOCKS.map((s) => ({ ...s, displayPrice: s.price }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((s) => ({
          ...s,
          displayPrice: s.price + (Math.random() - 0.48) * 2,
        }))
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: [0, -100 * STOCKS.length] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-4"
        style={{ width: `${200 * STOCKS.length * 2}px` }}
      >
        {[...prices, ...prices].map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-2 rounded-lg shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              minWidth: "180px",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }}
            />
            <span className="text-xs font-bold font-mono text-white">{s.ticker}</span>
            <span className="text-xs font-mono" style={{ color: s.color }}>
              ${s.displayPrice.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-green-400">+{s.change}%</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function RewardMeter({ stock }: { stock: typeof STOCKS[0] }) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setFill((stock.reward / 50) * 100), 300);
    return () => clearTimeout(timeout);
  }, [stock]);

  return (
    <div
      className="p-4 rounded-xl cursor-pointer group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${stock.color}20`,
        transition: "border-color 0.2s",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div
            className="text-sm font-black font-mono"
            style={{ color: stock.color }}
          >
            {stock.ticker}
          </div>
          <div className="text-xs text-slate-600">{stock.name}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-white font-mono">${stock.reward.toFixed(2)}</div>
          <div className="text-xs" style={{ color: stock.color }}>+{stock.change}%</div>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${fill}%` }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ background: stock.color, boxShadow: `0 0 10px ${stock.color}60` }}
        />
      </div>
    </div>
  );
}

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    let start = 0;
    const step = to / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= to) {
        setVal(to);
        clearInterval(interval);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [to]);

  return (
    <span>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}

export default function VariantVelocity() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((i) => (i + 1) % 5), 1800);
    return () => clearInterval(t);
  }, []);

  const steps = ["BUY", "VERIFY", "REWARD", "INVEST", "OWN"];

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        background: "#040414",
      }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(4,4,20,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded flex items-center justify-center font-black text-sm"
            style={{
              background: "linear-gradient(135deg, #00ff9d, #00c8ff)",
              color: "black",
            }}
          >
            M
          </div>
          <span className="font-black text-white tracking-tight">MELO</span>
        </div>
        <div className="flex items-center gap-6">
          {["Protocol", "Portfolio", "Docs"].map((l) => (
            <a key={l} href="#" className="text-sm text-slate-500 hover:text-white transition-colors duration-150 font-mono">
              {l}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-sm font-bold px-5 py-2 rounded font-mono"
          style={{
            background: "linear-gradient(135deg, #00ff9d, #00c8ff)",
            color: "black",
          }}
        >
          JOIN WAITLIST
        </motion.button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-20">
        {/* Wave canvas */}
        <div className="absolute inset-0">
          <WaveCanvas />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 mb-8"
              >
                <div
                  className="text-xs font-bold font-mono px-3 py-1.5 rounded"
                  style={{ background: "rgba(0,255,157,0.1)", color: "#00ff9d", border: "1px solid rgba(0,255,157,0.2)" }}
                >
                  ● LIVE PROTOCOL
                </div>
                <div className="text-xs text-slate-600 font-mono">v1.0.0</div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-6"
              >
                <span className="text-white">SPEND.</span>
                <br />
                <span style={{ color: "#00ff9d" }}>EARN.</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #00c8ff, #b088ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  OWN.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md font-light"
              >
                Turn every transaction into fractional ownership. Buy at Apple, earn AAPL. 
                Shop at Costco, earn COST. Your spending becomes your portfolio.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col sm:flex-row gap-3 mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,255,157,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 font-black text-sm font-mono rounded text-black"
                  style={{ background: "linear-gradient(135deg, #00ff9d, #00c8ff)" }}
                >
                  GET EARLY ACCESS →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 font-bold text-sm font-mono rounded text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
                >
                  READ WHITEPAPER
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { val: 2100, prefix: "$", suffix: "M+", label: "VOLUME" },
                  { val: 8400, prefix: "", suffix: "+", label: "WAITLIST" },
                  { val: 47, prefix: "", suffix: "", label: "MERCHANTS" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black font-mono text-white">
                      <CountUp to={s.val} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-slate-600 font-mono tracking-widest">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: rewards grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between mb-4 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">PORTFOLIO_REWARDS</div>
                <div className="text-xs font-mono text-green-400">● LIVE</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {STOCKS.map((s, i) => (
                  <motion.div
                    key={s.ticker}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 + 0.4, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <RewardMeter stock={s} />
                  </motion.div>
                ))}
              </div>

              {/* Total */}
              <div
                className="mt-4 p-4 rounded-xl flex items-center justify-between"
                style={{
                  background: "rgba(0,255,157,0.05)",
                  border: "1px solid rgba(0,255,157,0.15)",
                }}
              >
                <span className="text-sm font-mono text-slate-400">TOTAL_PORTFOLIO</span>
                <span className="text-xl font-black font-mono" style={{ color: "#00ff9d" }}>
                  $115.10
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live ticker strip */}
      <div
        className="py-4 border-t border-b border-white/5 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.01)" }}
      >
        <LiveTicker />
      </div>

      {/* Protocol flow */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-12"
          >
            {">"} protocol_flow.ts
          </motion.div>

          {/* Animated steps */}
          <div className="flex items-center gap-3 flex-wrap">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{
                    background: i === activeStep
                      ? "linear-gradient(135deg, rgba(0,255,157,0.15), rgba(0,200,255,0.15))"
                      : "rgba(255,255,255,0.03)",
                    borderColor: i === activeStep ? "rgba(0,255,157,0.4)" : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="px-5 py-3 rounded-xl border"
                >
                  <div
                    className="text-sm font-black font-mono"
                    style={{ color: i === activeStep ? "#00ff9d" : "rgba(255,255,255,0.3)" }}
                  >
                    {step}
                  </div>
                  <div className="text-xs font-mono text-slate-600 mt-0.5">step_{String(i + 1).padStart(2, "0")}</div>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="text-slate-700 font-mono text-lg">→</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Step descriptions */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Purchase detection",
                desc: "MELO integrates with your payment method to detect qualifying purchases at participating merchants in real time.",
                tag: "BUY + VERIFY",
                color: "#00ff9d",
              },
              {
                title: "Reward calculation",
                desc: "A configurable reward engine maps each merchant to its publicly traded equity and computes your fractional allocation.",
                tag: "REWARD + INVEST",
                color: "#00c8ff",
              },
              {
                title: "Fractional settlement",
                desc: "Rewards are converted to verified fractional positions through regulated custody infrastructure. You own what you earn.",
                tag: "OWN",
                color: "#b088ff",
              },
            ].map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${item.color}15`,
                }}
              >
                <div
                  className="text-xs font-mono font-bold mb-3 px-2 py-1 rounded inline-block"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.tag}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mx-auto p-12 rounded-2xl relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,255,157,0.12)",
            boxShadow: "0 0 80px rgba(0,255,157,0.04)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,157,0.5), transparent)" }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-xs font-mono text-slate-600 tracking-widest mb-3">{">"} melo.join()</div>
              <h2 className="text-4xl font-black leading-tight">
                <span className="text-white">Start earning</span>
                <br />
                <span style={{ color: "#00ff9d" }}>what you deserve.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <p className="text-sm text-slate-500 font-mono">8,400+ on the waitlist. Protocol launching soon.</p>
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 rounded-lg text-sm font-mono text-white placeholder-slate-700 outline-none bg-transparent"
                style={{ border: "1px solid rgba(0,255,157,0.2)", background: "rgba(0,255,157,0.03)" }}
              />
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,255,157,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="py-3 font-black font-mono rounded-lg text-sm text-black"
                style={{ background: "linear-gradient(135deg, #00ff9d, #00c8ff)" }}
              >
                GET_ACCESS.exe →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 lg:px-16 border-t border-white/5"
        style={{ background: "rgba(255,255,255,0.01)" }}
      >
        <div className="flex items-center justify-between">
          <div className="font-black text-lg text-white tracking-tight">MELO</div>
          <div className="text-xs font-mono text-slate-700">© 2026 · SPEND. EARN. OWN.</div>
        </div>
      </footer>
    </div>
  );
}
