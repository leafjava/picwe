'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Chip } from '@heroui/chip';

interface Payment {
  id: string;
  productName: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed';
  buyer: string;
  date: string;
}

export default function SettlementPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 'PAY001',
      productName: '铜矿石',
      amount: 500000,
      status: 'pending',
      buyer: '0x1234...5678',
      date: '2025-12-05',
    },
    {
      id: 'PAY002',
      productName: '原油',
      amount: 2000000,
      status: 'processing',
      buyer: '0xabcd...efgh',
      date: '2025-12-04',
    },
    {
      id: 'PAY003',
      productName: '铁矿石',
      amount: 800000,
      status: 'completed',
      buyer: '0x9876...5432',
      date: '2025-12-03',
    },
  ]);

  const handleSettle = (paymentId: string) => {
    setPayments(
      payments.map((p) =>
        p.id === paymentId ? { ...p, status: 'completed' as const } : p
      )
    );
    alert(`支付 ${paymentId} 已完成清算`);
  };

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待支付';
      case 'processing':
        return '处理中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">支付清算与结算</h1>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">支付记录</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="支付清算列表">
            <TableHeader>
              <TableColumn>支付ID</TableColumn>
              <TableColumn>商品名称</TableColumn>
              <TableColumn>金额 (USDT)</TableColumn>
              <TableColumn>买家地址</TableColumn>
              <TableColumn>状态</TableColumn>
              <TableColumn>日期</TableColumn>
              <TableColumn>操作</TableColumn>
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
                    {payment.status === 'pending' && (
                      <Button
                        size="sm"
                        color="primary"
                        onPress={() => handleSettle(payment.id)}
                      >
                        触发清算
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
