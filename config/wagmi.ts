'use client';

import { http, createConfig } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect 项目 ID
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  console.warn('⚠️ NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID 未设置，将无法使用 WalletConnect');
}

// connectors 构建函数
const getConnectors = () => {
  const base = [
    injected({
      shimDisconnect: true,
      target: 'metaMask',
    }),
  ];

  if (typeof window !== 'undefined' && walletConnectProjectId) {
    try {
      base.push(
          walletConnect({
            projectId: walletConnectProjectId,
            showQrModal: true,
          })
      );
    } catch (e) {
      console.warn('⚠️ WalletConnect 初始化失败:', e);
    }
  }

  return base;
};

// ⭐ 这里是关键：链 + RPC 配置
export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  connectors: getConnectors(),
  transports: {
    [bscTestnet.id]: http(
        process.env.NEXT_PUBLIC_RPC_URL ||
        'https://data-seed-prebsc-2-s1.binance.org:8545'
    ),
  },
  ssr: true,
});
