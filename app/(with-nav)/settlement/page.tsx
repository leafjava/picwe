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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment Settlement</h1>

      {/* 支付记录表格卡片 */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Payment Records</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Payment settlement list">
            <TableHeader>
              <TableColumn>Payment ID</TableColumn>
              <TableColumn>Product Name</TableColumn>
              <TableColumn>Amount (USDT)</TableColumn>
              <TableColumn>Buyer Address</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.productName}</TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.buyer}</TableCell>
                  <TableCell>
                    <Chip color={getStatusColor(payment.status)} variant="flat">
                      {getStatusText(payment.status)}
                    </Chip>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    {/* 只有待支付状态才显示清算按钮 */}
                    {payment.status === 'pending' && (
                      <Button
                        size="sm"
                        color="primary"
                        onPress={() => handleSettle(payment.id)}
                      >
                        Settle
                      </Button>
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
