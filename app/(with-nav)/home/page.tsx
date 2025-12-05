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
    <section className="flex flex-col items-center justify-center gap-10 py-12 md:py-16">
      {/* 标题区域 - 增强视觉效果 */}
      <div className="inline-block max-w-4xl text-center justify-center backdrop-blur-sm bg-white/30 p-8 rounded-3xl shadow-2xl border border-white/50">
        <div className="mb-4">
          <span className="text-5xl md:text-6xl font-bold text-gray-800">PicWe&nbsp;</span>
          <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Commodity Credit Network
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Global Commodity Financing & Settlement Platform
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Transform traditional commodity trade into on-chain financeable credit assets through blockchain technology
        </p>
      </div>

      {/* 主要功能卡片 - 第一行 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* 商品管理卡片 */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
          <CardBody className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-5xl">📦</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Product Management
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Register and manage your commodity assets with unique on-chain asset IDs
            </p>
            <Button 
              as={Link} 
              href="/products" 
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </CardBody>
        </Card>

        {/* 融资申请卡片 */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
          <CardBody className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-5xl">💰</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Financing Application
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Quick financing based on commodity assets with multiple pool options
            </p>
            <Button 
              as={Link} 
              href="/financing" 
              size="lg"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Apply Now
            </Button>
          </CardBody>
        </Card>

        {/* 融资池卡片 */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
          <CardBody className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-5xl">🏊</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Financing Pools
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Participate in financing pools and earn stable on-chain returns
            </p>
            <Button 
              as={Link} 
              href="/pools" 
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              View Pools
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* 主要功能卡片 - 第二行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* 结算中心卡片 */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
          <CardBody className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-5xl">💳</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Settlement Center
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Real-time payment status and settlement operations
            </p>
            <Button 
              as={Link} 
              href="/settlement" 
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Enter Settlement
            </Button>
          </CardBody>
        </Card>

        {/* 数据分析卡片 */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
          <CardBody className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-5xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Data Analytics
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              View revenue data and commission records in real-time
            </p>
            <Button 
              as={Link} 
              href="/analytics" 
              size="lg"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              View Data
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* 核心优势展示区域 */}
      <div className="mt-12 w-full max-w-6xl">
        <div className="backdrop-blur-lg bg-white/80 p-10 rounded-3xl shadow-2xl border-2 border-white/50">
          <h3 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Core Advantages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 快速融资 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🚀</span>
              </div>
              <p className="font-bold text-xl mb-2 text-gray-800">Fast Financing</p>
              <p className="text-gray-600 leading-relaxed">
                Quick funding based on commodity assets
              </p>
            </div>

            {/* 安全透明 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🔒</span>
              </div>
              <p className="font-bold text-xl mb-2 text-gray-800">Secure & Transparent</p>
              <p className="text-gray-600 leading-relaxed">
                Blockchain technology ensures fund security
              </p>
            </div>

            {/* 稳定收益 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">💎</span>
              </div>
              <p className="font-bold text-xl mb-2 text-gray-800">Stable Returns</p>
              <p className="text-gray-600 leading-relaxed">
                LPs earn stable investment returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
