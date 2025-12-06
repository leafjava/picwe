// lib/wagmi.ts
import { http, createConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";

// RPC
export const config = createConfig({
    chains: [bscTestnet],
    transports: {
        [bscTestnet.id]: http("https://data-seed-prebsc-2-s1.binance.org:8545"),
    },
});
