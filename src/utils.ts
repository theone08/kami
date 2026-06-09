/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardTier, Order, Announcement, SystemStats } from './types';

export const INITIAL_TIERS: CardTier[] = [
  {
    id: 'day',
    name: '天卡',
    description: '适合短期试用体验',
    price: 4.9,
    features: ['24小时授权时长', '完整功能解锁', '极速自动发卡', '在线技术支持'],
    durationText: '天',
    isPopular: false,
  },
  {
    id: 'month',
    name: '月卡',
    description: '高性价比之选',
    price: 9.9,
    features: ['30天授权时长', '赠送全套操作指南', '全自动下发卡密', '专属用户社群'],
    durationText: '月',
    isPopular: true,
  },
  {
    id: 'year',
    name: '年卡',
    description: '适合长期生产力',
    price: 98.0,
    features: ['365天授权时长', '优先高级技术支持', '大版本免费升级', 'VIP加速通道'],
    durationText: '年',
    isPopular: false,
  },
  {
    id: 'lifetime',
    name: '永久卡',
    description: '终身授权，无需续费',
    price: 198.0,
    features: ['永久有效授权', '尊享VIP售后群', '全平台功能不限次', '终身免费软件维护'],
    durationText: '永久',
    isPopular: false,
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: '官方公告',
    content: 'Tdone 软件 V2.0 现已发布，优化了核心算法，运行更稳定。请确保从本官方平台购买，谨防诈骗。',
    category: 'info',
    date: '2026-06-09',
  },
  {
    id: '2',
    title: '安全提示',
    content: '卡密购买后 100% 自动下发。请在软件内“个人中心”绑定并激活，不泄露给任何第三方。',
    category: 'warning',
    date: '2026-06-08',
  },
];

// Utility to generate unique card key
export function generateCardKey(tierId: string): string {
  const prefix = `TD-${tierId.toUpperCase()}`;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const chunk = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${prefix}-${chunk()}-${chunk()}-${chunk()}`;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'TD-9201',
    email: 'test-user@gmail.com',
    tierId: 'month',
    tierName: 'Tdone 标准储值卡/月卡',
    quantity: 1,
    totalPrice: 9.9,
    createdAt: '2026-06-09 14:32:10',
    status: 'paid',
    cardKeys: ['TD-MONTH-K19A-PL82-90XE'],
  },
  {
    id: 'TD-9200',
    email: 'admin-vip@qq.com',
    tierId: 'year',
    tierName: 'Tdone 尊享卡/年卡',
    quantity: 1,
    totalPrice: 99.0, // Pre-configured historical prices on sample
    createdAt: '2026-06-09 12:15:45',
    status: 'paid',
    cardKeys: ['TD-YEAR-80PX-L082-WNZQ'],
  },
  {
    id: 'TD-9199',
    email: 'learner@163.com',
    tierId: 'day',
    tierName: 'Tdone 体验卡/天卡',
    quantity: 1,
    totalPrice: 4.9,
    createdAt: '2026-06-09 11:02:18',
    status: 'paid',
    cardKeys: ['TD-DAY-Z94V-H6O0-P21A'],
  },
  {
    id: 'TD-9198',
    email: 'example@gmail.com',
    tierId: 'month',
    tierName: 'Tdone 标准储值卡/月卡',
    quantity: 1,
    totalPrice: 9.9,
    createdAt: '2026-06-08 23:50:33',
    status: 'refunded',
    cardKeys: ['TD-MONTH-EX01-REFD-VOID'],
  },
  {
    id: 'TD-9197',
    email: 'developer@outlook.com',
    tierId: 'year',
    tierName: 'Tdone 尊享卡/年卡',
    quantity: 1,
    totalPrice: 99.0,
    createdAt: '2026-06-08 21:10:02',
    status: 'paid',
    cardKeys: ['TD-YEAR-M09A-8WQX-540B'],
  },
];

const INITIAL_STATS: SystemStats = {
  dailySales: 1280.0,
  dailyPercent: 12.0,
  monthlySales: 42340.0,
  monthlyPercent: 5.2,
  yearlySales: 124500.0,
  lifetimeSales: 856420.0,
  chartData: [
    { day: 'Mon', amount: 840 },
    { day: 'Tue', amount: 960 },
    { day: 'Wed', amount: 1100 },
    { day: 'Thu', amount: 720 },
    { day: 'Fri', amount: 1250 },
    { day: 'Sat', amount: 1400 },
    { day: 'Today', amount: 1280 },
  ],
};

export function loadStoreData() {
  const storedOrders = localStorage.getItem('tdone_orders');
  const storedStats = localStorage.getItem('tdone_stats');
  const storedAnnouncements = localStorage.getItem('tdone_announcements');
  const storedTiers = localStorage.getItem('tdone_tiers');

  return {
    orders: storedOrders ? JSON.parse(storedOrders) : INITIAL_ORDERS,
    stats: storedStats ? JSON.parse(storedStats) : INITIAL_STATS,
    announcements: storedAnnouncements ? JSON.parse(storedAnnouncements) : INITIAL_ANNOUNCEMENTS,
    tiers: storedTiers ? JSON.parse(storedTiers) : INITIAL_TIERS,
  };
}

export function saveStoreData(data: {
  orders: Order[];
  stats: SystemStats;
  announcements: Announcement[];
  tiers: CardTier[];
}) {
  localStorage.setItem('tdone_orders', JSON.stringify(data.orders));
  localStorage.setItem('tdone_stats', JSON.stringify(data.stats));
  localStorage.setItem('tdone_announcements', JSON.stringify(data.announcements));
  localStorage.setItem('tdone_tiers', JSON.stringify(data.tiers));
}
