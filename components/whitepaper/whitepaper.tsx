"use client";

import { SiteFooter, SiteNav } from "@/components/site/site-nav";

export function Whitepaper() {
  return (
    <div className="min-h-full w-full bg-void text-foreground">
      <SiteNav />
      <article className="mx-auto max-w-[42rem] px-6 pb-28 pt-28 sm:px-10">
        <h1 className="text-4xl font-light leading-[1.08] tracking-[-0.03em] text-white md:text-6xl">
          Spend becomes ownership.
        </h1>
        <p className="mt-4 font-mono text-xs tracking-[0.18em] text-violet-hot/70">
          MELO · v0.1 · 20 September 2026
        </p>
        <p className="mt-8 text-lg leading-relaxed text-violet-hot/80">
          Melo is a spend-to-own protocol. Qualifying purchases at public
          companies are treated as allocation events against those companies’
          listed equity. Separately, anyone with a wallet can deposit ETH into
          the Melo vault and receive MELO — an ERC-20 share token — in that
          same wallet.
        </p>

        <nav aria-label="Contents" className="mt-12 border-y border-white/10 py-6">
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>
              <a href="#mechanism" className="hover:text-white">
                Mechanism
              </a>
            </li>
            <li>
              <a href="#share" className="hover:text-white">
                The MELO share
              </a>
            </li>
            <li>
              <a href="#vault-spec" className="hover:text-white">
                Deposit vault
              </a>
            </li>
            <li>
              <a href="#parameters" className="hover:text-white">
                Parameters
              </a>
            </li>
            <li>
              <a href="#limits" className="hover:text-white">
                What this is not
              </a>
            </li>
          </ul>
        </nav>

        <section id="mechanism" className="scroll-mt-28">
          <h2 className="mt-16 text-2xl font-medium tracking-[-0.03em] text-white md:text-3xl">
            Mechanism
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-violet-hot/80">
            Everyday spend is the input. A receipt at a participating merchant
            is matched to that merchant’s listed ticker. The protocol computes a
            fractional allocation from the settled ticket. The shopper does not
            change cards. The ledger changes.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-violet-hot/80">
            Example, labeled as illustration: $890 at Costco maps to COST. The
            reward engine books a fractional COST position. That merchant map is
            the product claim. It is not yet a live brokerage feed.
          </p>
        </section>

        <section id="share" className="scroll-mt-28">
          <h2 className="mt-16 text-2xl font-medium tracking-[-0.03em] text-white md:text-3xl">
            The MELO share
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-violet-hot/80">
            MELO is the protocol’s share token. Name MELO. Symbol MELO. 18
            decimals. It is an ERC-20 that a wallet can hold, transfer, and
            display once the token is added. A deposit is the mint instruction:
            ETH in, MELO out, to the depositing address.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-violet-hot/80">
            After a successful deposit, the interface asks the wallet to watch
            the MELO asset. If the prompt is skipped, the balance still exists
            on-chain at the vault address; add the token with that address.
          </p>
        </section>

        <section id="vault-spec" className="scroll-mt-28">
          <h2 className="mt-16 text-2xl font-medium tracking-[-0.03em] text-white md:text-3xl">
            Deposit vault
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-violet-hot/80">
            The v0 vault is a single contract: it is both the ERC-20 and the
            payable deposit function. ETH sent to{" "}
            <span className="font-mono text-sm text-violet-hot">deposit()</span>{" "}
            stays in the contract. MELO is minted to{" "}
            <span className="font-mono text-sm text-violet-hot">msg.sender</span>.
            There is no redeem in v0. There is no automated purchase of listed
            stock.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-violet-hot/80">
            If a shared vault address is not configured, the first deposit from
            a browser deploys a vault from the connected wallet on the current
            network. That wallet pays gas and becomes the first depositor. A
            production deployment sets{" "}
            <span className="font-mono text-sm text-violet-hot">
              NEXT_PUBLIC_MELO_VAULT
            </span>{" "}
            so every visitor mints from the same contract.
          </p>
        </section>

        <section id="parameters" className="scroll-mt-28">
          <h2 className="mt-16 text-2xl font-medium tracking-[-0.03em] text-white md:text-3xl">
            Parameters
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <table className="w-full text-left text-sm">
              <tbody>
                {[
                  ["Token", "MELO"],
                  ["Symbol", "MELO"],
                  ["Decimals", "18"],
                  ["Mint rate", "1 ETH → 1,000 MELO"],
                  ["Networks", "Sepolia, Ethereum, local"],
                  ["Redeem", "None in v0"],
                ].map(([k, v], i) => (
                  <tr
                    key={k}
                    className="border-b border-white/10 last:border-b-0"
                    style={{
                      background:
                        i % 2 === 0 ? "transparent" : "rgba(167,139,250,0.04)",
                    }}
                  >
                    <th className="px-5 py-3.5 font-mono text-[0.7rem] font-normal tracking-[0.16em] text-violet-hot/70">
                      {k}
                    </th>
                    <td className="px-5 py-3.5 font-mono tabular-nums text-white">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="limits" className="scroll-mt-28">
          <h2 className="mt-16 text-2xl font-medium tracking-[-0.03em] text-white md:text-3xl">
            What this is not
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-violet-hot/80">
            Melo v0 is not a broker-dealer, not a listed-stock purchase, not
            DTCC settlement, and not a registered securities offering. Deposited
            ETH is held by the vault contract. Merchant rows on the marketing
            ledger are illustrative. This paper is not legal advice.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-violet-hot/80">
            The spend-to-own map (receipt → ticker → listed share) is the
            protocol’s aim. The wallet mint is the instrument that exists today:
            connect, deposit, hold MELO.
          </p>
          <p className="mt-10">
            <a
              href="/#vault"
              className="inline-flex rounded-full bg-violet-hot px-6 py-3 text-sm font-medium text-void transition hover:bg-white"
            >
              Open the vault
            </a>
          </p>
        </section>
      </article>
      <SiteFooter />
    </div>
  );
}
