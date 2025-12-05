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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Financing Pools
        </h1>
        <p className="text-gray-600 mt-2">Participate in financing pools and earn stable returns</p>
      </div>

      {/* 融资池卡片网格 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pools.map((pool) => {
          const colors = getColorClasses(pool.color);
          const utilizationRate = ((pool.totalValue - pool.available) / pool.totalValue) * 100;
          
          return (
            <Card 
              key={pool.id}
              className={`backdrop-blur-md bg-white/80 shadow-xl hover:shadow-2xl transition-all border-2 ${colors.border}`}
            >
              <CardHeader className={`border-b border-gray-200 bg-gradient-to-r ${colors.bg}`}>
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                    <span className="text-3xl">{pool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800">{pool.name}</h2>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-6 space-y-5">
                {/* 年化收益率 */}
                <div className={`p-4 rounded-xl bg-gradient-to-br ${colors.bg}`}>
                  <p className="text-sm font-medium text-gray-600 mb-1">Annual Percentage Yield (APY)</p>
                  <p className={`text-4xl font-bold ${colors.text}`}>{pool.apy}</p>
                  <p className="text-xs text-gray-500 mt-1">Stable returns guaranteed</p>
                </div>

                {/* 总池资金 */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Pool Value</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${pool.totalValue.toLocaleString()}
                  </p>
                </div>

                {/* 资金使用率进度条 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
                    <p className={`text-sm font-bold ${colors.text}`}>{utilizationRate.toFixed(1)}%</p>
                  </div>
                  <Progress
                    value={utilizationRate}
                    color={colors.progress}
                    className="mb-2"
                    size="md"
                  />
                  <p className="text-xs text-gray-500">
                    Available: <span className="font-semibold">${pool.available.toLocaleString()}</span>
                  </p>
                </div>

                {/* 我的投资金额 */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-1">My Investment</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${pool.myInvestment.toLocaleString()}
                  </p>
                  {pool.myInvestment > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      Earning ~${((pool.myInvestment * parseFloat(pool.apy)) / 100).toFixed(2)}/year
                    </p>
                  )}
                </div>

                {/* 存入金额输入框 */}
                <Input
                  label="Deposit Amount (USDT)"
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  variant="bordered"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />

                {/* 存入按钮 */}
                <Button
                  color="primary"
                  size="lg"
                  className={`w-full bg-gradient-to-r ${
                    pool.color === 'green' ? 'from-green-500 to-emerald-500' :
                    pool.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                    'from-purple-500 to-pink-500'
                  } text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
                  onPress={() => handleDeposit(pool.id)}
                >
                  <span className="text-xl mr-2">💰</span>
                  Deposit Funds
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
