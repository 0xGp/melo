"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { shortAddress } from "@/lib/melo";

export function ConnectButton({
  className = "",
  showInstallHint = false,
}: {
  className?: string;
  showInstallHint?: boolean;
}) {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [hasInjected, setHasInjected] = useState(true);
  const busy = isConnecting || isPending;

  useEffect(() => {
    setHasInjected(typeof window.ethereum !== "undefined");
  }, []);

  if (isConnected && address) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-sm text-white/90 transition hover:border-white/40 hover:text-white ${className}`}
        title="Disconnect"
      >
        {shortAddress(address)}
      </button>
    );
  }

  return (
    <span className="inline-flex shrink-0 flex-col items-end gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          if (!hasInjected) {
            window.open("https://metamask.io/download/", "_blank", "noopener");
            return;
          }
          const connector = connectors[0] ?? injected();
          connect({ connector });
        }}
        className={`inline-flex items-center justify-center rounded-full bg-violet-hot px-4 py-2 text-sm font-medium text-void transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      >
        {busy ? "Connecting…" : "Connect"}
      </button>
      {error ? (
        <span className="max-w-[14rem] text-right text-xs text-violet-hot">
          {error.message}
        </span>
      ) : null}
      {showInstallHint && !hasInjected ? (
        <a
          href="https://metamask.io/download/"
          className="text-xs text-violet-hot/80 underline-offset-4 hover:underline"
        >
          Get MetaMask
        </a>
      ) : null}
    </span>
  );
}
