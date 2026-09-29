"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CARDS = [
  {
    ticker: "COST",
    merchant: "Costco Wholesale",
    title: "Spend the way you already spend",
    description:
      "Grocery, fuel, software, the weekly shop. Qualifying purchases at public companies are the input. No new card, no points catalogue.",
    className: "lg:col-span-3",
    size: "lg",
  },
  {
    ticker: "AAPL",
    merchant: "Apple",
    title: "Every merchant has a ticker",
    description:
      "The protocol holds a map from merchant to listed equity. A night at Amazon is AMZN. An iPhone is AAPL. The match is the product.",
    className: "lg:col-span-3",
    size: "lg",
  },
  {
    ticker: "MSFT",
    merchant: "Microsoft",
    title: "The ticket is the allocation",
    description:
      "A reward engine reads the settled amount and computes your fractional share. The receipt is the instruction.",
    className: "lg:col-span-2",
    size: "sm",
  },
  {
    ticker: "GOOGL",
    merchant: "Alphabet",
    title: "Positions you can actually hold",
    description:
      "Allocations settle into a portfolio of the companies you already fund — not a coupon, not a cashback balance.",
    className: "lg:col-span-2",
    size: "sm",
  },
  {
    ticker: "AMZN",
    merchant: "Amazon",
    title: "The companies you fund, fund you",
    description:
      "Wherever those merchants trade, the same mapping applies. Illustrative coverage only — live markets ship with the protocol, not this page.",
    className: "sm:col-span-2 lg:col-span-2",
    size: "sm",
  },
] as const;

export default function FUIBentoGridDark() {
  return (
    <div className="mx-auto flex min-w-0 max-w-[1440px] scroll-mt-24 flex-col bg-void px-6 pb-8 pt-28 sm:px-10 lg:px-20">
      <h2 className="max-w-4xl font-sans text-3xl font-medium tracking-[-0.03em] text-white md:text-5xl">
        Shop at Costco. Hold COST.
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-violet-hot/70 md:text-xl">
        Melo maps each qualifying merchant to its listed equity and books a
        fractional allocation from the ticket. You keep the same card. The
        protocol keeps the ledger.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-6">
        {CARDS.map((card) => (
          <BentoCard key={card.ticker} {...card} />
        ))}
      </div>
    </div>
  );
}

export function BentoCard({
  ticker,
  merchant,
  title,
  description,
  className,
  size,
}: {
  ticker: string;
  merchant: string;
  title: string;
  description: string;
  className?: string;
  size: "lg" | "sm";
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/10",
        "shadow-[0_24px_48px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:bg-violet/[0.06] hover:ring-violet/40",
        size === "lg" ? "min-h-[26rem] sm:col-span-2 lg:col-span-3" : "min-h-[20rem]"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet/20 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-7 py-4">
        <span className="text-sm text-white/70">{merchant}</span>
        <span className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-violet-hot/60">
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          {ticker}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col justify-between gap-10 p-7 md:p-8">
        <p
          className={clsx(
            "font-mono font-light tracking-[0.06em] text-violet-hot transition-colors duration-300 group-hover:text-white",
            size === "lg" ? "text-6xl md:text-7xl" : "text-5xl"
          )}
        >
          {ticker}
        </p>
        <div>
          <h3 className="text-2xl font-medium tracking-[-0.02em] text-white">
            {title}
          </h3>
          <p className="mt-3 max-w-[36rem] text-sm leading-6 text-violet-hot/70">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
