/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CardTier, Announcement } from '../types';
import { Megaphone, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Zap, Heart, MessageSquare } from 'lucide-react';

interface HomeViewProps {
  tiers: CardTier[];
  announcements: Announcement[];
  onSelectTier: (tierId: string) => void;
  onNavigate: (view: 'buy' | 'track') => void;
}

export default function HomeView({ tiers, announcements, onSelectTier, onNavigate }: HomeViewProps) {
  return (
    <div className="space-y-8">
      {/* Upper banner section */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Announcement Panel */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#171f33] p-5 rounded-xl border border-[#3e484f]"
          >
            <div className="flex items-center gap-2 mb-3 text-[#38bdf8]">
              <Megaphone className="w-4 h-4" />
              <h3 className="font-sans font-bold text-sm tracking-wide">官方最新公告</h3>
            </div>
            
            <div className="space-y-4">
              {announcements.map((item, idx) => (
                <div key={item.id} className={`text-xs space-y-1 ${idx > 0 ? 'border-t border-[#3e484f]/40 pt-2' : ''}`}>
                  <div className="flex justify-between items-center text-[#87929a]">
                    <span className="font-mono text-[10px]">{item.date}</span>
                    <span className="px-1.5 py-0.2 bg-[#38bdf8]/10 text-[#38bdf8] rounded font-mono text-[9px]">
                      {item.category === 'info' ? '资讯' : '重要'}
                    </span>
                  </div>
                  <p className="font-sans text-[#bdc8d1] leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#171f33] p-5 rounded-xl border border-[#3e484f] space-y-3"
          >
            <div className="flex items-center gap-2 text-[#45e3ce]">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="font-sans font-bold text-sm tracking-wide">正版安全授权</h3>
            </div>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              本店属于 Tdone 官方直营，所有授权卡密均通过后台系统实时演算。下单后将 
              <span className="text-[#38bdf8] font-semibold">100% 自动秒发</span>，支持多端即开即用。
            </p>
          </motion.div>
        </aside>

        {/* Master Showcase Banner */}
        <section className="flex-grow">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-gradient-to-br from-[#171f33] to-[#0f172a] p-6 md:p-8 rounded-2xl border border-[#3e484f] overflow-hidden group shadow-2xl"
          >
            {/* Visual background gloss elements */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#38bdf8]/10 rounded-full blur-3xl -z-10 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-[#45e3ce]/5 rounded-full blur-2xl -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1 bg-[#38bdf8]/10 text-[#38bdf8] px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-[#38bdf8]/20">
                  <Sparkles size={12} />
                  官方软件授权
                </span>
                
                <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#dae2fd] select-none tracking-tight">
                  Tdone 自动跑图
                </h1>
                
                <p className="font-sans text-sm text-[#bdc8d1] leading-relaxed">
                  Tdone 自动跑图,分钟材料,刷级辅助。
                </p>

                {/* Bullets feature list */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#45e3ce]">
                    <CheckCircle2 size={14} />
                    <span className="font-medium text-[#dae2fd]">官方秒级自动发卡</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#45e3ce]">
                    <CheckCircle2 size={14} />
                    <span className="font-medium text-[#dae2fd]">微信及快捷支付</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#45e3ce]">
                    <CheckCircle2 size={14} />
                    <span className="font-medium text-[#dae2fd]">7x24 优质售后支持</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('buy')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#8ed5ff] hover:bg-[#38bdf8] text-[#001e2c] font-bold text-sm rounded-lg transition-all transform active:scale-95 shadow-lg shadow-[#8ed5ff]/20 hover:shadow-[#38bdf8]/30"
                  >
                    <span>预览购买套餐</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Product Mockup Representation */}
              <div className="lg:col-span-5 w-full aspect-video">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#222a3d] border border-[#3e484f] group-hover:border-[#38bdf8]/40 transition-colors shadow-lg">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0QcVhrMKUPNyeeuBzfxqSQUlHu3YZ5uohwBApYY4QhaZgtSv-7fjNvD40rIY7gG9VTSW-P-glILORJ5NAPFiwdiJh_P04nlzBFitlJ0Bu62rTQAg-ST6WD9HOOyXI7eVzsHK_IWCPhiThf9NY7GfHe1a2dtrg82haGccfeJYLNFo3kfW_PGZKgOUkmgrivkXh6d4bfR6U6gwlILXt8aHAHZVxNawYSBwRI2AyvPPBFBAuWvonB5sHZs5f8TcAuX9pXaq8tSKhmzCY" 
                    alt="Tdone 自动跑图" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Pricing Section Title */}
      <div className="text-center space-y-2 pt-4">
        <h2 className="font-sans text-xl md:text-2xl font-bold text-[#dae2fd]">官方在售授权卡套餐</h2>
        <p className="text-xs text-[#bdc8d1]">支持购买后立刻显示卡密并发送备份至您的查单邮箱</p>
      </div>

      {/* Grid containing card options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => {
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative bg-[#171f33]/60 backdrop-blur-md rounded-xl p-6 border flex flex-col transition-all ${
                tier.isPopular 
                  ? 'border-2 border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.15)] ring-1 ring-[#38bdf8]/30' 
                  : 'border-[#3e484f] hover:border-[#38bdf8]/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.08)]'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#38bdf8] text-[#004965] px-3.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-md">
                  最受欢迎
                </div>
              )}

              <div className="text-center space-y-1.5 pb-2">
                <h4 className="font-sans text-lg font-bold text-[#dae2fd]">{tier.name}</h4>
                <p className="text-[#bdc8d1] text-xs font-medium">{tier.description}</p>
              </div>

              <div className="text-center py-6 border-y border-[#3e484f]/30 my-4 bg-[#0b1326]/40 rounded-lg">
                <span className="text-[#38bdf8] text-xs font-bold font-mono">￥</span>
                <span className="text-[#38bdf8] font-sans text-3xl font-extrabold tracking-tight">
                  {tier.price.toFixed(1)}
                </span>
                <span className="text-[#87929a] text-[10px] ml-1 font-sans">/ 首发价</span>
              </div>

              {/* Tier benefits */}
              <ul className="space-y-2.5 text-xs text-[#bdc8d1]/90 flex-grow mb-6">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-[#45e3ce] mt-0.5 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Purchase Button */}
              <button
                onClick={() => onSelectTier(tier.id)}
                className={`w-full py-2.5 rounded font-bold text-xs tracking-wider uppercase transition-all duration-300 transform active:scale-98 cursor-pointer ${
                  tier.isPopular
                    ? 'bg-[#38bdf8] text-[#004965] hover:brightness-110 shadow-md shadow-[#38bdf8]/20'
                    : tier.id === 'lifetime'
                    ? 'bg-[#dae2fd] text-[#0b1326] hover:bg-[#bdc2ff] hover:text-[#131e8c]'
                    : 'bg-[#171f33] border border-[#3e484f] text-[#dae2fd] hover:text-[#38bdf8] hover:border-[#38bdf8]'
                }`}
              >
                {tier.id === 'lifetime' ? '永久买断授权' : '立即购买卡密'}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Support channel ribbon banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#131b2e] border border-[#3e484f] p-6 rounded-2xl flex flex-col items-center gap-4 text-center mt-6 shadow-md"
      >
        <h2 className="font-sans text-[11px] font-bold text-[#87929a] uppercase tracking-widest">
          多重支付与信誉承诺
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3 bg-[#171f33] px-5 py-2.5 rounded-xl border border-[#3e484f]/60">
            <Zap className="text-[#45e3ce] w-5 h-5 animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-xs font-bold text-[#dae2fd]">微信极速到账支付</span>
              <span className="text-[9px] text-[#87929a] font-mono">WeChat Sec Pay</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#171f33] px-5 py-2.5 rounded-xl border border-[#3e484f]/60">
            <Heart className="text-[#38bdf8] w-5 h-5" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-xs font-bold text-[#dae2fd]">7x24 优质售后群</span>
              <span className="text-[9px] text-[#87929a] font-mono">Live Customer Care</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#171f33] px-5 py-2.5 rounded-xl border border-[#3e484f]/60">
            <MessageSquare className="text-[#bdc2ff] w-5 h-5" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-xs font-bold text-[#dae2fd]">在线卡密即查即取</span>
              <span className="text-[9px] text-[#87929a] font-mono">Instant CD-Key Extraction</span>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-[#bdc8d1] max-w-lg leading-relaxed">
          我们使用多层交易保护。在激活流程中遇到无法充值、无效授权码或断开连接，请立即点击底部客服链接取得反馈，我们将极速为您协助。
        </p>
      </motion.section>
    </div>
  );
}
