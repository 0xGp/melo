"use client";

import Link from "next/link";
import { MeloMark } from "@/components/brand/melo-mark";
import { ConnectButton } from "@/components/wallet/connect-button";

const LINKS = [
  { href: "/#protocol", label: "Protocol" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/#ledger", label: "Ledger" },
  { href: "/#vault", label: "Vault" },
] as const;

export function SiteNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-void/85 backdrop-blur-xl">
      <nav
        className="pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-20"
        aria-label="Primary"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-white">
          <MeloMark className="h-8 w-auto" priority />
          <span className="text-sm font-semibold tracking-[0.18em]">MELO</span>
        </Link>
        <div className="hidden min-w-0 items-center gap-6 text-sm text-violet-hot/70 md:flex lg:gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <ConnectButton />
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-4 border-t border-white/10 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-20">
      <div className="flex items-center gap-2.5">
        <MeloMark className="h-7 w-auto" />
        <span className="text-sm font-semibold tracking-[0.18em] text-white">
          MELO
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm text-violet-hot/70">
        <Link href="/whitepaper" className="transition-colors hover:text-white">
          Whitepaper
        </Link>
        <Link href="/#vault" className="transition-colors hover:text-white">
          Vault
        </Link>
        <p className="text-violet-hot/50">© 2026 MELO. Spend becomes ownership.</p>
      </div>
    </footer>
  );
}
