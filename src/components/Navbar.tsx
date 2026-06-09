/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewType } from '../types';
import { Home, ShoppingBag, Search, HelpCircle, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  return (
    <header className="w-full h-16 bg-[#131b2e] border-b border-[#3e484f] sticky top-0 z-50 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-full">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-sans text-2xl font-black text-[#8ed5ff] tracking-tight transition-transform duration-300 group-hover:scale-105">
              Tdone
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#45e3ce]/10 text-[#45e3ce] text-[10px] uppercase font-mono rounded tracking-widest border border-[#45e3ce]/20">
              Official
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-4 md:gap-6 font-sans text-sm">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 ${
                currentView === 'home'
                  ? 'text-[#8ed5ff] bg-[#8ed5ff]/10 font-medium'
                  : 'text-[#bdc8d1] hover:text-[#8ed5ff] hover:bg-[#171f33]'
              }`}
            >
              <Home size={15} />
              <span className="hidden xs:inline">首页</span>
            </button>

            <button
              onClick={() => onNavigate('buy')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 ${
                currentView === 'buy'
                  ? 'text-[#8ed5ff] bg-[#8ed5ff]/10 font-medium'
                  : 'text-[#bdc8d1] hover:text-[#8ed5ff] hover:bg-[#171f33]'
              }`}
            >
              <ShoppingBag size={15} />
              <span>全部商品</span>
            </button>

            <button
              onClick={() => onNavigate('track')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 ${
                currentView === 'track'
                  ? 'text-[#8ed5ff] bg-[#8ed5ff]/10 font-medium'
                  : 'text-[#bdc8d1] hover:text-[#8ed5ff] hover:bg-[#171f33]'
              }`}
            >
              <Search size={15} />
              <span>查单</span>
            </button>

            <button
              onClick={() => onNavigate('support')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 ${
                currentView === 'support'
                  ? 'text-[#8ed5ff] bg-[#8ed5ff]/10 font-medium'
                  : 'text-[#bdc8d1] hover:text-[#8ed5ff] hover:bg-[#171f33]'
              }`}
            >
              <HelpCircle size={15} />
              <span className="hidden sm:inline">支持</span>
            </button>
          </div>
        </div>

        {/* Action controls / Backoffice access */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
              currentView === 'admin'
                ? 'bg-[#38bdf8] text-[#000767] border-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/5 hover:bg-[#38bdf8]/15 hover:border-[#38bdf8]'
            }`}
          >
            <ShieldAlert size={14} />
            <span>管理后台</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
