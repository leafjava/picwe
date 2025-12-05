'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { title, subtitle } from '@/components/primitives';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <span className={title()}>PicWe&nbsp;</span>
        <span className={title({ color: 'violet' })}>商品信用网络&nbsp;</span>
        <br />
        <span className={title({ size: 'sm' })}>全球大宗商品链上融资与结算平台</span>
        <div className={subtitle({ class: 'mt-4' })}>
          通过区块链技术将传统大宗商品贸易转化为可链上融资和交易的信用资产
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">商品管理</h3>
            <p className="text-sm text-gray-600 mb-4">
              注册和管理您的商品资产，生成唯一的链上资产ID
            </p>
            <Button as={Link} href="/products" color="primary" variant="flat">
              开始管理
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">融资申请</h3>
            <p className="text-sm text-gray-600 mb-4">
              基于商品资产快速获得融资，支持多种融资池选择
            </p>
            <Button as={Link} href="/financing" color="primary" variant="flat">
              申请融资
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">🏊</div>
            <h3 className="text-xl font-semibold mb-2">融资池</h3>
            <p className="text-sm text-gray-600 mb-4">
              参与融资池投资，获得稳定的链上收益回报
            </p>
            <Button as={Link} href="/pools" color="primary" variant="flat">
              查看融资池
            </Button>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">结算中心</h3>
            <p className="text-sm text-gray-600 mb-4">
              实时查看支付状态，触发清算操作
            </p>
            <Button as={Link} href="/settlement" color="primary" variant="flat">
              进入结算
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">数据分析</h3>
            <p className="text-sm text-gray-600 mb-4">
              查看收益数据和分润记录，实时掌握资金流向
            </p>
            <Button as={Link} href="/analytics" color="primary" variant="flat">
              查看数据
            </Button>
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg max-w-5xl">
        <h3 className="text-2xl font-bold mb-4 text-center">核心优势</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-semibold text-lg">🚀 快速融资</p>
            <p className="text-sm text-gray-600">基于商品资产快速获得资金</p>
          </div>
          <div>
            <p className="font-semibold text-lg">🔒 安全透明</p>
            <p className="text-sm text-gray-600">区块链技术保障资金安全</p>
          </div>
          <div>
            <p className="font-semibold text-lg">💎 稳定收益</p>
            <p className="text-sm text-gray-600">LP获得稳定的投资回报</p>
          </div>
        </div>
      </div>
    </section>
  );
}
