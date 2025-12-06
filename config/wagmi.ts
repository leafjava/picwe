import { http, createConfig } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect 项目 ID
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'bcf0a04ae46d867e40bbca30439e6cc3';

// connectors 构建函数
const getConnectors = () => {
  const connectors = [
    injected({
      shimDisconnect: true,
    }),
  ];

  if (walletConnectProjectId) {
    connectors.push(
      walletConnect({
        projectId: walletConnectProjectId,
        showQrModal: true,
      })
    );
  }

  return connectors;
};

// ⭐ 这里是关键：链 + RPC 配置
export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  connectors: getConnectors(),
  transports: {
    [bscTestnet.id]: http('https://data-seed-prebsc-2-s1.binance.org:8545'),
  },
  ssr: true,
});
