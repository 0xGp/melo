"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import {
  useAccount,
  useBalance,
  useChainId,
  usePublicClient,
  useReadContract,
  useWaitForTransactionReceipt,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import { formatEther, parseEther, type Address } from "viem";
import {
  ethToMelo,
  formatMelo,
  meloAbi,
  meloBytecode,
  readStoredVault,
  writeStoredVault,
} from "@/lib/melo";
import { ConnectButton } from "@/components/wallet/connect-button";

function errorMessage(err: unknown): string {
  if (!err || typeof err !== "object") return "Something failed. Try again.";
  const e = err as { shortMessage?: string; message?: string };
  const raw = e.shortMessage ?? e.message ?? "Something failed. Try again.";
  if (/user rejected|denied/i.test(raw)) return "You rejected the wallet prompt.";
  if (/insufficient funds/i.test(raw)) return "Not enough ETH in this wallet for the deposit and gas.";
  return raw;
}

export function VaultPanel() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { data: ethBalance } = useBalance({ address });
  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const [vault, setVault] = useState<Address | undefined>();
  const [amount, setAmount] = useState("0.01");
  const [status, setStatus] = useState<"idle" | "deploying" | "depositing" | "watching">(
    "idle"
  );
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [lastMint, setLastMint] = useState<string | null>(null);

  useEffect(() => {
    setVault(readStoredVault(chainId));
  }, [chainId]);

  const { data: receipt, isLoading: isMining } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { data: meloBalance, refetch: refetchMelo } = useReadContract({
    address: vault,
    abi: meloAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(vault && address) },
  });

  useEffect(() => {
    if (!receipt || receipt.status !== "success") return;
    setTxHash(undefined);
    setStatus("idle");
    void refetchMelo();
  }, [receipt, refetchMelo]);

  const preview = useMemo(() => {
    try {
      return formatMelo(ethToMelo(amount));
    } catch {
      return "0";
    }
  }, [amount]);

  const addToWallet = useCallback(async (token: Address) => {
    if (!window.ethereum) return;
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token,
          symbol: "MELO",
          decimals: 18,
        },
      },
    });
  }, []);

  async function ensureVault(): Promise<Address> {
    if (vault) return vault;
    if (!walletClient || !publicClient || !address) {
      throw new Error("Connect a wallet first.");
    }
    setStatus("deploying");
    const hash = await walletClient.deployContract({
      abi: meloAbi,
      bytecode: meloBytecode,
      account: address,
    });
    const deployed = await publicClient.waitForTransactionReceipt({ hash });
    if (!deployed.contractAddress) throw new Error("Vault deploy did not return an address.");
    writeStoredVault(chainId, deployed.contractAddress);
    setVault(deployed.contractAddress);
    return deployed.contractAddress;
  }

  async function onDeposit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLastMint(null);
    try {
      const wei = parseEther(amount);
      if (wei <= 0n) {
        setError("Enter an amount greater than zero.");
        return;
      }
      const token = await ensureVault();
      setStatus("depositing");
      const hash = await writeContractAsync({
        address: token,
        abi: meloAbi,
        functionName: "deposit",
        value: wei,
      });
      setTxHash(hash);
      setLastMint(preview);
      setStatus("watching");
      try {
        await addToWallet(token);
      } catch {
        // Adding the token is optional; the balance still lands on-chain.
      }
    } catch (err) {
      setStatus("idle");
      setError(errorMessage(err));
    }
  }

  const busy = status !== "idle" || isWriting || isMining;

  return (
    <section
      id="vault"
      className="relative scroll-mt-24 overflow-hidden bg-violet-deep px-6 py-28 sm:px-10 lg:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-violet/40 blur-[80px]"
      />
      <div className="relative mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)]">
        <div>
          <h2 className="max-w-xl text-4xl font-medium tracking-[-0.03em] text-white md:text-6xl">
            Deposit. Hold MELO.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
            Connect your wallet and deposit ETH. The vault mints MELO share
            tokens into that wallet — 1 ETH books 1,000 MELO. This is a
            prototype vault, not a brokerage and not a purchase of listed
            stock.
          </p>
          {typeof meloBalance === "bigint" ? (
            <p className="mt-6 font-mono text-sm tracking-[0.08em] text-violet-hot">
              Your MELO · {formatMelo(meloBalance)}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-white/80">Wallet</p>
            <ConnectButton showInstallHint />
          </div>

          {isConnected ? (
            <form onSubmit={onDeposit} className="flex flex-col gap-3">
              <label htmlFor="deposit-eth" className="text-sm text-white/80">
                Deposit ETH
              </label>
              <input
                id="deposit-eth"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.01"
                className="h-12 rounded-full border border-white/15 bg-black/40 px-5 font-mono text-sm text-white outline-none transition placeholder:text-violet-hot/40 focus:border-violet"
              />
              <p className="font-mono text-sm tabular-nums text-violet-hot">
                You receive {preview} MELO
              </p>
              {ethBalance ? (
                <p className="text-xs text-white/60">
                  Wallet ETH · {Number(formatEther(ethBalance.value)).toFixed(4)}
                </p>
              ) : null}
              {error ? (
                <p role="alert" className="text-sm text-violet-hot">
                  {error}
                </p>
              ) : null}
              {lastMint && status === "idle" ? (
                <p role="status" className="text-sm text-white">
                  {lastMint} MELO is in your wallet. If it is hidden, add the
                  MELO token from the prompt.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={busy}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-hot px-6 text-sm font-medium text-void transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "deploying"
                  ? "Opening vault…"
                  : status === "depositing" || isWriting
                    ? "Confirm in wallet…"
                    : isMining
                      ? "Booking shares…"
                      : vault
                        ? "Deposit for MELO"
                        : "Open vault and deposit"}
                {busy ? null : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>
              {!vault ? (
                <p className="text-xs leading-relaxed text-white/60">
                  First deposit deploys a Melo vault from your wallet on this
                  network, then mints. You pay gas. Set{" "}
                  <span className="font-mono">NEXT_PUBLIC_MELO_VAULT</span> to
                  use a shared vault instead.
                </p>
              ) : (
                <p className="break-all font-mono text-xs text-white/50">
                  Vault {vault}
                </p>
              )}
            </form>
          ) : (
            <p className="text-sm leading-relaxed text-white/70">
              Connect to deposit. MELO will show as an ERC-20 named MELO in the
              same wallet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
