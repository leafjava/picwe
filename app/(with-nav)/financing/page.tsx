'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import Image from 'next/image';

/**
 * 融资申请页面
 * 功能：选择商品和融资池，提交融资申请
 */
export default function FinancingPage() {
  // 选中的商品和融资池状态
  const [selectedProduct, setSelectedProduct] = useState<Set<string>>(new Set([]));
  const [selectedPool, setSelectedPool] = useState<Set<string>>(new Set([]));
  const [amount, setAmount] = useState('');

  // 商品列表数据
  const products = [
    { id: 'PROD001', name: 'Copper Ore', value: 500000 },
    { id: 'PROD002', name: 'Crude Oil', value: 2000000 },
  ];

  // 融资池列表数据
  const pools = [
    { id: 'POOL001', name: 'Receivables Financing Pool', rate: '8%', available: 5000000, icon: '💎' },
    { id: 'POOL002', name: 'Warehouse Receipt Pool', rate: '6%', available: 3000000, icon: '📦' },
  ];

  // 获取选中的商品和融资池数据
  const selectedProductId = Array.from(selectedProduct)[0];
  const selectedPoolId = Array.from(selectedPool)[0];
  const selectedProductData = products.find((p) => p.id === selectedProductId);
  const selectedPoolData = pools.find((p) => p.id === selectedPoolId);

  /**
   * 提交融资申请
   */
  const handleSubmit = () => {
    if (!selectedProductId || !selectedPoolId || !amount) {
      alert('Please fill in all information!');
      return;
    }
    alert(`Financing application submitted!\nProduct: ${selectedProductData?.name}\nPool: ${selectedPoolData?.name}\nAmount: ${amount} USDT`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed inset-0 z-0">
        <Image
          src="/ship.png"
          alt="ship"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>


      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#FFA500]">
          Financing Application
        </h1>
        <p className="text-gray-500 mt-2">Quick financing based on commodity assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：融资申请表单 */}
        <Card className="bg-[#141414] border border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-2xl opacity-60">🔒</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-300">Apply for Financing</h2>
                <p className="text-sm text-gray-500">Fill in the details below</p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-6 space-y-6">
            {/* 选择商品下拉框 */}
            <div>
              <Select
                label="Select Product"
                placeholder="Choose product to finance"
                selectedKeys={selectedProduct}
                onSelectionChange={(keys) => setSelectedProduct(keys as Set<string>)}
                variant="bordered"
                size="lg"
                classNames={{
                  trigger: "bg-zinc-900 border-zinc-700",
                  label: "text-gray-500",
                  value: "text-gray-300",
                }}
              >
                {products.map((product) => (
                  <SelectItem key={product.id}>
                    {product.name} - ${product.value.toLocaleString()}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* 显示已选商品信息 */}
            {selectedProductData && (
              <div className="p-4 bg-zinc-900/50 border border-zinc-700 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Selected Product</p>
                <p className="font-semibold text-gray-300">{selectedProductData.name}</p>
                <p className="text-sm text-gray-500">Value: ${selectedProductData.value.toLocaleString()}</p>
              </div>
            )}

            {/* 选择融资池下拉框 */}
            <div>
              <Select
                label="Select Pool"
                placeholder="Choose financing pool type"
                selectedKeys={selectedPool}
                onSelectionChange={(keys) => setSelectedPool(keys as Set<string>)}
                variant="bordered"
                size="lg"
                classNames={{
                  trigger: "bg-zinc-900 border-zinc-700",
                  label: "text-gray-500",
                  value: "text-gray-300",
                }}
              >
                {pools.map((pool) => (
                  <SelectItem key={pool.id}>
                    {pool.name} - Rate: {pool.rate}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* 显示已选融资池信息 */}
            {selectedPoolData && (
              <div className="p-4 bg-zinc-900/50 border border-zinc-700 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Selected Pool</p>
                <p className="font-semibold text-gray-300">{selectedPoolData.name}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>Annual Rate: <strong className="text-gray-400">{selectedPoolData.rate}</strong></span>
                  <span>Available: <strong className="text-gray-400">${selectedPoolData.available.toLocaleString()}</strong></span>
                </div>
              </div>
            )}

            {/* 融资金额输入框 */}
            <Input
              label="Financing Amount (USDT)"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="bordered"
              size="lg"
              classNames={{
                input: "bg-zinc-900 text-gray-300",
                inputWrapper: "bg-zinc-900 border-zinc-700",
                label: "text-gray-500",
              }}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-gray-500 text-small">$</span>
                </div>
              }
            />

            {/* 提交按钮 */}
            <Button 
              size="lg"
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-gray-300 border border-zinc-700" 
              onPress={handleSubmit}
            >
              Get Started
            </Button>
          </CardBody>
        </Card>

        {/* 右侧：融资池信息展示 */}
        <div className="space-y-6">
          <Card className="bg-[#141414] border border-zinc-800">
            <CardHeader className="border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="text-2xl opacity-60">🔒</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-300">Pool Information</h2>
                  <p className="text-sm text-gray-500">Available financing pools</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                {pools.map((pool) => (
                  <div 
                    key={pool.id} 
                    className="p-5 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all bg-zinc-900/30"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl opacity-60">{pool.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-300">{pool.name}</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                        <p className="text-xs text-gray-500 mb-1">Annual Rate</p>
                        <p className="text-lg font-semibold text-gray-400">{pool.rate}</p>
                      </div>
                      <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                        <p className="text-xs text-gray-500 mb-1">Available</p>
                        <p className="text-lg font-semibold text-gray-400">${(pool.available / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
