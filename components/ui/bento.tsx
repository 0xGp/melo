"use client";

import type { ReactNode } from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const PLATES = {
  retail:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  charts:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
  checkout:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
  trading:
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80",
  city: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80",
} as const;

function Plate({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={clsx("absolute inset-0 overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover saturate-[0.7] contrast-110"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,0,20,0.15)_0%,rgba(46,16,101,0.45)_48%,#050014_100%)]" />
    </div>
  );
}

export default function FUIBentoGridDark() {
  return (
    <div className="mx-auto flex min-w-0 scroll-mt-24 flex-col bg-void px-6 pb-8 pt-28 sm:px-10 lg:px-20">
      <h2 className="max-w-4xl font-sans text-3xl font-medium tracking-[-0.03em] text-white md:text-5xl">
        Shop at Costco. Hold COST.
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-violet-hot/70 md:text-xl">
        Melo maps each qualifying merchant to its listed equity and books a
        fractional allocation from the ticket. You keep the same card. The
        protocol keeps the ledger.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="COST"
          title="Spend the way you already spend"
          description="Grocery, fuel, software, the weekly shop. Qualifying purchases at public companies are the input. No new card, no points catalogue."
          graphic={<Plate src={PLATES.retail} />}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="AAPL"
          title="Every merchant has a ticker"
          description="The protocol holds a map from merchant to listed equity. A night at Amazon is AMZN. An iPhone is AAPL. The match is the product."
          graphic={<Plate src={PLATES.charts} />}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="MSFT"
          title="The ticket is the allocation"
          description="A reward engine reads the settled amount and computes your fractional share. Keyboard optional. The receipt is the instruction."
          graphic={<Plate src={PLATES.checkout} className="-left-24 -top-16" />}
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="GOOGL"
          title="Positions you can actually hold"
          description="Allocations settle into a portfolio of the companies you already fund — not a coupon, not a cashback balance."
          graphic={<Plate src={PLATES.trading} />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="AMZN"
          title="The companies you fund, fund you"
          description="Wherever those merchants trade, the same mapping applies. Illustrative coverage only — live markets ship with the protocol, not this page."
          graphic={<Plate src={PLATES.city} className="-left-32 -top-28" />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </div>
  );
}

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  graphic?: ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "transform-gpu bg-black shadow-[0_24px_48px_rgba(0,0,0,0.45)] ring-1 ring-white/10",
        "dark:[border:1px_solid_rgba(167,139,250,.18)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/15"
      )}
    >
      <div className="relative h-[29rem] shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% opacity-25 group-data-[dark]:from-[-25%] group-data-[dark]:from-gray-800" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% opacity-25 group-data-[dark]:from-[-25%] group-data-[dark]:from-gray-800" />
        )}
      </div>
      <div className="relative z-20 isolate mt-[-110px] h-[14rem] p-8 text-white backdrop-blur-xl md:p-10">
        <p className="font-mono text-xs tracking-[0.18em] text-violet-hot/80">
          {eyebrow}
        </p>
        <p className="mt-2 text-2xl/8 font-medium tracking-tight text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-violet-hot/70">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
