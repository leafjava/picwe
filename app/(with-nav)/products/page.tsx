'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/modal';
import { Chip } from '@heroui/chip';

/**
 * 商品数据接口
 */
interface Product {
  id: string;          // 商品ID
  name: string;        // 商品名称
  quantity: number;    // 数量
  value: number;       // 价值（USDT）
  status: string;      // 状态
  createdAt: string;   // 创建时间
}

/**
 * 商品管理页面
 * 功能：商品注册、展示和管理
 */
export default function ProductsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // 商品列表状态
  const [products, setProducts] = useState<Product[]>([
    { id: 'PROD001', name: 'Copper Ore', quantity: 1000, value: 500000, status: 'Registered', createdAt: '2025-12-01' },
    { id: 'PROD002', name: 'Crude Oil', quantity: 5000, value: 2000000, status: 'Registered', createdAt: '2025-12-02' },
  ]);

  // 表单数据状态
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    value: '',
  });

  /**
   * 提交新商品注册
   */
  const handleSubmit = () => {
    const newProduct: Product = {
      id: `PROD${String(products.length + 1).padStart(3, '0')}`,
      name: formData.name,
      quantity: Number(formData.quantity),
      value: Number(formData.value),
      status: 'Registered',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, newProduct]);
    setFormData({ name: '', quantity: '', value: '' });
    onClose();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题和操作按钮 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">Register and manage your commodity assets</p>
        </div>
        <Button 
          color="primary" 
          size="lg"
          onPress={onOpen}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <span className="text-xl mr-2">+</span>
          Register New Product
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-blue-600">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-green-600">
                  ${products.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Quantity</p>
                <p className="text-3xl font-bold text-purple-600">
                  {products.reduce((sum, p) => sum + p.quantity, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 商品列表卡片 */}
      <Card className="backdrop-blur-md bg-white/80 shadow-xl">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📋</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Registered Products</h2>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <Table 
            aria-label="Product list"
            classNames={{
              wrapper: "shadow-none",
              th: "bg-gray-100 text-gray-700 font-semibold",
              td: "text-gray-700",
            }}
          >
            <TableHeader>
              <TableColumn>PRODUCT ID</TableColumn>
              <TableColumn>PRODUCT NAME</TableColumn>
              <TableColumn>QUANTITY</TableColumn>
              <TableColumn>VALUE (USDT)</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>CREATED AT</TableColumn>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <span className="font-mono font-semibold text-blue-600">{product.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{product.quantity.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-semibold">
                      ${product.value.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip color="success" variant="flat" size="sm">
                      {product.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{product.createdAt}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* 注册新商品模态框 */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex gap-3 items-center border-b">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📦</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Register New Product</h3>
              <p className="text-sm text-gray-500 font-normal">Add a new commodity asset to the platform</p>
            </div>
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-4">
              <Input
                label="Product Name"
                placeholder="Enter product name (e.g., Copper Ore)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                variant="bordered"
                size="lg"
              />
              <Input
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                variant="bordered"
                size="lg"
              />
              <Input
                label="Value (USDT)"
                type="number"
                placeholder="Enter value in USDT"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                variant="bordered"
                size="lg"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
            </div>
          </ModalBody>
          <ModalFooter className="border-t">
            <Button color="danger" variant="light" onPress={onClose} size="lg">
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleSubmit}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold"
            >
              Submit Registration
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
