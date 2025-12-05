'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/modal';

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button color="primary" onPress={onOpen}>
          Register New Product
        </Button>
      </div>

      {/* 商品列表卡片 */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Registered Products</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Product list">
            <TableHeader>
              <TableColumn>Product ID</TableColumn>
              <TableColumn>Product Name</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Value (USDT)</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Created At</TableColumn>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.value.toLocaleString()}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* 注册新商品模态框 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Register New Product</ModalHeader>
          <ModalBody>
            <Input
              label="Product Name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Quantity"
              type="number"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            <Input
              label="Value (USDT)"
              type="number"
              placeholder="Enter value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
