'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/modal';

interface Product {
  id: string;
  name: string;
  quantity: number;
  value: number;
  status: string;
  createdAt: string;
}

export default function ProductsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<Product[]>([
    { id: 'PROD001', name: '铜矿石', quantity: 1000, value: 500000, status: '已注册', createdAt: '2025-12-01' },
    { id: 'PROD002', name: '原油', quantity: 5000, value: 2000000, status: '已注册', createdAt: '2025-12-02' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    value: '',
  });

  const handleSubmit = () => {
    const newProduct: Product = {
      id: `PROD${String(products.length + 1).padStart(3, '0')}`,
      name: formData.name,
      quantity: Number(formData.quantity),
      value: Number(formData.value),
      status: '已注册',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, newProduct]);
    setFormData({ name: '', quantity: '', value: '' });
    onClose();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">商品管理</h1>
        <Button color="primary" onPress={onOpen}>
          注册新商品
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">已注册商品列表</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="商品列表">
            <TableHeader>
              <TableColumn>商品ID</TableColumn>
              <TableColumn>商品名称</TableColumn>
              <TableColumn>数量</TableColumn>
              <TableColumn>价值 (USDT)</TableColumn>
              <TableColumn>状态</TableColumn>
              <TableColumn>注册时间</TableColumn>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>注册新商品</ModalHeader>
          <ModalBody>
            <Input
              label="商品名称"
              placeholder="输入商品名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="数量"
              type="number"
              placeholder="输入数量"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            <Input
              label="价值 (USDT)"
              type="number"
              placeholder="输入价值"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              取消
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              提交注册
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
