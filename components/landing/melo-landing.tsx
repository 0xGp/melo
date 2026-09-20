"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import FUIBentoGridDark from "@/components/ui/bento";
import { SiteFooter, SiteNav } from "@/components/site/site-nav";
import { VaultPanel } from "@/components/wallet/vault-panel";

function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

const LEDGER = [
  { ticker: "COST", merchant: "Costco Wholesale", spend: 890.0, reward: 17.8, shares: "0.020" },
  { ticker: "AAPL", merchant: "Apple", spend: 1240.0, reward: 24.8, shares: "0.116" },
  { ticker: "AMZN", merchant: "Amazon", spend: 2100.0, reward: 42.0, shares: "0.228" },
  { ticker: "MSFT", merchant: "Microsoft", spend: 760.0, reward: 15.2, shares: "0.037" },
  { ticker: "GOOGL", merchant: "Alphabet", spend: 340.0, reward: 6.8, shares: "0.039" },
] as const;

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function Hero() {
  const narrow = useNarrow();

  return (
    <section id="top" className="relative min-h-[100svh] w-full">
      <BlackHoleHeroSection
        focus={narrow ? [0.5, 0.72] : [0.62, 0.48]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={0.88}
        distance={22}
        elevation={narrow ? -7 : -5.5}
        fov={narrow ? 58 : 46}
        glow={narrow ? 1.1 : 1.35}
        brightness={1.15}
        steps={narrow ? 200 : 300}
        resolution={narrow ? 0.6 : 0.75}
        hotColor="#F4EEFF"
        midColor="#A78BFA"
        coolColor="#4C1D95"
        starBrightness={0.35}
        className="min-h-[100svh]"
      >
        <div className="flex h-full min-h-[100svh] items-start px-6 pt-28 sm:px-10 md:items-center md:pt-8 lg:px-20">
          <div className="max-w-[34rem]">
            <h1 className="text-[2.6rem] font-light leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.35rem]">
              Spend becomes
              <br />
              ownership.
            </h1>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-violet-hot/70 md:mt-7">
              Qualifying purchases map to listed equity. Deposit ETH and the
              vault mints MELO share tokens into your wallet.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <a
                href="#vault"
                className="inline-flex items-center gap-2 rounded-full bg-violet-hot px-6 py-3 text-sm font-medium text-void transition hover:bg-white"
              >
                Connect and deposit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/whitepaper"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Read the whitepaper
                <ArrowDown className="h-4 w-4 rotate-[-90deg]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </BlackHoleHeroSection>
    </section>
  );
}

function Ledger() {
  return (
    <section
      id="ledger"
      className="relative scroll-mt-24 border-t border-white/10 px-6 py-28 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-white md:text-5xl">
            A receipt is an instruction.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-violet-hot/70">
            Illustrative thirty-day sample of merchant mapping. These rows are
            demonstration data — not live holdings. MELO in your wallet is a
            separate, on-chain share token minted on deposit.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-white/10">
          <div className="hidden grid-cols-[5.5rem_1fr_8rem_8rem_7rem] gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-[0.7rem] tracking-[0.16em] text-violet-hot/50 md:grid">
            <span>TICKER</span>
            <span>MERCHANT</span>
            <span className="text-right">SPEND</span>
            <span className="text-right">REWARD</span>
            <span className="text-right">SHARES</span>
          </div>
          <ol>
            {LEDGER.map((row, i) => (
              <li
                key={row.ticker}
                className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-white/10 px-6 py-5 last:border-b-0 md:grid-cols-[5.5rem_1fr_8rem_8rem_7rem] md:items-baseline"
                style={{ background: i % 2 === 0 ? "transparent" : "rgba(167,139,250,0.04)" }}
              >
                <span className="font-mono text-sm tracking-[0.12em] text-violet-hot">
                  {row.ticker}
                </span>
                <span className="col-start-1 row-start-2 text-sm text-white md:col-start-auto md:row-start-auto">
                  {row.merchant}
                </span>
                <span className="font-mono text-sm tabular-nums text-white/80 md:text-right">
                  {money(row.spend)}
                </span>
                <span className="font-mono text-sm tabular-nums text-violet-hot md:text-right">
                  +{money(row.reward)}
                </span>
                <span className="col-span-2 font-mono text-sm tabular-nums text-white/60 md:col-span-1 md:text-right">
                  {row.shares} sh
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function MeloLanding() {
  return (
    <div className="min-h-full w-full bg-void text-foreground">
      <a
        href="#vault"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-violet-hot focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to vault
      </a>
      <SiteNav />
      <Hero />
      <div id="protocol" className="scroll-mt-24">
        <FUIBentoGridDark />
      </div>
      <Ledger />
      <VaultPanel />
      <SiteFooter />
    </div>
  );
}
