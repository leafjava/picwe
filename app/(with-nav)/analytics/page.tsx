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
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Data Analytics & Commission
        </h1>
        <p className="text-gray-600 mt-2">Track your revenue and commission performance</p>
      </div>

      {/* 统计数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 总收入卡片 */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600 mb-1">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-green-600">+12.5% from last month</p>
          </CardBody>
        </Card>

        {/* 总分润卡片 */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Commission</p>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-1">
              ${totalCommission.toLocaleString()}
            </p>
            <p className="text-xs text-blue-600">+8.3% from last month</p>
          </CardBody>
        </Card>

        {/* 分润比例卡片 */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 backdrop-blur-md bg-white/80">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Commission Rate</p>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-purple-600 mb-1">5%</p>
            <p className="text-xs text-purple-600">Standard rate</p>
          </CardBody>
        </Card>
      </div>

      {/* 收入与分润记录表格 */}
      <Card className="backdrop-blur-md bg-white/80 shadow-xl">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📈</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Revenue & Commission Records</h2>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <Table 
            aria-label="Revenue and commission table"
            classNames={{
              wrapper: "shadow-none",
              th: "bg-gray-100 text-gray-700 font-semibold",
              td: "text-gray-700",
            }}
          >
            <TableHeader>
              <TableColumn>DATE</TableColumn>
              <TableColumn>REVENUE (USDT)</TableColumn>
              <TableColumn>COMMISSION (USDT)</TableColumn>
              <TableColumn>RATE</TableColumn>
            </TableHeader>
            <TableBody>
              {revenueData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <span className="font-medium">{item.date}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-semibold">
                      ${item.revenue.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-blue-600 font-semibold">
                      ${item.commission.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      5%
                    </span>
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
