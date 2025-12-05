'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';

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
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Financing Application
        </h1>
        <p className="text-gray-600 mt-2">Quick financing based on commodity assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：融资申请表单 */}
        <Card className="backdrop-blur-md bg-white/80 shadow-xl">
          <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Apply for Financing</h2>
                <p className="text-sm text-gray-600">Fill in the details below</p>
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
                  trigger: "bg-white",
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
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">✅</span>
                  <p className="text-sm font-semibold text-gray-700">Selected Product</p>
                </div>
                <p className="font-bold text-lg text-blue-600">{selectedProductData.name}</p>
                <p className="text-sm text-gray-600">Value: ${selectedProductData.value.toLocaleString()}</p>
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
                  trigger: "bg-white",
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
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">✅</span>
                  <p className="text-sm font-semibold text-gray-700">Selected Pool</p>
                </div>
                <p className="font-bold text-lg text-green-600">{selectedPoolData.name}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="text-gray-600">Annual Rate: <strong className="text-green-600">{selectedPoolData.rate}</strong></span>
                  <span className="text-gray-600">Available: <strong className="text-green-600">${selectedPoolData.available.toLocaleString()}</strong></span>
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
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />

            {/* 提交按钮 */}
            <Button 
              color="primary" 
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
              onPress={handleSubmit}
            >
              <span className="text-xl mr-2">🚀</span>
              Submit Application
            </Button>
          </CardBody>
        </Card>

        {/* 右侧：融资池信息展示 */}
        <div className="space-y-6">
          <Card className="backdrop-blur-md bg-white/80 shadow-xl">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🏊</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Pool Information</h2>
                  <p className="text-sm text-gray-600">Available financing pools</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                {pools.map((pool) => (
                  <div 
                    key={pool.id} 
                    className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{pool.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{pool.name}</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Annual Rate</p>
                        <p className="text-xl font-bold text-green-600">{pool.rate}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Available</p>
                        <p className="text-lg font-bold text-blue-600">${(pool.available / 1000000).toFixed(1)}M</p>
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
