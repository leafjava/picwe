'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Progress } from '@heroui/progress';

/**
 * 融资池数据接口
 */
interface Pool {
  id: string;           // 融资池ID
  name: string;         // 融资池名称
  apy: string;          // 年化收益率
  totalValue: number;   // 总池资金
  available: number;    // 可用资金
  myInvestment: number; // 我的投资金额
  icon: string;         // 图标
  color: string;        // 主题颜色
}

/**
 * 融资池参与页面
 * 功能：查看融资池信息，LP存入USDT参与融资
 */
export default function PoolsPage() {
  // 融资池列表数据
  const [pools] = useState<Pool[]>([
    {
      id: 'POOL001',
      name: 'Receivables Financing Pool',
      apy: '8.5%',
      totalValue: 10000000,
      available: 5000000,
      myInvestment: 50000,
      icon: '💎',
      color: 'green',
    },
    {
      id: 'POOL002',
      name: 'Warehouse Receipt Pool',
      apy: '6.2%',
      totalValue: 8000000,
      available: 3000000,
      myInvestment: 30000,
      icon: '📦',
      color: 'blue',
    },
    {
      id: 'POOL003',
      name: 'Prepayment Financing Pool',
      apy: '7.8%',
      totalValue: 5000000,
      available: 2000000,
      myInvestment: 0,
      icon: '🏦',
      color: 'purple',
    },
  ]);

  const [depositAmount, setDepositAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('');

  /**
   * 处理存入资金操作
   */
  const handleDeposit = (poolId: string) => {
    setSelectedPool(poolId);
    alert(`Deposit ${depositAmount} USDT to pool ${poolId}`);
    setDepositAmount('');
  };

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'from-green-50 to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-600',
        iconBg: 'bg-green-100',
        progress: 'success' as const,
      },
      blue: {
        bg: 'from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        iconBg: 'bg-blue-100',
        progress: 'primary' as const,
      },
      purple: {
        bg: 'from-purple-50 to-pink-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        iconBg: 'bg-purple-100',
        progress: 'secondary' as const,
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#FFA500]">
          Financing Pools
        </h1>
        <p className="text-gray-500 mt-2">Participate in financing pools and earn stable returns</p>
      </div>

      {/* 融资池卡片网格 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pools.map((pool) => {
          const colors = getColorClasses(pool.color);
          const utilizationRate = ((pool.totalValue - pool.available) / pool.totalValue) * 100;
          const isHighlighted = pool.id === 'POOL001';
          
          return (
            <Card 
              key={pool.id}
              className={`bg-[#141414] hover:border-zinc-700 transition-all ${isHighlighted ? 'border-2 border-[#FFA500]' : 'border border-zinc-800'}`}
            >
              <CardHeader className="border-b border-zinc-800">
                <div className="text-center w-full py-4">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-3xl opacity-60">{pool.icon}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-300">{pool.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">Register and manage your commodity</p>
                </div>
              </CardHeader>
              <CardBody className="p-6 space-y-5">
                {/* 存入按钮 */}
                <Button
                  size="lg"
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-gray-300 border border-zinc-700"
                  onPress={() => handleDeposit(pool.id)}
                >
                  Get Started
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
