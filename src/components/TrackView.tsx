/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Order } from '../types';
import { Search, Mail, ShieldAlert, Copy, Check, Ticket, ChevronRight, Inbox, Clock } from 'lucide-react';

interface TrackViewProps {
  orders: Order[];
}

export default function TrackView({ orders }: TrackViewProps) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);
  const [queryResults, setQueryResults] = useState<Order[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Quick suggestions based on emails that have orders in database
  const distinctiveEmails = Array.from(new Set(orders.map(o => o.email)));

  const handleQuery = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      return;
    }
    const filtered = orders.filter(
      order => order.email.toLowerCase().trim() === emailInput.toLowerCase().trim()
    );
    setQueryResults(filtered);
    setSearched(true);
  };

  const handleQuickSelectEmail = (selectedEmail: string) => {
    setEmailInput(selectedEmail);
    const filtered = orders.filter(
      order => order.email.toLowerCase().trim() == selectedEmail.toLowerCase().trim()
    );
    setQueryResults(filtered);
    setSearched(true);
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="text-center space-y-2 mb-4">
        <h2 className="font-sans text-xl md:text-2xl font-bold text-[#dae2fd]">卡密自助提卡中心</h2>
        <p className="text-xs text-[#bdc8d1]">输入下单时填写的邮箱，即可同步获取卡密，无需等待</p>
      </div>

      {/* Query Search Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#171f33] p-6 rounded-xl border border-[#3e484f] shadow-xl space-y-5"
      >
        <form onSubmit={handleQuery} className="space-y-4">
          <div>
            <label htmlFor="track-email" className="block text-xs font-bold text-[#bdc8d1] mb-2">
              填写接收邮箱
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#38bdf8]" />
                <input
                  id="track-email"
                  type="email"
                  placeholder="请输入您的收码邮箱"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-[#0b1326] border border-[#3e484f] rounded-lg text-xs focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none text-[#dae2fd] placeholder-[#87929a] transition-all"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#38bdf8] hover:bg-[#8ed5ff] text-[#004965] font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shrink-0 transform active:scale-95 cursor-pointer shadow-lg shadow-[#38bdf8]/10"
              >
                <Search size={14} className="stroke-[2.5px]" />
                <span>查询订单</span>
              </button>
            </div>
          </div>
        </form>

        {/* Quick suggestions tabs for high interactive fidelity */}
        {distinctiveEmails.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-[#3e484f]/25">
            <span className="text-[10px] text-[#87929a] font-bold uppercase tracking-wider block">
              快速测试邮箱 (已购买过的凭证)
            </span>
            <div className="flex flex-wrap gap-2">
              {distinctiveEmails.map((email) => (
                <button
                  key={email}
                  onClick={() => handleQuickSelectEmail(email)}
                  className="px-2.5 py-1 bg-[#131b2e] hover:bg-[#171f33] text-[10px] text-[#38bdf8] border border-[#38bdf8]/20 hover:border-[#38bdf8]/50 rounded transition-all font-mono"
                >
                  {email}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Query Results presentation */}
      {searched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {queryResults.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-xs text-[#bdc8d1] uppercase tracking-wider flex items-center gap-1.5 px-1">
                <span>查询到 {queryResults.length} 条已出码记录</span>
              </h3>
              
              {queryResults.map((order) => (
                <div 
                  key={order.id}
                  className="bg-[#171f33]/80 rounded-xl border border-[#3e484f] overflow-hidden shadow-lg transition-all hover:border-[#38bdf8]/30"
                >
                  {/* Ledger header */}
                  <div className="bg-[#131b2e] px-5 py-3 border-b border-[#3e484f]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2.5">
                      <Ticket size={16} className="text-[#38bdf8]" />
                      <span className="font-mono text-xs font-black text-slate-200">{order.id}</span>
                      <span className="text-[10px] text-[#87929a] font-mono">{order.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
                      <span className="text-[11px] font-mono font-bold text-[#87929a]">
                        单价 x 数量: ￥{order.totalPrice.toFixed(2)}
                      </span>
                      
                      <span className={`px-2 py-0.5 text-[10px] rounded font-bold ${
                        order.status === 'paid'
                          ? 'bg-[#45e3ce]/10 text-[#45e3ce] border border-[#45e3ce]/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {order.status === 'paid' ? '已发放' : '退款'}
                      </span>
                    </div>
                  </div>

                  {/* Body keys */}
                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-[#87929a]">已购规格:</span>
                      <p className="text-xs font-bold text-[#dae2fd]">{order.tierName}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#87929a] block">
                        激活卡密券码 (
                        {order.status === 'paid' ? '正常激活中' : '失效卡密'}):
                      </span>
                      
                      <div className="space-y-2">
                        {order.cardKeys.map((key, idx) => (
                          <div 
                            key={idx}
                            className={`flex justify-between items-center bg-[#0b1326] px-3.5 py-2.5 rounded border font-mono text-xs ${
                              order.status === 'paid'
                                ? 'border-[#3e484f]/60 hover:border-[#38bdf8]/40'
                                : 'border-red-500/20 opacity-40 line-through'
                            }`}
                          >
                            <span className="text-slate-300 font-bold select-all overflow-x-auto whitespace-nowrap scrollbar-none tracking-wider">
                              {key}
                            </span>
                            
                            {order.status === 'paid' && (
                              <button
                                onClick={() => handleCopy(key)}
                                className="text-[#87929a] hover:text-[#45e3ce] p-1 transition-all"
                                title="复制卡密"
                              >
                                {copiedKey === key ? (
                                  <Check size={14} className="text-[#45e3ce]" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No results visual pane
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#171f33] p-8 rounded-xl border border-[#3e484f] text-center space-y-3"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                <Inbox size={26} />
              </div>
              <h3 className="text-sm font-bold text-[#dae2fd]">未找到购买订单记录</h3>
              <p className="text-xs text-[#bdc8d1] max-w-sm mx-auto leading-relaxed">
                没有找到与邮箱 <span className="text-yellow-500 font-mono underline">{emailInput}</span> 对应的卡密关联。 
                如果您刚才进行了模拟支付，请确认填写的邮箱是否含有字母大小写偏差，或者可以在“收银台”再次发起测试。
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Helper Box */}
      <div className="bg-[#131b2e] p-5 rounded-xl border border-[#3e484f] flex gap-3.5 items-start">
        <Clock className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-[#dae2fd]">常见激活提示:</h4>
          <p className="text-xs text-[#bdc8d1] leading-relaxed">
            订单卡密属于 24 小时无人值守式智能托管运算，所有订单将在结算瞬间写入链上。如果浏览器处于网络中断或加载阻塞状态导致您没有及时获得发货屏幕，只要在此页面重新核对邮箱即可瞬间补发。
          </p>
        </div>
      </div>

    </div>
  );
}
