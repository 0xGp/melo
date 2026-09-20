import type { Metadata } from "next";
import { Whitepaper } from "@/components/whitepaper/whitepaper";

export const metadata: Metadata = {
  title: "MELO Whitepaper — Spend becomes ownership",
  description:
    "The Melo protocol: spend-to-own mapping, the MELO share token, and the deposit vault.",
};

export default function WhitepaperPage() {
  return <Whitepaper />;
}
