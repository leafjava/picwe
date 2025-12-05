'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Progress } from '@heroui/progress';

interface Pool {
  id: string;
  name: string;
  apy: string;
  totalValue: number;
  available: number;
  myInvestment: number;
}

export default function PoolsPage() {
  const [pools] = useState<Pool[]>([
    {
      id: 'POOL001',
      name: '应收账款融资池',
      apy: '8.5%',
      totalValue: 10000000,
      available: 5000000,
      myInvestment: 50000,
    },
    {
      id: 'POOL002',
      name: '仓单融资池',
      apy: '6.2%',
      totalValue: 8000000,
      available: 3000000,
      myInvestment: 30000,
    },
    {
      id: 'POOL003',
      name: '预付款融资池',
      apy: '7.8%',
      totalValue: 5000000,
      available: 2000000,
      myInvestment: 0,
    },
  ]);

  const [depositAmount, setDepositAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('');

  const handleDeposit = (poolId: string) => {
    setSelectedPool(poolId);
    alert(`存入 ${depositAmount} USDT 到融资池 ${poolId}`);
    setDepositAmount('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">融资池参与</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pools.map((pool) => (
          <Card key={pool.id}>
            <CardHeader>
              <h2 className="text-xl font-semibold">{pool.name}</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">年化收益率 (APY)</p>
                <p className="text-2xl font-bold text-green-600">{pool.apy}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">总池资金</p>
                <p className="text-lg font-semibold">${pool.totalValue.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">资金使用率</p>
                <Progress
                  value={((pool.totalValue - pool.available) / pool.totalValue) * 100}
                  color="primary"
                  className="mb-1"
                />
                <p className="text-xs text-gray-500">
                  可用: ${pool.available.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">我的投资</p>
                <p className="text-lg font-semibold">${pool.myInvestment.toLocaleString()}</p>
              </div>

              <Input
                label="存入金额 (USDT)"
                type="number"
                placeholder="输入金额"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />

              <Button
                color="primary"
                className="w-full"
                onPress={() => handleDeposit(pool.id)}
              >
                存入资金
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
