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
    },
    {
      id: 'POOL002',
      name: 'Warehouse Receipt Pool',
      apy: '6.2%',
      totalValue: 8000000,
      available: 3000000,
      myInvestment: 30000,
    },
    {
      id: 'POOL003',
      name: 'Prepayment Financing Pool',
      apy: '7.8%',
      totalValue: 5000000,
      available: 2000000,
      myInvestment: 0,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financing Pools</h1>

      {/* 融资池卡片网格 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pools.map((pool) => (
          <Card key={pool.id}>
            <CardHeader>
              <h2 className="text-xl font-semibold">{pool.name}</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* 年化收益率 */}
              <div>
                <p className="text-sm text-gray-600">Annual Percentage Yield (APY)</p>
                <p className="text-2xl font-bold text-green-600">{pool.apy}</p>
              </div>

              {/* 总池资金 */}
              <div>
                <p className="text-sm text-gray-600">Total Pool Value</p>
                <p className="text-lg font-semibold">${pool.totalValue.toLocaleString()}</p>
              </div>

              {/* 资金使用率进度条 */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Utilization Rate</p>
                <Progress
                  value={((pool.totalValue - pool.available) / pool.totalValue) * 100}
                  color="primary"
                  className="mb-1"
                />
                <p className="text-xs text-gray-500">
                  Available: ${pool.available.toLocaleString()}
                </p>
              </div>

              {/* 我的投资金额 */}
              <div>
                <p className="text-sm text-gray-600">My Investment</p>
                <p className="text-lg font-semibold">${pool.myInvestment.toLocaleString()}</p>
              </div>

              {/* 存入金额输入框 */}
              <Input
                label="Deposit Amount (USDT)"
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />

              {/* 存入按钮 */}
              <Button
                color="primary"
                className="w-full"
                onPress={() => handleDeposit(pool.id)}
              >
                Deposit Funds
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
