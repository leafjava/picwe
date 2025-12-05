'use client';
import { http, createConfig } from 'wagmi';
import { sepolia, mainnet } from 'viem/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect项目ID
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  console.warn('⚠️ NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID 未设置，WalletConnect功能可能无法正常工作');
}

// 构建连接器
const getConnectors = () => {
  const baseConnectors = [
    injected({ 
      shimDisconnect: true,
      target: 'metaMask'
    }),
  ];
  
  if (typeof window !== 'undefined' && walletConnectProjectId) {
    try {
      baseConnectors.push(
        walletConnect({
          projectId: walletConnectProjectId,
          showQrModal: true,
        })
      );
    } catch (error) {
      console.warn('⚠️ WalletConnect 连接器初始化失败:', error);
    }
  }
  
  return baseConnectors;
};

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet],
  connectors: getConnectors(),
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/62c0ac4c3b2e4a809869158eeec667e8'),
    [mainnet.id]: http(),
  },
  ssr: true,
});
