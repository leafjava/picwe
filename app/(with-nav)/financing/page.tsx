'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';

export default function FinancingPage() {
  const [selectedProduct, setSelectedProduct] = useState<Set<string>>(new Set([]));
  const [selectedPool, setSelectedPool] = useState<Set<string>>(new Set([]));
  const [amount, setAmount] = useState('');

  const products = [
    { id: 'PROD001', name: '铜矿石', value: 500000 },
    { id: 'PROD002', name: '原油', value: 2000000 },
  ];

  const pools = [
    { id: 'POOL001', name: '应收账款融资池', rate: '8%', available: 5000000 },
    { id: 'POOL002', name: '仓单融资池', rate: '6%', available: 3000000 },
  ];

  const selectedProductId = Array.from(selectedProduct)[0];
  const selectedPoolId = Array.from(selectedPool)[0];
  const selectedProductData = products.find((p) => p.id === selectedProductId);
  const selectedPoolData = pools.find((p) => p.id === selectedPoolId);

  const handleSubmit = () => {
    if (!selectedProductId || !selectedPoolId || !amount) {
      alert('请填写完整信息！');
      return;
    }
    alert(`融资申请已提交！\n商品: ${selectedProductData?.name}\n融资池: ${selectedPoolData?.name}\n金额: ${amount} USDT`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">融资申请</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">申请融资</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Select
              label="选择商品"
              placeholder="选择要融资的商品"
              selectedKeys={selectedProduct}
              onSelectionChange={(keys) => setSelectedProduct(keys as Set<string>)}
            >
              {products.map((product) => (
                <SelectItem key={product.id}>
                  {product.name} - ${product.value.toLocaleString()}
                </SelectItem>
              ))}
            </Select>

            {selectedProductData && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold">已选商品: {selectedProductData.name}</p>
                <p className="text-sm text-gray-600">价值: ${selectedProductData.value.toLocaleString()}</p>
              </div>
            )}

            <Select
              label="选择融资池"
              placeholder="选择融资池类型"
              selectedKeys={selectedPool}
              onSelectionChange={(keys) => setSelectedPool(keys as Set<string>)}
            >
              {pools.map((pool) => (
                <SelectItem key={pool.id}>
                  {pool.name} - 利率: {pool.rate}
                </SelectItem>
              ))}
            </Select>

            {selectedPoolData && (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-semibold">已选融资池: {selectedPoolData.name}</p>
                <p className="text-sm text-gray-600">年化利率: {selectedPoolData.rate}</p>
                <p className="text-sm text-gray-600">可用额度: ${selectedPoolData.available.toLocaleString()}</p>
              </div>
            )}

            <Input
              label="融资金额 (USDT)"
              type="number"
              placeholder="输入融资金额"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button color="primary" className="w-full" onPress={handleSubmit}>
              提交融资申请
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">融资池信息</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {pools.map((pool) => (
                <div key={pool.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">{pool.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">年化利率: {pool.rate}</p>
                  <p className="text-sm text-gray-600">可用额度: ${pool.available.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
