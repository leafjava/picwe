'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';

/**
 * 数据分析与分润管理页面
 * 功能：展示收入、分润数据和历史记录
 */
export default function AnalyticsPage() {
  // 收入数据列表
  const revenueData = [
    { date: '2025-12-01', revenue: 5000, commission: 250 },
    { date: '2025-12-02', revenue: 8000, commission: 400 },
    { date: '2025-12-03', revenue: 12000, commission: 600 },
    { date: '2025-12-04', revenue: 15000, commission: 750 },
    { date: '2025-12-05', revenue: 20000, commission: 1000 },
  ];

  // 计算总收入和总分润
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCommission = revenueData.reduce((sum, item) => sum + item.commission, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Analytics & Commission</h1>

      {/* 统计数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 总收入卡片 */}
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
          </CardBody>
        </Card>

        {/* 总分润卡片 */}
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600">Total Commission</p>
            <p className="text-3xl font-bold text-blue-600">${totalCommission.toLocaleString()}</p>
          </CardBody>
        </Card>

        {/* 分润比例卡片 */}
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600">Commission Rate</p>
            <p className="text-3xl font-bold text-purple-600">5%</p>
          </CardBody>
        </Card>
      </div>

      {/* 收入与分润记录表格 */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Revenue & Commission Records</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Revenue and commission table">
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Revenue (USDT)</TableColumn>
              <TableColumn>Commission (USDT)</TableColumn>
              <TableColumn>Commission Rate</TableColumn>
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
