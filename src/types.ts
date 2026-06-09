/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewType = 'home' | 'buy' | 'track' | 'admin' | 'support';

export interface CardTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  durationText: string;
  isPopular?: boolean;
}

export interface Order {
  id: string; // e.g., TD-9201
  email: string;
  tierId: string;
  tierName: string;
  quantity: number;
  totalPrice: number;
  createdAt: string; // YYYY-MM-DD HH:mm:ss
  status: 'paid' | 'refunded';
  cardKeys: string[];
}

export interface SystemStats {
  dailySales: number;
  dailyPercent: number;
  monthlySales: number;
  monthlyPercent: number;
  yearlySales: number;
  lifetimeSales: number;
  chartData: { day: string; amount: number }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}
