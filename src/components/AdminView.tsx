/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Order, CardTier, SystemStats } from '../types';
import { 
  TrendingUp, CircleAlert, RefreshCw, Layers, DollarSign, Settings, 
  Search, Download, Plus, AlertCircle, Sparkles, CheckCircle2, Ticket 
} from 'lucide-react';

interface AdminViewProps {
  tiers: CardTier[];
  orders: Order[];
  stats: SystemStats;
  onModifyTiers: (updatedTiers: CardTier[]) => void;
  onUpdateOrders: (updatedOrders: Order[]) => void;
  onTriggerRefund: (orderId: string) => void;
  onExportReports: () => void;
}

export default function AdminView({ 
  tiers, 
  orders, 
  stats, 
  onModifyTiers, 
  onUpdateOrders, 
  onTriggerRefund,
  onExportReports
}: AdminViewProps) {
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // States for Price editing modal
  const [editingTierId, setEditingTierId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<string>('');
  
  // Stock simulate counters
  const [stockCounts, setStockCounts] = useState<Record<string, number>>({
    day: 345,
    month: 512,
    year: 120,
    lifetime: 88
  });

  const handleStockIncrease = (tierId: string) => {
    setStockCounts(prev => ({
      ...prev,
      [tierId]: prev[tierId] + 100
    }));
  };

  const handleStartEditPrice = (tier: CardTier) => {
    setEditingTierId(tier.id);
    setEditingPrice(tier.price.toString());
  };

  const handleSavePrice = (tierId: string) => {
    const parsed = parseFloat(editingPrice);
    if (!isNaN(parsed) && parsed >= 0) {
      const updated = tiers.map(t => {
        if (t.id === tierId) {
          return { ...t, price: parsed };
        }
        return t;
      });
      onModifyTiers(updated);
      setEditingTierId(null);
    }
  };

  // Filter orders according to user query in search bar
  const filteredOrders = orders.filter(
    o => o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
         o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         o.tierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Dashboard Top Area Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#3e484f] pb-4">
        <div>
          <h2 className="font-sans text-xl md:text-2xl font-black text-[#dae2fd] tracking-tight">
            Tdone 业务概览
          </h2>
          <p className="text-xs text-[#bdc8d1]">
            实时同步中的 Tdone 官方发卡与交易数据。
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#87929a]" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索订单、邮箱或规格..."
              className="w-full sm:w-64 pl-9 pr-3 py-1.5 bg-[#171f33] border border-[#3e484f]/80 rounded-lg text-xs font-sans focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none text-[#dae2fd] placeholder-[#87929a]"
            />
          </div>

          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#38bdf8] ring-2 ring-[#38bdf8]/20 shrink-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdNln7rni50RQ8solu6dj1DvlF0Tj_GyK_Q_Y5rA5hWwdAq-ULiPILgtvVUrM47nGvczcSQ4i8mUR7vxzDx1HcaqoOFrGkk_Kk3ZVOtcTLxJ_SaUE4FeCHC2fDsZ4LIRFJbZfXPyYjAJnFsEJw24XF1WCD_eho4oDRFq42xxZBbA1HJ2N7jFyr1iHABojAz1BGe3zAltQUB82i2cLQazA7Iwd-D_RAroLbVlPL7P0h_U95do6Qcvbylx84wvUJQU2_J6FFYIjqw7p4" 
              alt="Merchant administrator profile avatar picture" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Grid containing high-fidelity technical performance metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Daily sales */}
        <div className="bg-[#171f33] p-5 rounded-xl border border-[#3e484f]/60 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-[#38bdf8]/10 rounded-full blur-xl"></div>
          <p className="text-[10px] text-[#87929a] uppercase tracking-wider font-bold">今日销售额</p>
          <h3 className="font-sans text-xl font-extrabold text-[#38bdf8] mt-1">
            ¥ {stats.dailySales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-[#45e3ce] text-xs font-bold flex items-center gap-1 mt-1 font-sans">
            <TrendingUp size={13} />
            <span>+{stats.dailyPercent}% 环比提升</span>
          </p>
        </div>

        {/* Metric 2: Monthly Cumulative */}
        <div className="bg-[#171f33] p-5 rounded-xl border border-[#bdc2ff]/30 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-[#bdc2ff]/10 rounded-full blur-xl"></div>
          <p className="text-[10px] text-[#87929a] uppercase tracking-wider font-bold">本月累计额</p>
          <h3 className="font-sans text-xl font-extrabold text-[#bdc2ff] mt-1">
            ¥ {stats.monthlySales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-[#45e3ce] text-xs font-bold flex items-center gap-1 mt-1 font-sans">
            <TrendingUp size={13} />
            <span>+{stats.monthlyPercent}% 季增长</span>
          </p>
        </div>

        {/* Metric 3: Yearly total */}
        <div className="bg-[#171f33] p-5 rounded-xl border border-[#45e3ce]/30 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-[#45e3ce]/10 rounded-full blur-xl"></div>
          <p className="text-[10px] text-[#87929a] uppercase tracking-wider font-bold">年度销售额</p>
          <h3 className="font-sans text-xl font-extrabold text-[#45e3ce] mt-1">
            ¥ {stats.yearlySales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-[#bdc8d1] text-xs mt-1">同期对比基本持平</p>
        </div>

        {/* Metric 4: Lifetime total */}
        <div className="bg-[#171f33] p-5 rounded-xl border border-[#dae2fd]/30 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-[#dae2fd]/5 rounded-full blur-xl"></div>
          <p className="text-[10px] text-[#87929a] uppercase tracking-wider font-bold">历史总发行额</p>
          <h3 className="font-sans text-xl font-extrabold text-[#dae2fd] mt-1">
            ¥ {stats.lifetimeSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-[#bdc8d1] text-xs mt-1">系统全量核心销售记录</p>
        </div>

      </div>

      {/* Bento Block columns: Sales visual chart + Inventory controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales visual chart (7 days graph mockup) */}
        <div className="lg:col-span-8 bg-[#171f33] p-6 rounded-xl border border-[#3e484f]/60 flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-[#3e484f]/40">
            <h4 className="font-sans text-sm font-extrabold text-[#dae2fd] border-l-4 border-[#38bdf8] pl-3">
              销售额趋势(本周 7 天)
            </h4>
            <div className="flex gap-2">
              <button 
                onClick={onExportReports}
                className="px-3 py-1 bg-[#1d293b] hover:bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 rounded text-xs transition-all cursor-pointer flex items-center gap-1 font-semibold"
              >
                <Download size={13} />
                <span>导出交易日志</span>
              </button>
            </div>
          </div>

          {/* Glowing dynamic high-tech chart visualizer representation */}
          <div className="h-64 flex items-end justify-between gap-4 px-4 pt-10 pb-2 relative">
            {stats.chartData.map((data, idx) => {
              // Calculate percentage relative to max of 1500 to scale height dynamically
              const heightPercent = `${Math.min(100, Math.max(15, (data.amount / 1500) * 100))}%`;
              const isToday = data.day === 'Today';

              return (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 bg-[#0b1326] px-2.5 py-1 border border-[#38bdf8]/40 rounded text-[10px] font-mono text-[#38bdf8] transition-all duration-300 pointer-events-none shadow-lg">
                    ¥{data.amount}
                  </div>

                  <div className="w-full relative rounded-t overflow-hidden transition-all duration-500" style={{ height: heightPercent }}>
                    <div className={`absolute inset-0 transition-opacity ${
                      isToday 
                        ? 'bg-gradient-to-t from-[#31394d] via-[#38bdf8] to-[#8ed5ff] opacity-100 shadow-[0_0_15px_rgba(142,213,255,0.4)]'
                        : 'bg-gradient-to-t from-[#131b2e] to-[#38bdf8]/40 group-hover:to-[#38bdf8]/75'
                    }`}></div>
                  </div>
                  
                  <span className={`font-sans text-[10px] ${isToday ? 'text-[#38bdf8] font-bold' : 'text-[#87929a]'}`}>
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Catalog price and CD-Key stock settings */}
        <div className="lg:col-span-4 bg-[#171f33] p-6 rounded-xl border border-[#3e484f]/60 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-extrabold text-[#dae2fd] border-l-4 border-[#38bdf8] pl-3 pb-1 border-b border-[#3e484f]/40">
              前台套餐价格与库存管理
            </h4>

            {/* Editing Price controls listing */}
            <div className="space-y-3">
              {tiers.map((tier) => (
                <div key={tier.id} className="bg-[#0b1326] p-3 rounded-lg border border-[#3e484f]/50 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs font-bold text-[#dae2fd]">{tier.name}</span>
                    
                    <span className="text-[10px] text-[#87929a]">
                      剩余: <span className="text-[#45e3ce] font-bold font-mono">{stockCounts[tier.id]} 张</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center gap-4 text-xs font-mono">
                    {editingTierId === tier.id ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <span className="text-[#38bdf8] text-xs font-bold">￥</span>
                        <input
                          type="number"
                          step="0.1"
                          className="w-20 bg-[#171f33] border border-[#38bdf8] rounded px-1.5 py-0.5 text-xs text-white"
                          value={editingPrice}
                          onChange={(e) => setEditingPrice(e.target.value)}
                        />
                        <button
                          onClick={() => handleSavePrice(tier.id)}
                          className="bg-[#45e3ce] hover:bg-opacity-90 text-[#003731] px-2 py-0.5 rounded font-sans text-[10px] font-bold cursor-pointer"
                        >
                          应用
                        </button>
                        <button
                          onClick={() => setEditingTierId(null)}
                          className="text-[#87929a] text-[10px]"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          <span className="text-[#38bdf8]">￥</span>
                          <span className="text-[#38bdf8] font-bold">{tier.price.toFixed(1)}</span>
                          <button
                            onClick={() => handleStartEditPrice(tier)}
                            className="ml-1 text-[10px] text-[#87929a] hover:text-white underline"
                          >
                            改价
                          </button>
                        </div>

                        <button
                          onClick={() => handleStockIncrease(tier.id)}
                          className="px-2 py-0.5 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/20 rounded font-sans text-[10px] font-semibold cursor-pointer"
                        >
                          +100 卡密
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#131b2e] p-3 rounded-lg border border-[#3e484f]/30 mt-4 text-[10px] text-[#87929a] leading-relaxed">
            💡改价格与补库存可立刻作用于前台。比如“改价天卡为￥6.6”后，进入“全部商品”下单将立刻按新价格计算。
          </div>
        </div>

      </div>

      {/* Recent Tdone Sales Table */}
      <div className="bg-[#171f33] rounded-xl border border-[#3e484f]/60 overflow-hidden shadow-lg">
        <div className="px-6 py-4.5 border-b border-[#3e484f]/40 flex justify-between items-center bg-[#131b2e]/60">
          <h4 className="font-sans text-sm font-extrabold text-[#dae2fd]">最近授权销售流水记录</h4>
          <span className="text-[10px] text-[#87929a] font-mono">
            系统合计活跃订单数: <span className="text-[#38bdf8] font-bold">{orders.length}</span> 个
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="bg-[#131b2e] border-b border-[#3e484f]/40 text-[#87929a] tracking-wider uppercase font-bold text-[10px]">
                <th className="px-6 py-3">订单编号</th>
                <th className="px-6 py-3">接收邮箱</th>
                <th className="px-6 py-3">购买套餐规格</th>
                <th className="px-6 py-3">交易日期</th>
                <th className="px-6 py-3">实付金额</th>
                <th className="px-6 py-3 text-center">发货状态</th>
                <th className="px-6 py-3 text-right">后台操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3e484f]/25">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr 
                    key={order.id}
                    className="hover:bg-[#1d293b]/50 transition-colors"
                  >
                    <td className="px-6 py-3 font-mono font-bold text-[#38bdf8]">{order.id}</td>
                    <td className="px-6 py-3 text-slate-300 font-mono truncate max-w-[120px]" title={order.email}>
                      {order.email}
                    </td>
                    <td className="px-6 py-3 text-slate-200">{order.tierName}</td>
                    <td className="px-6 py-3 text-[#bdc8d1] font-mono whitespace-nowrap">{order.createdAt}</td>
                    <td className="px-6 py-3 font-mono font-bold text-slate-100">¥{order.totalPrice.toFixed(2)}</td>
                    <td className="px-6 py-3 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        order.status === 'paid'
                          ? 'bg-[#45e3ce]/10 text-[#45e3ce] border border-[#45e3ce]/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/15'
                      }`}>
                        {order.status === 'paid' ? '已发放' : '退款'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right whitespace-nowrap">
                      {order.status === 'paid' ? (
                        <button
                          onClick={() => onTriggerRefund(order.id)}
                          className="px-2 py-1 hover:bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded text-[10px] font-bold cursor-pointer transition-all active:scale-95"
                          title="模拟发起微信原路退款"
                        >
                          退款
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#87929a] italic">只读状态</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#87929a] font-sans">
                    暂未查询到符合搜索条件的流水，请更换词条词根重新尝试。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cyber system health status ribbon */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-[#131b2e] border border-[#3e484f] rounded-xl text-center sm:text-left gap-3.5">
        <span className="text-[11px] text-[#bdc8d1]">
          🔒 服务器节点: <span className="text-[#38bdf8] font-semibold">Tdone Cyber Cluster #04-PR2</span> | 防御状态: 正常
        </span>

        {/* Pulse status box */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#0b1326] rounded-lg border border-[#3e484f]/60">
          <span className="w-2 h-2 bg-[#45e3ce] rounded-full animate-pulse shadow-[0_0_8px_rgba(69,227,206,0.8)]"></span>
          <span className="font-mono text-[9px] text-[#45e3ce] uppercase font-bold tracking-widest select-none">
            CORE_SERVICE: ONLINE
          </span>
        </div>
      </div>

    </div>
  );
}
