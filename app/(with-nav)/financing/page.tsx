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
    { id: 'POOL001', name: 'Receivables Financing Pool', rate: '8%', available: 5000000 },
    { id: 'POOL002', name: 'Warehouse Receipt Pool', rate: '6%', available: 3000000 },
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
      <h1 className="text-3xl font-bold mb-6">Financing Application</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：融资申请表单 */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Apply for Financing</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {/* 选择商品下拉框 */}
            <Select
              label="Select Product"
              placeholder="Choose product to finance"
              selectedKeys={selectedProduct}
              onSelectionChange={(keys) => setSelectedProduct(keys as Set<string>)}
            >
              {products.map((product) => (
                <SelectItem key={product.id}>
                  {product.name} - ${product.value.toLocaleString()}
                </SelectItem>
              ))}
            </Select>

            {/* 显示已选商品信息 */}
            {selectedProductData && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold">Selected Product: {selectedProductData.name}</p>
                <p className="text-sm text-gray-600">Value: ${selectedProductData.value.toLocaleString()}</p>
              </div>
            )}

            {/* 选择融资池下拉框 */}
            <Select
              label="Select Pool"
              placeholder="Choose financing pool type"
              selectedKeys={selectedPool}
              onSelectionChange={(keys) => setSelectedPool(keys as Set<string>)}
            >
              {pools.map((pool) => (
                <SelectItem key={pool.id}>
                  {pool.name} - Rate: {pool.rate}
                </SelectItem>
              ))}
            </Select>

            {/* 显示已选融资池信息 */}
            {selectedPoolData && (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-semibold">Selected Pool: {selectedPoolData.name}</p>
                <p className="text-sm text-gray-600">Annual Rate: {selectedPoolData.rate}</p>
                <p className="text-sm text-gray-600">Available: ${selectedPoolData.available.toLocaleString()}</p>
              </div>
            )}

            {/* 融资金额输入框 */}
            <Input
              label="Financing Amount (USDT)"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* 提交按钮 */}
            <Button color="primary" className="w-full" onPress={handleSubmit}>
              Submit Application
            </Button>
          </CardBody>
        </Card>

        {/* 右侧：融资池信息展示 */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Pool Information</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {pools.map((pool) => (
                <div key={pool.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">{pool.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">Annual Rate: {pool.rate}</p>
                  <p className="text-sm text-gray-600">Available: ${pool.available.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
