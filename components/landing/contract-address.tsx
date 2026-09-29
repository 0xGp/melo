"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { MELO_CONTRACT_ADDRESS, shortAddress } from "@/lib/melo";

const CONTRACT: string = MELO_CONTRACT_ADDRESS;
const isAddress = /^0x[a-fA-F0-9]{40}$/.test(CONTRACT);

export function ContractAddress({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!isAddress) return;
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/15 bg-void/60 py-1.5 pl-4 pr-1.5 backdrop-blur-md ${className}`}
    >
      <span className="text-xs font-medium text-violet-hot/70">Contract</span>
      <span
        className={`truncate text-sm text-white ${isAddress ? "font-mono tracking-[0.04em]" : ""}`}
        title={isAddress ? CONTRACT : undefined}
      >
        {isAddress ? (
          <>
            <span className="hidden sm:inline">{CONTRACT}</span>
            <span className="sm:hidden">{shortAddress(CONTRACT)}</span>
          </>
        ) : (
          "Announced at launch"
        )}
      </span>
      {isAddress ? (
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Contract address copied" : "Copy contract address"}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-violet-hot transition hover:bg-violet-hot hover:text-void"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      ) : (
        <span className="pr-2.5" />
      )}
    </div>
  );
}
