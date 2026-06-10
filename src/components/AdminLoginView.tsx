/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Key, AlertTriangle, Eye, EyeOff, Lock } from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
}

export default function AdminLoginView({ onLoginSuccess }: AdminLoginViewProps) {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorText('请输入管理员登入密码！');
      return;
    }

    setIsSubmitting(true);
    setErrorText('');

    // Simulate server side verification delay
    setTimeout(() => {
      // Set default high-security password to '19980828Td.'
      if (password === '19980828Td.') {
        onLoginSuccess();
      } else {
        setErrorText('密码校验错误！请输入官方预置管理员密码');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#171f33] border border-[#3e484f] rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Futuristic background decoration elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#38bdf8]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#45e3ce]/5 rounded-full blur-xl"></div>

        {/* Security Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <Lock size={24} className="animate-pulse" />
          </div>
          <div>
            <h2 className="font-sans text-lg font-black text-[#dae2fd] tracking-wide">安全管理后台校验</h2>
            <p className="text-xs text-[#87929a] mt-1">进入Tdone分发台业务流需要密码校验</p>
          </div>
        </div>

        {/* Dynamic warning box displaying the default master key */}
        <div className="bg-[#38bdf8]/5 border border-[#38bdf8]/20 p-4 rounded-xl text-xs text-[#bdc8d1] mb-6 space-y-1">
          <p className="font-bold text-[#38bdf8] flex items-center gap-1">
            <ShieldCheck size={14} />
            演示授权凭证提示:
          </p>
          <p className="leading-relaxed">
            默认管理员安全登录主密码已置为：
            <span className="text-[#45e3ce] font-bold font-mono px-1.5 py-0.5 bg-[#45e3ce]/10 rounded ml-1 select-all">
              19980828Td.
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="admin-password-field" className="block text-xs font-bold text-[#bdc8d1]">
              管理员安全密码
            </label>
            <div className="relative">
              <Key size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#38bdf8]" />
              <input
                id="admin-password-field"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码 19980828Td."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-10 py-3 bg-[#0b1326] border border-[#3e484f] rounded-lg text-xs focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none text-[#dae2fd] placeholder-[#87929a] transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#87929a] hover:text-[#dae2fd] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Validation Errors representation */}
          {errorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-400"
            >
              <AlertTriangle size={14} className="shrink-0" />
              <span>{errorText}</span>
            </motion.div>
          )}

          {/* Verification CTA Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#38bdf8] hover:bg-[#8ed5ff] text-[#004965] font-sans text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#38bdf8]/10 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#004965] border-t-transparent rounded-full animate-spin"></span>
                <span>正在校验授权规则...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={14} className="stroke-[2.5px]" />
                <span>安全解密后台进入</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-[#87929a] font-mono select-none">
            IP Access Security Control Panel v2.1.2
          </p>
        </div>
      </motion.div>
    </div>
  );
}
