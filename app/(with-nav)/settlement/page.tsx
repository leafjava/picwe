'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Chip } from '@heroui/chip';

/**
 * 支付记录数据接口
 */
interface Payment {
  id: string;                                    // 支付ID
  productName: string;                           // 商品名称
  amount: number;                                // 金额
  status: 'pending' | 'processing' | 'completed'; // 状态
  buyer: string;                                 // 买家地址
  date: string;                                  // 日期
}

/**
 * 支付清算与结算页面
 * 功能：查看支付状态，触发清算操作
 */
export default function SettlementPage() {
  // 支付记录列表状态
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 'PAY001',
      productName: 'Copper Ore',
      amount: 500000,
      status: 'pending',
      buyer: '0x1234...5678',
      date: '2025-12-05',
    },
    {
      id: 'PAY002',
      productName: 'Crude Oil',
      amount: 2000000,
      status: 'processing',
      buyer: '0xabcd...efgh',
      date: '2025-12-04',
    },
    {
      id: 'PAY003',
      productName: 'Iron Ore',
      amount: 800000,
      status: 'completed',
      buyer: '0x9876...5432',
      date: '2025-12-03',
    },
  ]);

  /**
   * 触发清算操作
   */
  const handleSettle = (paymentId: string) => {
    setPayments(
      payments.map((p) =>
        p.id === paymentId ? { ...p, status: 'completed' as const } : p
      )
    );
    alert(`Payment ${paymentId} settlement completed`);
  };

  /**
   * 根据状态返回对应的颜色
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  /**
   * 根据状态返回对应的文本
   */
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  /**
   * 根据状态返回对应的图标
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '⚡';
      case 'completed':
        return '✅';
      default:
        return '📄';
    }
  };

  // 计算统计数据
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const completedCount = payments.filter(p => p.status === 'completed').length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Payment Settlement
        </h1>
        <p className="text-gray-600 mt-2">Real-time payment status and settlement operations</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Payments</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 支付记录表格卡片 */}
      <Card className="backdrop-blur-md bg-white/80 shadow-xl">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">💳</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Payment Records</h2>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <Table 
            aria-label="Payment settlement list"
            classNames={{
              wrapper: "shadow-none",
              th: "bg-gray-100 text-gray-700 font-semibold",
              td: "text-gray-700",
            }}
          >
            <TableHeader>
              <TableColumn>PAYMENT ID</TableColumn>
              <TableColumn>PRODUCT NAME</TableColumn>
              <TableColumn>AMOUNT (USDT)</TableColumn>
              <TableColumn>BUYER ADDRESS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <span className="font-mono font-semibold text-blue-600">{payment.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{payment.productName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-bold text-lg">
                      ${payment.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {payment.buyer}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(payment.status)} 
                      variant="flat" 
                      size="md"
                      startContent={<span className="text-lg">{getStatusIcon(payment.status)}</span>}
                    >
                      {getStatusText(payment.status)}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{payment.date}</span>
                  </TableCell>
                  <TableCell>
                    {/* 只有待支付状态才显示清算按钮 */}
                    {payment.status === 'pending' && (
                      <Button
                        size="sm"
                        color="primary"
                        onPress={() => handleSettle(payment.id)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold"
                      >
                        <span className="mr-1">⚡</span>
                        Settle
                      </Button>
                    )}
                    {payment.status === 'processing' && (
                      <span className="text-sm text-gray-500 italic">Processing...</span>
                    )}
                    {payment.status === 'completed' && (
                      <span className="text-sm text-green-600 font-semibold">✓ Done</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
