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
  id: string;
  name: string;
  quantity: number;
  value: number;
  status: string;
  createdAt: string;
}

/**
 * 商品管理页面 - 深色极客风格
 */
export default function ProductsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [products, setProducts] = useState<Product[]>([
    { id: 'PROD001', name: 'Copper Ore', quantity: 1000, value: 500000, status: 'Registered', createdAt: '2025-12-01' },
    { id: 'PROD002', name: 'Crude Oil', quantity: 5000, value: 2000000, status: 'Registered', createdAt: '2025-12-02' },
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
      status: 'Registered',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, newProduct]);
    setFormData({ name: '', quantity: '', value: '' });
    onClose();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-[#FFA500] mb-2">
            Product Management
          </h1>
          <p className="text-gray-500">Register and manage your commodity assets with unique on-chain asset IDs</p>
        </div>
        <Button 
          onPress={onOpen}
          className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-medium border border-zinc-700"
          size="lg"
        >
          Get Started
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#141414] border border-zinc-800 hover:border-[#FFA500] transition-colors">
          <CardBody className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl opacity-60">🔒</span>
              </div>
              <p className="text-lg font-semibold text-gray-300 mb-2">Product Management</p>
              <p className="text-sm text-gray-500">Register and manage your commodity</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-[#141414] border-2 border-[#FFA500] hover:border-[#FFB800] transition-colors">
          <CardBody className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl opacity-80">🔒</span>
              </div>
              <p className="text-lg font-semibold text-gray-300 mb-2">Product Management</p>
              <p className="text-sm text-gray-500">Register and manage your commodity</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-[#141414] border border-zinc-800 hover:border-[#FFA500] transition-colors">
          <CardBody className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl opacity-60">🔒</span>
              </div>
              <p className="text-lg font-semibold text-gray-300 mb-2">Product Management</p>
              <p className="text-sm text-gray-500">Register and manage your commodity</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 商品列表 */}
      <Card className="bg-[#141414] border border-zinc-800">
        <CardHeader className="border-b border-zinc-800 p-6">
          <h2 className="text-xl font-semibold text-gray-300">Registered Products</h2>
        </CardHeader>
        <CardBody className="p-6">
          <Table 
            aria-label="Product list"
            classNames={{
              wrapper: "bg-transparent shadow-none",
              th: "bg-transparent text-gray-500 font-medium text-xs uppercase",
              td: "text-gray-400 border-b border-zinc-800/50",
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
                <TableRow key={product.id} className="hover:bg-zinc-900/30 transition-colors">
                  <TableCell>
                    <span className="font-mono text-gray-400">{product.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-300">{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">{product.quantity.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">
                      ${product.value.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip className="bg-transparent text-gray-500 border border-zinc-700" size="sm" variant="bordered">
                      {product.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-500">{product.createdAt}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* 注册模态框 */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" className="bg-[#141414] border border-zinc-800">
        <ModalContent>
          <ModalHeader className="border-b border-zinc-800 text-gray-300">
            Register New Product
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-4">
              <Input
                label="Product Name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                classNames={{
                  input: "bg-zinc-900 text-gray-300",
                  inputWrapper: "bg-zinc-900 border-zinc-700",
                  label: "text-gray-500",
                }}
                variant="bordered"
              />
              <Input
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                classNames={{
                  input: "bg-zinc-900 text-gray-300",
                  inputWrapper: "bg-zinc-900 border-zinc-700",
                  label: "text-gray-500",
                }}
                variant="bordered"
              />
              <Input
                label="Value (USDT)"
                type="number"
                placeholder="Enter value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                classNames={{
                  input: "bg-zinc-900 text-gray-300",
                  inputWrapper: "bg-zinc-900 border-zinc-700",
                  label: "text-gray-500",
                }}
                variant="bordered"
                startContent={<span className="text-gray-500">$</span>}
              />
            </div>
          </ModalBody>
          <ModalFooter className="border-t border-zinc-800">
            <Button 
              variant="light" 
              onPress={onClose}
              className="text-gray-500"
            >
              Cancel
            </Button>
            <Button 
              onPress={handleSubmit}
              className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 border border-zinc-700"
            >
              Get Started
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
