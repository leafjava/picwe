'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';

export default function AnalyticsPage() {
  const revenueData = [
    { date: '2025-12-01', revenue: 5000, commission: 250 },
    { date: '2025-12-02', revenue: 8000, commission: 400 },
    { date: '2025-12-03', revenue: 12000, commission: 600 },
    { date: '2025-12-04', revenue: 15000, commission: 750 },
    { date: '2025-12-05', revenue: 20000, commission: 1000 },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCommission = revenueData.reduce((sum, item) => sum + item.commission, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">数据分析与分润管理</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600">总收入</p>
            <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-600">总分润</p>
            <p className="text-3xl font-bold text-blue-600">${totalCommission.toLocaleString()}</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-600">分润比例</p>
            <p className="text-3xl font-bold text-purple-600">5%</p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">收入与分润记录</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="收入分润表">
            <TableHeader>
              <TableColumn>日期</TableColumn>
              <TableColumn>收入 (USDT)</TableColumn>
              <TableColumn>分润 (USDT)</TableColumn>
              <TableColumn>分润比例</TableColumn>
            </TableHeader>
            <TableBody>
              {revenueData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>${item.revenue.toLocaleString()}</TableCell>
                  <TableCell>${item.commission.toLocaleString()}</TableCell>
                  <TableCell>5%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
