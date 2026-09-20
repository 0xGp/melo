import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { hardhat, mainnet, sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet, hardhat],
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [hardhat.id]: http(),
  },
  ssr: true,
});
