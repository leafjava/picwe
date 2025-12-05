'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { title, subtitle } from '@/components/primitives';

/**
 * 首页组件
 * 展示 PicWe CCN 平台的主要功能模块入口
 */
export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      {/* 标题区域 */}
      <div className="inline-block max-w-3xl text-center justify-center">
        <span className={title()}>PicWe&nbsp;</span>
        <span className={title({ color: 'violet' })}>Commodity Credit Network&nbsp;</span>
        <br />
        <span className={title({ size: 'sm' })}>Global Commodity Financing & Settlement Platform</span>
        <div className={subtitle({ class: 'mt-4' })}>
          Transform traditional commodity trade into on-chain financeable credit assets through blockchain technology
        </div>
      </div>

      {/* 主要功能卡片 - 第一行 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* 商品管理卡片 */}
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Product Management</h3>
            <p className="text-sm text-gray-600 mb-4">
              Register and manage your commodity assets with unique on-chain asset IDs
            </p>
            <Button as={Link} href="/products" color="primary" variant="flat">
              Get Started
            </Button>
          </CardBody>
        </Card>

        {/* 融资申请卡片 */}
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Financing Application</h3>
            <p className="text-sm text-gray-600 mb-4">
              Quick financing based on commodity assets with multiple pool options
            </p>
            <Button as={Link} href="/financing" color="primary" variant="flat">
              Apply Now
            </Button>
          </CardBody>
        </Card>

        {/* 融资池卡片 */}
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">🏊</div>
            <h3 className="text-xl font-semibold mb-2">Financing Pools</h3>
            <p className="text-sm text-gray-600 mb-4">
              Participate in financing pools and earn stable on-chain returns
            </p>
            <Button as={Link} href="/pools" color="primary" variant="flat">
              View Pools
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* 主要功能卡片 - 第二行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* 结算中心卡片 */}
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Settlement Center</h3>
            <p className="text-sm text-gray-600 mb-4">
              Real-time payment status and settlement operations
            </p>
            <Button as={Link} href="/settlement" color="primary" variant="flat">
              Enter Settlement
            </Button>
          </CardBody>
        </Card>

        {/* 数据分析卡片 */}
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">
              View revenue data and commission records in real-time
            </p>
            <Button as={Link} href="/analytics" color="primary" variant="flat">
              View Data
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* 核心优势展示区域 */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg max-w-5xl">
        <h3 className="text-2xl font-bold mb-4 text-center">Core Advantages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-semibold text-lg">🚀 Fast Financing</p>
            <p className="text-sm text-gray-600">Quick funding based on commodity assets</p>
          </div>
          <div>
            <p className="font-semibold text-lg">🔒 Secure & Transparent</p>
            <p className="text-sm text-gray-600">Blockchain technology ensures fund security</p>
          </div>
          <div>
            <p className="font-semibold text-lg">💎 Stable Returns</p>
            <p className="text-sm text-gray-600">LPs earn stable investment returns</p>
          </div>
        </div>
      </div>
    </section>
  );
}
