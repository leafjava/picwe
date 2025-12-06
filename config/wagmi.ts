import { http, createConfig } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// 临时简化，只保留 injected 以绕过 WalletConnect 类型冲突，先让构建通过
const connectors = [
  injected({
    shimDisconnect: true,
  }),
];

export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  connectors,
  transports: {
    [bscTestnet.id]: http('https://data-seed-prebsc-2-s1.binance.org:8545'),
  },
  ssr: true,
});
