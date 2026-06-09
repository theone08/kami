/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ViewType, CardTier, Order, SystemStats, Announcement } from './types';
import { loadStoreData, saveStoreData } from './utils';

// Sub-components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import BuyView from './components/BuyView';
import TrackView from './components/TrackView';
import SupportView from './components/SupportView';
import AdminView from './components/AdminView';
import AdminLoginView from './components/AdminLoginView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedTierId, setSelectedTierId] = useState<string>('month');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Load and preserve data state natively from local storage
  const [tiers, setTiers] = useState<CardTier[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    dailySales: 1280.0,
    dailyPercent: 12.0,
    monthlySales: 42340.0,
    monthlyPercent: 5.2,
    yearlySales: 124500.0,
    lifetimeSales: 856420.0,
    chartData: [],
  });

  useEffect(() => {
    const loaded = loadStoreData();
    setTiers(loaded.tiers);
    setOrders(loaded.orders);
    setAnnouncements(loaded.announcements);
    setStats(loaded.stats);
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    // Scroll smoothly to top on navigation transition
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectTier = (tierId: string) => {
    setSelectedTierId(tierId);
    handleNavigate('buy');
  };

  // Add a new order and update analytics
  const handleNewOrder = (newOrder: Order) => {
    const nextOrders = [newOrder, ...orders];
    
    // Add to chart trend and total sale figures
    const nextStats = {
      ...stats,
      dailySales: stats.dailySales + newOrder.totalPrice,
      monthlySales: stats.monthlySales + newOrder.totalPrice,
      yearlySales: stats.yearlySales + newOrder.totalPrice,
      lifetimeSales: stats.lifetimeSales + newOrder.totalPrice,
      chartData: stats.chartData.map(d => {
        if (d.day === 'Today') {
          return { ...d, amount: d.amount + Math.floor(newOrder.totalPrice) };
        }
        return d;
      })
    };

    setOrders(nextOrders);
    setStats(nextStats);
    
    // Save state
    saveStoreData({
      tiers,
      orders: nextOrders,
      announcements,
      stats: nextStats
    });
  };

  // Trigger simulated refund
  const handleTriggerRefund = (orderId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const nextOrders = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'refunded' as const };
      }
      return o;
    });

    const refundAmount = targetOrder.totalPrice;
    const nextStats = {
      ...stats,
      dailySales: Math.max(0, stats.dailySales - refundAmount),
      monthlySales: Math.max(0, stats.monthlySales - refundAmount),
      yearlySales: Math.max(0, stats.yearlySales - refundAmount),
      lifetimeSales: Math.max(0, stats.lifetimeSales - refundAmount),
      chartData: stats.chartData.map(d => {
        if (d.day === 'Today') {
          return { ...d, amount: Math.max(0, d.amount - Math.floor(refundAmount)) };
        }
        return d;
      })
    };

    setOrders(nextOrders);
    setStats(nextStats);

    saveStoreData({
      tiers,
      orders: nextOrders,
      announcements,
      stats: nextStats
    });

    alert(`订单 #${orderId} 模拟退款操作已成功执行，销售金额已被安全扣减！`);
  };

  // Save updated tiers configurations (pricing)
  const handleModifyTiers = (updatedTiers: CardTier[]) => {
    setTiers(updatedTiers);
    saveStoreData({
      tiers: updatedTiers,
      orders,
      announcements,
      stats
    });
  };

  const handleExportReports = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["订单号,邮箱,套餐名,实付费,时间,状态"].join(",") + "\n"
      + orders.map(o => `${o.id},${o.email},${o.tierName},¥${o.totalPrice.toFixed(2)},${o.createdAt},${o.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Tdone_Transactions_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans min-h-screen flex flex-col selection:bg-[#38bdf8] selection:text-[#001e2c]">
      
      {/* Universal navigation bar */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
      />

      {/* Main presentation canvas */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {currentView === 'home' && (
          <HomeView 
            tiers={tiers}
            announcements={announcements}
            onSelectTier={handleSelectTier}
            onNavigate={(view) => handleNavigate(view)}
          />
        )}

        {currentView === 'buy' && (
          <BuyView 
            tiers={tiers}
            selectedTierId={selectedTierId}
            onSelectTier={setSelectedTierId}
            onNewOrder={handleNewOrder}
          />
        )}

        {currentView === 'track' && (
          <TrackView 
            orders={orders}
          />
        )}

        {currentView === 'support' && (
          <SupportView />
        )}

        {currentView === 'admin' && (
          isAdminAuthenticated ? (
            <AdminView 
              tiers={tiers}
              orders={orders}
              stats={stats}
              onModifyTiers={handleModifyTiers}
              onUpdateOrders={setOrders}
              onTriggerRefund={handleTriggerRefund}
              onExportReports={handleExportReports}
            />
          ) : (
            <AdminLoginView onLoginSuccess={() => setIsAdminAuthenticated(true)} />
          )
        )}
      </main>

      {/* Universal footer bar */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

