/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Check, Key, ShieldCheck, Mail } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "卡密支付后是如何即时发放给我的？",
    answer: "Tdone 发卡交易系统使用 100% 自动秒发机制。支付二维码在模拟器或微信确认付款完毕的一瞬间，服务器将立刻在当前界面刷新分配的软件激活码，同时一并生成备份发送至您订单内备注的电子邮箱中。请在下单时务必核实邮箱以免拼写错误。"
  },
  {
    question: "拿到激活卡密后应该如何绑定并启用软件？",
    answer: "很简单：1. 第一步：打开您的 Tdone 电脑/网盘客户端；2. 第二步：在 Tdone 主菜单进入 “个人中心” 的 “授权管理” 控制台；3. 第三步：将我们发放的 TONE-XXX 或 TD-XXX 字符串拷贝粘贴到授权输入框内；4. 第四步：点击 “绑定激活” 按钮。系统将瞬间完成数据链鉴权解锁高级尊贵功能！"
  },
  {
    question: "如果买错套餐或者提示卡密已经被激活该怎么办？",
    answer: "如果遇到任何技术问题或由于网路延迟造成的错误凭证：100% 官方直营为您维权！请点击页面右下角或底部，向 support@tdone.com 发送申请，并附带您的核单邮箱及付款成功的截屏资料，客服代表将在最短时间内为您替换正确的卡密或执行退款。"
  },
  {
    question: "如何确认查单与查询历史付款卡密？",
    answer: "点击顶部导航栏的 “查单” 功能菜单。在输入框中精准输入您的购买邮箱，并点击 “查询” 按钮。系统将瞬间调取本地安全离线储存中的历史全部订单，并将包含的激活码卡密完整罗列，以防忘记。"
  },
];

export default function SupportView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="text-center space-y-2 mb-4">
        <h2 className="font-sans text-xl md:text-2xl font-bold text-[#dae2fd]">官方知识库及激活支持</h2>
        <p className="text-xs text-[#bdc8d1]">帮助您解答有关卡密绑定、发货故障及多端激活中遇到的任何疑问</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Helper Badge Card 1 */}
        <div className="bg-[#171f33] p-5 rounded-xl border border-[#3e484f] space-y-2">
          <Key className="text-[#38bdf8] w-5 h-5" />
          <h4 className="font-sans text-xs font-bold text-[#dae2fd]">官方激活卡密</h4>
          <p className="text-[11px] text-[#bdc8d1] leading-relaxed">
            所有商品卡密一次一发，不重复复用，从根本上抵御重复封号或卡密漏码风险。
          </p>
        </div>

        {/* Helper Badge Card 2 */}
        <div className="bg-[#171f33] p-5 rounded-xl border border-[#3e484f] space-y-2">
          <ShieldCheck className="text-[#45e3ce] w-5 h-5 animate-pulse" />
          <h4 className="font-sans text-xs font-bold text-[#dae2fd]">系统防伪效验</h4>
          <p className="text-[11px] text-[#bdc8d1] leading-relaxed">
            自带官方核心节点动态密钥加密校验防伪层，杜绝第三方欺诈或外挂模拟激活。
          </p>
        </div>

        {/* Helper Badge Card 3 */}
        <div className="bg-[#171f33] p-5 rounded-xl border border-[#3e484f] space-y-2">
          <Mail className="text-[#bdc2ff] w-5 h-5" />
          <h4 className="font-sans text-xs font-bold text-[#dae2fd]">全自动双向派发</h4>
          <p className="text-[11px] text-[#bdc8d1] leading-relaxed">
            付款即发！屏幕直接刷新取码，后台发信至您预留邮箱防止数据由于意外失联。
          </p>
        </div>
      </div>

      {/* FAQs Section Accordion */}
      <div className="bg-[#171f33] rounded-xl border border-[#3e484f] p-6 space-y-4 shadow-xl">
        <h3 className="font-sans text-sm font-extrabold text-[#dae2fd] border-l-4 border-[#38bdf8] pl-3 flex items-center gap-1.5 pb-2 border-b border-[#3e484f]/25">
          <HelpCircle size={16} className="text-[#38bdf8]" />
          <span>常见技术问题解答 (FAQ)</span>
        </h3>

        <div className="space-y-2 divide-y divide-[#3e484f]/20">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="pt-3 first:pt-0">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-left py-2 hover:text-[#38bdf8] transition-colors focus:outline-none"
                >
                  <span className="font-sans text-xs font-bold text-slate-100">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-[#38bdf8]" />
                  ) : (
                    <ChevronDown size={14} className="text-[#87929a]" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-1 pb-2 pl-1 pr-4 bg-[#0b1326]/40 p-3 rounded-lg border border-[#3e484f]/20 transition-all">
                    <p className="text-xs text-[#bdc8d1] leading-relaxed font-sans">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Check Block */}
      <div className="bg-[#131b2e] p-5 rounded-xl border-2 border-[#38bdf8]/10 text-xs text-[#bdc8d1] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold text-[#dae2fd] flex items-center gap-1.5 text-xs text-[#38bdf8]">
            <Check size={14} className="stroke-[3px]" />
            找不到模拟购买的付款信息？
          </p>
          <p className="text-[11px] leading-relaxed">
            可以使用 “查单” 菜单获取所有的离线存单，也可以打开 “管理后台” 新建卡密进行价格更新、激活发放或点击重置模拟库，非常适合调试演示！
          </p>
        </div>
      </div>

    </div>
  );
}
