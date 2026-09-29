import { type Address, formatEther, parseEther } from "viem";
import { meloArtifact } from "@/lib/melo-artifact";

export const meloAbi = meloArtifact.abi;
export const meloBytecode = meloArtifact.bytecode as `0x${string}`;

export const MELO_CONTRACT_ADDRESS =
  "0x3014adea7398b6ef1c542943d8628a329124d17c" as Address;

/** 1 ETH → 1,000 MELO. Must match SHARES_PER_ETH in MeloShare.sol. */
export const MELO_PER_ETH = 1000n;

export function vaultStorageKey(chainId: number) {
  return `melo.vault.${chainId}`;
}

export function readStoredVault(chainId: number): Address | undefined {
  if (typeof window === "undefined") return undefined;
  const env = process.env.NEXT_PUBLIC_MELO_VAULT;
  if (env && /^0x[a-fA-F0-9]{40}$/.test(env)) return env as Address;
  const stored = window.localStorage.getItem(vaultStorageKey(chainId));
  if (stored && /^0x[a-fA-F0-9]{40}$/.test(stored)) return stored as Address;
  return undefined;
}

export function writeStoredVault(chainId: number, address: Address) {
  window.localStorage.setItem(vaultStorageKey(chainId), address);
}

export function ethToMelo(eth: string): bigint {
  const wei = parseEther(eth || "0");
  return wei * MELO_PER_ETH;
}

export function formatMelo(value: bigint): string {
  const n = Number(formatEther(value));
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
