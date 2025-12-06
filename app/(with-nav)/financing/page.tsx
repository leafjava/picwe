'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Chip } from '@heroui/chip';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Spinner } from '@heroui/spinner';
import {
  useAccount,
  useConnect,
  useDisconnect,
  usePublicClient,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { ReceivablePoolAbi } from '@/lib/abi/ReceivablePool';
import { CommodityAssetRegistryAbi } from '@/lib/abi/CommodityAssetRegistry';
import { REGISTRY_ADDRESS, RECEIVABLE_POOL_ADDRESS } from '@/lib/contracts';

type Asset = {
  id: bigint;
  name: string;
  quantity: bigint;
  unit: string;
  referenceValue: bigint;
  issuer: string;
  status: number;
  metadataURI: string;
};

const toBigIntInput = (val?: string) => {
  if (val === undefined || val === null) return undefined;
  const trimmed = val.trim();
  if (!trimmed) return undefined;
  try {
    return BigInt(trimmed);
  } catch {
    return undefined;
  }
};

const statusLabel = (status: number) => {
  const map: Record<number, string> = {
    0: 'Pending',
    1: 'Active',
    2: 'Cleared',
    3: 'Defaulted',
  };
  return map[status] ?? `#${status}`;
};

const formatPrice = (value: bigint) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function FinancingPage() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient();

  // 链上资产
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');

  // 表单
  const [borrower, setBorrower] = useState('');
  const [payer, setPayer] = useState('');
  const [interestRateBps, setInterestRateBps] = useState('800');
  const [tenorDays, setTenorDays] = useState('30');
  const [drawdownDealId, setDrawdownDealId] = useState('');
  const [drawdownAmount, setDrawdownAmount] = useState('0');

  useEffect(() => {
    if (address) {
      setBorrower((prev) => prev || address);
      setPayer((prev) => prev || address);
    }
  }, [address]);

  const parsedAssetId = useMemo(() => toBigIntInput(selectedAssetId), [selectedAssetId]);
  const parsedDealId = useMemo(() => toBigIntInput(drawdownDealId), [drawdownDealId]);

  const { data: nextAssetId } = useReadContract({
    address: REGISTRY_ADDRESS,
    abi: CommodityAssetRegistryAbi,
    functionName: 'nextAssetId',
  });

  const { data: nextDealId } = useReadContract({
    address: RECEIVABLE_POOL_ADDRESS,
    abi: ReceivablePoolAbi,
    functionName: 'nextDealId',
  });

  const { data: poolDeposits } = useReadContract({
    address: RECEIVABLE_POOL_ADDRESS,
    abi: ReceivablePoolAbi,
    functionName: 'poolTotalDeposits',
    args: parsedAssetId ? [parsedAssetId] : undefined,
    query: { enabled: Boolean(parsedAssetId) },
  });

  const { data: liquidity } = useReadContract({
    address: RECEIVABLE_POOL_ADDRESS,
    abi: ReceivablePoolAbi,
    functionName: 'availableLiquidity',
    args: parsedAssetId ? [parsedAssetId] : undefined,
    query: { enabled: Boolean(parsedAssetId) },
  });

  const { data: reservedInterest } = useReadContract({
    address: RECEIVABLE_POOL_ADDRESS,
    abi: ReceivablePoolAbi,
    functionName: 'reservedInterest',
    args: parsedAssetId ? [parsedAssetId] : undefined,
    query: { enabled: Boolean(parsedAssetId) },
  });

  const {
    data: txHash,
    writeContract,
    isPending,
    error: writeError,
  } = useWriteContract();
  const { isLoading: confirming, isSuccess: success } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // 读取链上资产列表
  useEffect(() => {
    const fetchAssets = async () => {
      if (!publicClient || nextAssetId === undefined) return;
      setLoadingAssets(true);
      setLoadError(null);
      try {
        const total = Number(nextAssetId);
        if (total === 0) {
          setAssets([]);
          return;
        }
        const calls = Array.from({ length: total }, (_v, i) => ({
          address: REGISTRY_ADDRESS,
          abi: CommodityAssetRegistryAbi,
          functionName: 'getAsset' as const,
          args: [BigInt(i)],
        }));

        const result = await publicClient.multicall({
          allowFailure: true,
          contracts: calls,
        });

        const parsed: Asset[] = [];
        result.forEach((res, idx) => {
          if (res.status === 'success') {
            const asset = res.result as any;
            parsed.push({
              id: BigInt(idx),
              name: asset.name,
              metadataURI: asset.metadataURI,
              quantity: BigInt(asset.quantity),
              unit: asset.unit,
              referenceValue: BigInt(asset.referenceValue),
              issuer: asset.issuer,
              status: Number(asset.status),
            });
          }
        });
        setAssets(parsed);
        if (!selectedAssetId && parsed.length > 0) {
          setSelectedAssetId(parsed[0].id.toString());
        }
      } catch (err: any) {
        setLoadError(err?.message || '加载失败');
      } finally {
        setLoadingAssets(false);
      }
    };
    fetchAssets();
  }, [publicClient, nextAssetId, selectedAssetId]);

  const handleCreateDeal = () => {
    if (!parsedAssetId || !borrower || !payer) {
      alert('请选择资产并填写 borrower / payer');
      return;
    }
    writeContract({
      address: RECEIVABLE_POOL_ADDRESS,
      abi: ReceivablePoolAbi,
      functionName: 'createFinancingDeal',
      args: [parsedAssetId, borrower, payer, Number(interestRateBps), BigInt(tenorDays)],
    });
  };

  const handleDrawdown = () => {
    if (!parsedDealId || !drawdownAmount) {
      alert('请填写 dealId 和 提取金额');
      return;
    }
    writeContract({
      address: RECEIVABLE_POOL_ADDRESS,
      abi: ReceivablePoolAbi,
      functionName: 'drawdown',
      args: [parsedDealId, BigInt(drawdownAmount)],
    });
  };

  const selectedAsset = assets.find((a) => a.id.toString() === selectedAssetId);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Image src="/ship.png" alt="ship" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* 顶部标题 */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Financing Application</h1>
            <p className="text-gray-400">基于真实链上资产和融资池，提交融资申请</p>
          </div>
          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-300">
                <p>地址：{address}</p>
              </div>
              <Button
                onPress={() => disconnect()}
                className="bg-zinc-800 hover:bg-zinc-700 text-gray-200 border border-zinc-700"
              >
                断开
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  onPress={() => connect({ connector })}
                  isDisabled={isConnecting}
                  className="bg-zinc-800 hover:bg-zinc-700 text-gray-200 border border-zinc-700"
                >
                  连接 {connector.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* 合约信息 */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <Chip className="bg-amber-400 text-black font-semibold border border-amber-300/80">
            Registry: {REGISTRY_ADDRESS}
          </Chip>
          <Chip className="bg-sky-300 text-black font-semibold border border-sky-200/80">
            Pool: {RECEIVABLE_POOL_ADDRESS}
          </Chip>
          <Chip className="bg-emerald-300 text-black font-semibold border border-emerald-200/80">
            nextAssetId: {nextAssetId !== undefined ? String(nextAssetId) : '-'}
          </Chip>
          <Chip className="bg-purple-300 text-black font-semibold border border-purple-200/80">
            nextDealId: {nextDealId !== undefined ? String(nextDealId) : '-'}
          </Chip>
        </div>
        <div className="mb-8 rounded-xl border border-amber-300/40 bg-amber-500/10 text-amber-50 p-4 text-sm">
          <p className="font-semibold mb-1">正确流程指引：</p>
          <ol className="list-decimal list-inside space-y-1 text-amber-100">
            <li>确认资产状态：需要先把 Registry 资产设为可融资状态（通常是 Active/InTransit），可用 Pool.updateAssetStatus（在 Products 页或脚本）修改。</li>
            <li>创建融资交易必须用 <span className="font-semibold">Pool owner 钱包</span> 签名，否则钱包会拒绝/合约会失败。</li>
            <li>选择已登记的资产 → 填写 borrower / payer → 点击“创建融资交易”，记住返回的 dealId（通常是 nextDealId-1）。</li>
            <li>LP 先用 MockUSDT 对 Pool 做 approve + deposit，充值到对应 assetId。</li>
            <li>有流动性后，借款人填入 dealId 和金额，执行 drawdown；偿还用 repay。</li>
          </ol>
          <p className="mt-2 text-amber-200">如果在签名阶段弹出 “User rejected request”，请切换到 Pool owner 账户或确认钱包权限。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：融资申请 */}
          <Card className="bg-[#0f172a]/80 border border-white/10 backdrop-blur-lg lg:col-span-2">
            <CardHeader className="border-b border-white/5">
              <div>
                <p className="text-sm text-amber-300">Pool.createFinancingDeal</p>
                <h2 className="text-2xl font-semibold text-white">提交融资申请</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select
                  label="选择资产"
                  placeholder="从链上已登记资产选择"
                  selectedKeys={selectedAssetId ? new Set([selectedAssetId]) : new Set()}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as string | undefined;
                    setSelectedAssetId(v ?? '');
                  }}
                  classNames={{
                    trigger: 'bg-black border border-white/20 text-white',
                    label: 'text-gray-200',
                    listbox: 'bg-black text-white',
                  }}
                  isDisabled={loadingAssets || assets.length === 0}
                >
                  {assets.map((asset) => (
                    <SelectItem key={asset.id.toString()} value={asset.id.toString()}>
                      #{asset.id.toString()} · {asset.name}
                    </SelectItem>
                  ))}
                </Select>
                <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-gray-300 min-h-[64px]">
                  {selectedAsset ? (
                    <div className="space-y-1">
                      <p className="text-white font-semibold">{selectedAsset.name}</p>
                      <p className="text-gray-400">
                        数量 {selectedAsset.quantity.toString()} {selectedAsset.unit} · 参考价值 $
                        {formatPrice(selectedAsset.referenceValue)}
                      </p>
                      <p className="text-gray-500 text-xs break-all">发行人 {selectedAsset.issuer}</p>
                      <Chip size="sm" className="bg-transparent border border-zinc-700 text-gray-200 mt-1">
                        {statusLabel(selectedAsset.status)}
                      </Chip>
                    </div>
                  ) : (
                    <p className="text-gray-500">请先选择资产</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="borrower"
                  value={borrower}
                  onChange={(e) => setBorrower(e.target.value)}
                  classNames={{
                    inputWrapper:
                      'bg-black border border-white/20 hover:border-amber-300/50 focus-within:border-amber-400/80 text-white',
                    label: 'text-white',
                    input: 'text-white placeholder:text-gray-500',
                  }}
                />
                <Input
                  label="payer"
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
                  classNames={{
                    inputWrapper:
                      'bg-black border border-white/20 hover:border-amber-300/50 focus-within:border-amber-400/80 text-white',
                    label: 'text-white',
                    input: 'text-white placeholder:text-gray-500',
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  label="利率 (bps)"
                  type="number"
                  value={interestRateBps}
                  onChange={(e) => setInterestRateBps(e.target.value)}
                  classNames={{
                    inputWrapper:
                      'bg-black border border-white/20 hover:border-amber-300/50 focus-within:border-amber-400/80 text-white',
                    label: 'text-white',
                    input: 'text-white placeholder:text-gray-500',
                  }}
                />
                <Input
                  label="期限 (days)"
                  type="number"
                  value={tenorDays}
                  onChange={(e) => setTenorDays(e.target.value)}
                  classNames={{
                    inputWrapper:
                      'bg-black border border-white/20 hover:border-amber-300/50 focus-within:border-amber-400/80 text-white',
                    label: 'text-white',
                    input: 'text-white placeholder:text-gray-500',
                  }}
                />
                <Input
                  label="drawdown 金额 (可选，用于下方提取)"
                  type="number"
                  value={drawdownAmount}
                  onChange={(e) => setDrawdownAmount(e.target.value)}
                  classNames={{
                    inputWrapper:
                      'bg-black border border-white/20 hover:border-amber-300/50 focus-within:border-amber-400/80 text-white',
                    label: 'text-white',
                    input: 'text-white placeholder:text-gray-500',
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  color="primary"
                  onPress={handleCreateDeal}
                  isLoading={isPending || confirming}
                  className="bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20"
                >
                  创建融资交易（Pool owner）
                </Button>
                <div className="text-sm text-gray-400">
                  <p>nextDealId: {nextDealId !== undefined ? String(nextDealId) : '-'}</p>
                  <p>提示：需要 Pool owner 钱包才能创建 deal。</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="dealId (用于 drawdown / repay)"
                  value={drawdownDealId}
                  onChange={(e) => setDrawdownDealId(e.target.value)}
                  classNames={{
                    inputWrapper:
                      'bg-black border border-white/20 hover:border-amber-300/50 focus-within:border-amber-400/80 text-white',
                    label: 'text-white',
                    input: 'text-white placeholder:text-gray-500',
                  }}
                />
                <div className="flex gap-2">
                  <Button
                    variant="bordered"
                    onPress={handleDrawdown}
                    isLoading={isPending && !confirming}
                    className="border-amber-300 text-amber-200"
                  >
                    drawdown
                  </Button>
                  <Button
                    variant="bordered"
                    onPress={() => {
                      if (!parsedDealId) return alert('请填写 dealId');
                      writeContract({
                        address: RECEIVABLE_POOL_ADDRESS,
                        abi: ReceivablePoolAbi,
                        functionName: 'repay',
                        args: [parsedDealId],
                      });
                    }}
                    isLoading={isPending && !confirming}
                    className="border-emerald-300 text-emerald-200"
                  >
                    repay
                  </Button>
                </div>
              </div>

              {txHash && (
                <p className="text-xs text-gray-400">
                  tx: {txHash.slice(0, 10)}...{txHash.slice(-6)}{' '}
                  {success && <span className="text-emerald-400 ml-2">已确认</span>}
                </p>
              )}
              {writeError && <p className="text-sm text-red-400">错误：{writeError.message}</p>}
            </CardBody>
          </Card>

          {/* 右侧：池子数据 & 资产列表 */}
          <div className="space-y-4">
            <Card className="bg-[#0f172a]/80 border border-white/10 backdrop-blur-lg">
              <CardHeader className="border-b border-white/5">
                <div>
                  <p className="text-sm text-sky-300">Pool 状态</p>
                  <h3 className="text-lg font-semibold text-white">可用流动性</h3>
                </div>
              </CardHeader>
              <CardBody className="text-sm text-gray-300 space-y-2">
                <p>当前资产 ID：{selectedAssetId || '-'}</p>
                <p>poolTotalDeposits：{poolDeposits !== undefined ? String(poolDeposits) : '-'}</p>
                <p>availableLiquidity：{liquidity !== undefined ? String(liquidity) : '-'}</p>
                <p>reservedInterest：{reservedInterest !== undefined ? String(reservedInterest) : '-'}</p>
                <p className="text-xs text-gray-500">提示：需要 LP 先 deposit 之后才能 drawdown。</p>
              </CardBody>
            </Card>

            <Card className="bg-[#0f172a]/80 border border-white/10 backdrop-blur-lg">
              <CardHeader className="border-b border-white/5">
                <div>
                  <p className="text-sm text-emerald-300">链上资产列表</p>
                  <h3 className="text-lg font-semibold text-white">Registry Assets</h3>
                </div>
              </CardHeader>
              <CardBody>
                {loadError && <p className="text-red-400 mb-2 text-sm">加载失败：{loadError}</p>}
                <div className="max-h-72 overflow-auto border border-white/5 rounded-lg">
                  <Table
                    removeWrapper
                    aria-label="assets"
                    classNames={{
                      th: 'bg-transparent text-gray-400 text-xs uppercase',
                      td: 'text-gray-200',
                    }}
                  >
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>NAME</TableColumn>
                      <TableColumn>QTY</TableColumn>
                      <TableColumn>PRICE</TableColumn>
                    </TableHeader>
                    <TableBody
                      emptyContent={
                        loadingAssets ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Spinner size="sm" color="warning" /> 加载中...
                          </div>
                        ) : (
                          '暂无资产'
                        )
                      }
                    >
                      {assets.map((a) => (
                        <TableRow key={a.id.toString()}>
                          <TableCell className="font-mono text-xs text-gray-400">
                            {a.id.toString()}
                          </TableCell>
                          <TableCell className="text-gray-100">{a.name}</TableCell>
                          <TableCell className="text-gray-300">
                            {a.quantity.toString()} {a.unit}
                          </TableCell>
                          <TableCell className="text-gray-200">
                            ${formatPrice(a.referenceValue)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
