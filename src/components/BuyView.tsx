/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardTier, Order } from '../types';
import { generateCardKey } from '../utils';
import { 
  ShieldCheck, Bolt, Info, Rocket, RefreshCw, CheckCircle2, Mail, 
  Minus, Plus, ShoppingBag, CreditCard, Copy, Check, QrCode, AlertTriangle 
} from 'lucide-react';

interface BuyViewProps {
  tiers: CardTier[];
  selectedTierId: string;
  onSelectTier: (tierId: string) => void;
  onNewOrder: (order: Order) => void;
}

export default function BuyView({ tiers, selectedTierId, onSelectTier, onNewOrder }: BuyViewProps) {
  const currentTier = tiers.find(t => t.id === selectedTierId) || tiers[0];
  
  const [quantity, setQuantity] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [isProcessingPay, setIsProcessingPay] = useState<boolean>(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [errorText, setErrorText] = useState<string>('');

  const handleQtyChange = (val: number) => {
    const next = quantity + val;
    if (next >= 1 && next <= 99) {
      setQuantity(next);
    }
  };

  const handleSubmittingOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorText('请输入有效的邮箱地址，用于收取卡密备份！');
      return;
    }
    setErrorText('');
    setShowPaymentModal(true);
  };

  // Triggered when payment succeeds
  const executeSimulatedPayment = () => {
    setIsProcessingPay(true);
    setErrorText('');
    
    setTimeout(() => {
      // Create order keys
      const generatedKeys: string[] = [];
      for (let i = 0; i < quantity; i++) {
        generatedKeys.push(generateCardKey(currentTier.id));
      }

      const now = new Date();
      const formatTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const finalOrder: Order = {
        id: `TD-${Math.floor(9202 + Math.random() * 5000)}`,
        email: email,
        tierId: currentTier.id,
        tierName: `Tdone 官方授权 / ${currentTier.name}`,
        quantity: quantity,
        totalPrice: currentTier.price * quantity,
        createdAt: formatTime,
        status: 'paid',
        cardKeys: generatedKeys
      };

      onNewOrder(finalOrder);
      setSuccessOrder(finalOrder);
      setIsProcessingPay(false);
      setShowPaymentModal(false);
    }, 1500);
  };

  const executeCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetOrderFlow = () => {
    setSuccessOrder(null);
    setQuantity(1);
    setEmail('');
  };

  return (
    <div className="space-y-6">
      
      {/* If Purchase succeeded, render Invoice receipt screen */}
      {successOrder ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-[#171f33] p-8 rounded-xl border-2 border-[#45e3ce] shadow-[0_0_25px_rgba(69,227,206,0.15)] relative overflow-hidden"
        >
          {/* Accent light element */}
          <div className="absolute right-0 top-0 w-24 h-24 bg-[#45e3ce]/10 rounded-full blur-xl"></div>
          
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#45e3ce]/10 flex items-center justify-center text-[#45e3ce]">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="font-sans text-xl font-bold text-[#dae2fd]">交易已完成，卡密已分发！</h2>
            <p className="text-xs text-[#bdc8d1]/95 text-center">
              订单编号: <span className="font-mono text-[#45e3ce] font-bold">{successOrder.id}</span> | 已备份分发至: <span className="text-slate-200 underline">{successOrder.email}</span>
            </p>
          </div>

          {/* CD-key listing layout */}
          <div className="space-y-4">
            <div className="bg-[#0b1326] p-4 rounded-lg border border-[#3e484f]/60 space-y-2">
              <span className="text-[10px] text-[#87929a] uppercase tracking-widest block font-bold">
                我的 Tdone 激活卡密 ({successOrder.cardKeys.length} 张)
              </span>
              
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {successOrder.cardKeys.map((key, kIndex) => (
                  <div 
                    key={kIndex}
                    className="flex justify-between items-center bg-[#171f33] px-3 py-2 rounded border border-[#3e484f]/40 hover:border-[#38bdf8]/40 transition-all font-mono text-xs"
                  >
                    <span className="text-[#38bdf8] select-all tracking-wider font-bold">{key}</span>
                    <button
                      onClick={() => executeCopyText(key, kIndex)}
                      className="text-[#bdc8d1] hover:text-[#45e3ce] transition-colors p-1"
                      title="复制到剪贴板"
                    >
                      {copiedIndex === kIndex ? (
                        <Check size={14} className="text-[#45e3ce]" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick installation guideline */}
            <div className="bg-[#131b2e] p-4 rounded-lg border border-yellow-500/20 text-xs text-[#bdc8d1] space-y-2">
              <span className="font-bold flex items-center gap-1.5 text-yellow-500">
                <Info size={14} />
                安全激活指导:
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                <li>复制上方卡密并开启 Tdone 客户端程序进行绑定。</li>
                <li>进入软件“个人中心”/“授权设置”，将激活码输入完成后点击“立即激活”。</li>
                <li>如有异常，可至 <span className="text-[#38bdf8] font-semibold cursor-pointer underline">查单菜单</span> 随时调取分配卡密。</li>
              </ol>
            </div>

            <div className="pt-4 flex justify-between items-center gap-4">
              <button
                onClick={resetOrderFlow}
                className="flex-grow py-2.5 bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/35 hover:bg-[#38bdf8]/20 transition-all font-bold text-xs rounded-lg text-center cursor-pointer"
              >
                购买其他套餐
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Regular buying details screen layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Product overview & guide details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Holographic Product Hero info card */}
            <div className="bg-[#171f33] rounded-xl overflow-hidden shadow-xl border border-[#3e484f] p-6 lg:p-8 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-48 md:h-48 rounded-lg overflow-hidden flex-shrink-0 bg-[#222a3d] border border-[#3e484f] relative group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhet3F0yJlXyUa60rALWpSCQEBlEnPzkpG0heN6D9apGVdJFHgkyvZKNoGVtE41d_cMHmbsBUiwuZIRYjdYNkR2p96P2UbNTdmFGt2tgpDW9X-YGVQmKyvmOxKU7snTXQUabKw_KYar4KJ6YSaRdz35Ff07TZh3wD8wZXH9bppTFLOqdCotlKXqE_nH5UIsbO9rWKoZEXHF28hk8plhhKqYjN3QZF8ITPBGNLF6laE3mrLMqrOTLVxNQgY1whQTDYe6JWrNQ_rH8Eu" 
                  alt="Tdone software premium key authorization holographic card" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-103"
                />
              </div>
              
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="font-sans text-xl md:text-2xl font-bold text-[#dae2fd]">
                      Tdone 软件授权卡密
                    </h1>
                    <span className="px-3 py-0.5 bg-[#45e3ce]/20 text-[#45e3ce] text-[10px] rounded-full font-black tracking-widest border border-[#45e3ce]/30 bg-opacity-70 animate-pulse">
                      现货秒发
                    </span>
                  </div>
                  <p className="text-xs text-[#bdc8d1] leading-relaxed mb-4">
                    高效、高稳定的 Tdone 自动化控制软件官方正版授权码。系统全天候不间断在线，秒级计算下发。支持局域网、因特网授权，尊享专业工程师客服团队长效系统维护。
                  </p>
                </div>

                <div className="flex gap-4 border-t border-[#3e484f]/40 pt-3 text-[11px] text-[#38bdf8]">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck size={14} className="stroke-[2.5px]" />
                    <span>正品授权保障</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Bolt size={14} className="stroke-[2.5px]" />
                    <span>极速即时出码</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid for detailed documentation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Guide instruction steps */}
              <div className="bg-[#131b2e] rounded-xl p-5 border border-[#3e484f] space-y-3">
                <h3 className="font-sans font-bold text-sm text-[#dae2fd] flex items-center gap-2">
                  <Info className="text-[#38bdf8] w-4.5 h-4.5" />
                  <span>卡密激活流程</span>
                </h3>
                
                <ul className="space-y-3 text-xs text-[#bdc8d1]/90">
                  <li className="flex gap-2">
                    <span className="font-bold text-[#38bdf8]">01.</span>
                    <span>支付成功后，您选择的授权卡密将即刻显示在屏幕上。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#38bdf8]">02.</span>
                    <span>打开并运行 Tdone 软件客户端，进入“个人中心”页面。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-[#38bdf8]">03.</span>
                    <span>复制获取的卡密至输入框中，并点击“绑定激活”即可解锁功能。</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: Premium features overview */}
              <div className="bg-[#171f33]/30 border border-[#38bdf8]/20 rounded-xl p-5 flex flex-col justify-center gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#38bdf8]/15 p-1.5 rounded-lg border border-[#38bdf8]/35 text-[#38bdf8]">
                    <Rocket size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-[#38bdf8]">全功能终身解锁</p>
                    <p className="text-[11px] text-[#bdc8d1] leading-relaxed mt-0.5">
                      通过合法卡密激活后，即可享受系统所有付费高级功能，全天候不限算力限制，无限制多开。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#38bdf8]/15 p-1.5 rounded-lg border border-[#38bdf8]/35 text-[#38bdf8]">
                    <RefreshCw size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-[#38bdf8]">终身免费补丁更新</p>
                    <p className="text-[11px] text-[#bdc8d1] leading-relaxed mt-0.5">
                      您购买的高级套餐包含长效的技术售后更新与大版本更迭支持，时刻适配您的办公环境。
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Checkout Config Form */}
          <div className="lg:col-span-5">
            <div className="bg-[#171f33] rounded-xl border border-[#3e484f] p-6 shadow-2xl relative">
              <div className="absolute right-3 top-3 text-[10px] text-[#38bdf8] font-bold tracking-widest bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">
                SECURE PLATFORM
              </div>
              
              <h2 className="font-sans text-base font-bold text-[#dae2fd] mb-6 flex items-center gap-2">
                <ShoppingBag className="text-[#38bdf8] w-4.5 h-4.5" />
                <span>一键收银台 / 订单规格</span>
              </h2>

              <form onSubmit={handleSubmittingOrder} className="space-y-5">
                
                {/* Product plan selection */}
                <div>
                  <label className="block text-xs font-bold text-[#bdc8d1] mb-2">
                    第一步: 选择授权套餐周期
                  </label>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    {tiers.map((t) => {
                      const isSelected = t.id === selectedTierId;
                      return (
                        <div key={t.id} className="relative">
                          <input 
                            type="radio" 
                            name="tier-choice"
                            id={`tier-radio-${t.id}`}
                            checked={isSelected}
                            onChange={() => onSelectTier(t.id)}
                            className="absolute opacity-0 pointer-events-none"
                          />
                          <label 
                            htmlFor={`tier-radio-${t.id}`}
                            className={`block p-3 border rounded-lg text-center cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#38bdf8] bg-[#38bdf8]/10 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                                : 'border-[#3e484f] bg-[#0b1326] hover:border-[#38bdf8]/55 hover:bg-[#171f33]'
                            }`}
                          >
                            <p className="font-sans text-xs font-bold text-[#dae2fd]">{t.name}</p>
                            <p className="text-xs text-[#38bdf8] font-mono mt-0.5 font-bold">￥{t.price.toFixed(1)}</p>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity selector */}
                <div>
                  <label className="block text-xs font-bold text-[#bdc8d1] mb-2">
                    第二步: 购买数量
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#3e484f] rounded-lg overflow-hidden bg-[#0b1326]">
                      <button 
                        type="button"
                        onClick={() => handleQtyChange(-1)}
                        className="px-3.5 py-2 hover:bg-[#171f33] text-[#38bdf8] transition-colors outline-none cursor-pointer"
                        title="减少购入单数"
                      >
                        <Minus size={13} className="stroke-[3px]" />
                      </button>
                      
                      <input 
                        type="number"
                        className="w-12 text-center border-none bg-transparent outline-none focus:ring-0 text-xs font-black text-[#dae2fd]"
                        value={quantity}
                        min={1}
                        max={99}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val >= 1 && val <= 99) setQuantity(val);
                        }}
                      />

                      <button 
                        type="button"
                        onClick={() => handleQtyChange(1)}
                        className="px-3.5 py-2 hover:bg-[#171f33] text-[#38bdf8] transition-colors outline-none cursor-pointer"
                        title="增加购入单数"
                      >
                        <Plus size={13} className="stroke-[3px]" />
                      </button>
                    </div>

                    <span className="text-[11px] text-[#87929a] font-mono">
                      实时库存: <span className="text-[#45e3ce] font-bold">999+ 张现货</span>
                    </span>
                  </div>
                </div>

                {/* Email container */}
                <div>
                  <label htmlFor="user-email-input" className="block text-xs font-bold text-[#bdc8d1] mb-2">
                    第三步: 接收邮箱 / 查单凭证
                  </label>
                  
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#38bdf8]" />
                    <input 
                      id="user-email-input"
                      type="email" 
                      placeholder="example@gmail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#0b1326] border border-[#3e484f] rounded-lg font-sans text-xs focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none text-[#dae2fd] placeholder-[#87929a] transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-[#38bdf8]/85 mt-1.5 italic leading-snug">
                    * 支付成功后卡密将发往该邮箱备份，并将其作为查单唯一核查依据。
                  </p>
                </div>

                {/* Payment channel selector (WeChat Pay focus) */}
                <div>
                  <label className="block text-xs font-bold text-[#bdc8d1] mb-2">
                    第四步: 支付渠道
                  </label>
                  
                  <div className="relative border-2 border-[#38bdf8] rounded-xl p-3.5 bg-[#38bdf8]/5 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMHAA-zQSSupmfkPgAGeLqbR0RD_8SCoM63-uGJs5Wkj1aIKefCv-PmyqPLAwlgff-7K0P8-BGRdgrIJ_M_qYU9YaL6J3TOu3oGbWug3VLfkNxxZWtunh5db80eJIUuBGCKFU-c9XTVRzrPL0F3dHPeZZZMwboliBUluMigkQF4fAwpFauTXwFhrwjULT5K4sQ7qFSvoKWmmb5tXv8XoRPLA7FsFTIGNlIUaGMuO4KBIlZSAvLmIbn-OlHA24BNiqlH6hZUxQ0adIW" 
                          alt="WeChat Payment dynamic QR icon representation" 
                          referrerPolicy="no-referrer"
                          className="w-6 h-auto"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-xs font-bold text-[#dae2fd]">微信安全极速支付</span>
                        <span className="text-[9px] text-[#87929a] font-mono leading-none">Instant WeChat Pay</span>
                      </div>
                    </div>

                    <span className="text-[#38bdf8]">
                      <CheckCircle2 size={16} className="fill-[#38bdf8]/10" />
                    </span>
                  </div>
                </div>

                {/* Global error text notice info */}
                {errorText && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-400">
                    <AlertTriangle size={14} className="shrink-0" />
                    <span>{errorText}</span>
                  </div>
                )}

                {/* Pricing summary section and immediate action check */}
                <div className="pt-4 border-t border-[#3e484f]/40 space-y-4">
                  <div className="flex justify-between items-center bg-[#0b1326]/40 p-3 rounded-lg border border-[#3e484f]/30">
                    <span className="text-xs text-[#bdc8d1]/90">应付总额:</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xs text-[#38bdf8] font-bold">￥</span>
                      <span className="text-xl font-bold font-sans text-[#38bdf8]">
                        {(currentTier.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#38bdf8] text-[#004965] font-sans text-sm font-black rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#38bdf8]/20 cursor-pointer"
                  >
                    <CreditCard size={16} />
                    <span>立即支付</span>
                  </button>
                </div>

              </form>

              {/* Secure Trust Badges underneath checkouts */}
              <div className="mt-6 flex justify-around items-center border-t border-[#3e484f]/30 pt-4 opacity-50 select-none grayscale hover:grayscale-0 transition-all duration-300">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBiUGDI5HAtrdlXOl0E31aczCxegaxmzs3SU6RveeE8Rp5YT46APTwes_RzleuPh4eDAAX9Cqp2puMM958Yzo7-NOyw8-EdtfTwroQcBBsy-xMQFXcacYtx9F6myJ6zJXeUsFdJQ0DBL2aoyZhzee3QKmj0DnT5PtR8s6GukMEld3sv-KEdgLs1HjkNJ-qbCkcNXcwSaMunIvlUgPr_6pWa4jO1UuLZamT4NxnnFwsfhoTZF_mJGUevYrfBTW7c1AA68fHDhE6uztn" 
                  alt="PCI Security Compliance Icon Representation" 
                  referrerPolicy="no-referrer"
                  className="h-4 w-auto"
                />
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj07_WV8NrfACIB4jFkWMhyL_IHCZKzby0A9lehdfk_u2WZ7IIv4dKuxjSy4KYMKyhfiLdHq8mzu9RAJITC-gFnoYRM3NquGu9P-SSlqiqlRVq_vzOBQ8-sl-GO3bM1a0TAXHHE-Jx6o_Nh495IjYlz7yDMDhgU0Otjgv8n1gr7BY5j_VJcTSBKkcIVVHAEpCGGLX8Lj2j3q6MX0dZDUQnY3_drfrZplC1dZoCew1YF_3LNhJPA6zX0kkYt6kmAGA06JiDG0jsaVFX" 
                  alt="Norton Security Seal Representation" 
                  referrerPolicy="no-referrer"
                  className="h-4 w-auto"
                />
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH3WNFbYHHeLfBEdnDr6RYopbjoOWSTZlpZAddUwSir88J-j07CKy5DBksRUngKsS2FNBSIl7khFn3ZWmmrd1Vu1FF_vhU79OYzft11jzRTWM2FFU-yPdjnKkCkCLCnGEXIRMhmHwodUbI1pEHybqsNU8hHSoWIalxi-XGB8iSiTJvqOV4MMmyuHILcC7dxwpReLdPNFsd6wiJPplet1V9ZbWjmjFcKQaymx7L4JDusGRQpBjZjxeaODvct7qZLB_zTITk5OkFjlmf" 
                  alt="Secure Card Processing Logo Seal Representation" 
                  referrerPolicy="no-referrer"
                  className="h-4 w-auto"
                />
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Payment Processing/Simulation Portal Modal Overlay */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal glass background backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isProcessingPay) setShowPaymentModal(false); }}
              className="absolute inset-0 bg-black"
            ></motion.div>

            {/* Modal main modal panel */}
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-sm bg-[#171f33] rounded-xl border border-[#3e484f] p-6 text-center space-y-6 shadow-2xl z-10"
            >
              
              {/* Core header info */}
              <div className="space-y-1.5 pb-2 border-b border-[#3e484f]/50">
                <span className="text-[#38bdf8] text-[10px] font-bold uppercase tracking-widest font-mono">
                  WECHAT PAY SIMULATION
                </span>
                
                <h3 className="text-[#dae2fd] text-sm font-extrabold flex justify-center items-center gap-2">
                  <QrCode size={16} className="text-emerald-400" />
                  <span>使用微信扫描二维码进行支付</span>
                </h3>
              </div>

              {/* Dynamic Invoice details */}
              <div className="bg-[#0b1326] p-3 rounded-lg text-left text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#87929a]">商品名:</span>
                  <span className="text-slate-200">{currentTier.name} 授权发卡 ({quantity}张)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87929a]">金额:</span>
                  <span className="text-[#38bdf8] font-bold">￥{(currentTier.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87929a]">通知账户:</span>
                  <span className="text-slate-300 truncate max-w-[120px]" title={email}>{email}</span>
                </div>
              </div>

              {/* QR Code Graphic placeholder visual representation */}
              <div className="relative mx-auto w-40 h-40 bg-white p-3.5 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/10 opacity-70 flex flex-col justify-center items-center font-mono font-bold text-slate-800 text-[10px] p-2 leading-tight">
                  <div className="text-[#131e8c]">Tdone SECURE</div>
                  <div className="text-[14px] text-[#000767]">￥{(currentTier.price * quantity).toFixed(2)}</div>
                  <div className="text-[#131e8c] mt-2 underline">MOCK CHANNEL</div>
                </div>
                
                {/* Generative QR visual style box */}
                <span className="text-emerald-500 absolute bottom-3 text-[10px] font-sans">
                  * 仿真对接专用
                </span>
              </div>

              <p className="text-[10px] text-[#bdc8d1]/90">
                这是卡密交易所的 **支付沙盒仿真环境**。点击下方绿色按钮模拟成功支付后系统会自动同步生成卡密并发货。
              </p>

              {/* Payment simulation trigger buttons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={executeSimulatedPayment}
                  disabled={isProcessingPay}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isProcessingPay ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                      <span>正在模拟出单中...</span>
                    </>
                  ) : (
                    <span> 模拟确认支付 ￥{(currentTier.price * quantity).toFixed(2)}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessingPay}
                  className="w-full py-2 bg-transparent text-[#bdc8d1] hover:text-white transition-all text-xs font-medium cursor-pointer"
                >
                  取消模拟交易
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
