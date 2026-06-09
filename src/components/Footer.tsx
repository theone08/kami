/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewType } from '../types';
import { Mail, Headset, ShieldCheck, Scale, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#060e20] w-full py-12 border-t border-[#3e484f] mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-sans text-xl font-bold text-[#8ed5ff]">Tdone 官方店</span>
          </div>
          <p className="font-sans text-xs text-[#bdc8d1] leading-relaxed max-w-sm">
            致力于提供最高效、高稳定的自动化办公软件解决方案。7x24小时全自动发卡服务，极速响应，实时到账，保障您的数据安全与流畅体验。
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#87929a] pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#45e3ce]" />
              信誉保障
            </span>
            <span className="flex items-center gap-1">
              <Scale size={12} className="text-[#45e3ce]" />
              依法合规
            </span>
          </div>
        </div>

        {/* Navigation Quicklinks */}
        <div className="space-y-4 font-sans text-sm">
          <h4 className="font-semibold text-[#dae2fd] tracking-widest text-xs uppercase">快速链接</h4>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => onNavigate('buy')} 
              className="text-[#bdc8d1] hover:text-[#8ed5ff] text-left text-xs transition-colors underline decoration-dotted underline-offset-4"
            >
              购买全新授权卡密
            </button>
            <button 
              onClick={() => onNavigate('track')} 
              className="text-[#bdc8d1] hover:text-[#8ed5ff] text-left text-xs transition-colors underline decoration-dotted underline-offset-4"
            >
              查询历史分配卡密 (查单)
            </button>
            <button 
              onClick={() => onNavigate('support')} 
              className="text-[#bdc8d1] hover:text-[#8ed5ff] text-left text-xs transition-colors underline decoration-dotted underline-offset-4"
            >
              使用说明及激活指南
            </button>
          </div>
        </div>

        {/* Support channels */}
        <div className="space-y-4 font-sans text-sm">
          <h4 className="font-semibold text-[#dae2fd] tracking-widest text-xs uppercase">联系我们</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-[#bdc8d1]">
              <Mail size={14} className="text-[#8ed5ff]" />
              <span>support@tdone.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#bdc8d1]">
              <Headset size={14} className="text-[#8ed5ff]" />
              <span>在线客服咨询 (9:00 - 24:00)</span>
            </div>
            <p className="text-[10px] text-[#87929a] leading-tight pt-2">
              注意: 我们绝不会通过邮件或客服索要您的登录密码，请注意防范钓鱼及诈骗网站。
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 pt-6 border-t border-[#3e484f]/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#87929a]">
        <div>© 2026 Tdone 发卡与交易系统 (V2.1.2). All rights reserved.</div>
        <div>
          Powered by <span className="text-[#8ed5ff]">Kinetic Cyber Design</span>
        </div>
      </div>
    </footer>
  );
}
