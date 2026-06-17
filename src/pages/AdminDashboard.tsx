import { useState, useMemo } from "react";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { cn, formatPrice } from "@/src/lib/utils";
import { motion } from "motion/react";
import { useProductStore } from "@/src/store/useProductStore";
import { useOrderStore } from "@/src/store/useOrderStore";
import { AdminProducts } from "@/src/components/admin/AdminProducts";
import { AdminOrders } from "@/src/components/admin/AdminOrders";

import { TourGuide } from "@/src/components/TourGuide";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const { products } = useProductStore();
  const { orders } = useOrderStore();

  const totalRevenue = useMemo(() => {
    return orders.filter(o => o.status === "Delivered" || o.status === "Processing" || o.status === "Shipped").reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  const lowStockCount = useMemo(() => {
    return products.filter(p => p.stock && p.stock < 10).length;
  }, [products]);

  const stats = [
    { name: "Total Revenue", value: formatPrice(totalRevenue), change: "+12.5%", trending: "up", icon: TrendingUp },
    { name: "Total Orders", value: orders.length.toString(), change: "+5.2%", trending: "up", icon: ShoppingCart },
    { name: "Active Products", value: products.length.toString(), change: "+2", trending: "up", icon: Package },
    { name: "Low Stock Items", value: lowStockCount.toString(), change: "Alert", trending: "none", icon: AlertCircle },
  ];

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, id: "tour-sidebar-dashboard" },
    { name: "Products", icon: Package, id: "tour-sidebar-products" },
    { name: "Orders", icon: ShoppingCart, id: "tour-sidebar-orders" },
    { name: "Customers", icon: Users, id: "tour-sidebar-customers" },
    { name: "Settings", icon: Settings, id: "tour-sidebar-settings" },
  ];

  const recentOrders = orders.slice(0, 4);

  const adminDashboardSteps = [
    {
      target: "body",
      content: "Welcome to your Admin Dashboard! Let's take a quick tour to see how you can manage your store.",
      placement: "center" as const,
      disableBeacon: true,
    },
    {
      target: "#tour-sidebar-products",
      content: "Click here to add, edit, or delete your products. Changes will instantly update your website!",
    },
    {
      target: "#tour-sidebar-orders",
      content: "View your recent orders and update their delivery status here.",
    },
    {
      target: "#tour-stats-grid",
      content: "These stats give you a real-time overview of your store's performance, including revenue and stock levels.",
    },
    {
      target: "#tour-inventory-alerts",
      content: "Keep an eye on this section! We'll alert you here when products are running low on stock.",
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {activeTab === "Dashboard" && <TourGuide steps={adminDashboardSteps} tourKey="admin_dashboard" />}
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[#1f1f1f] p-6 flex flex-col gap-8 bg-[#111]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-display font-extrabold tracking-tighter text-white">
            ADMIN <span className="text-[#a3e635]">PANEL</span>
          </span>
        </div>

        <nav className="flex-grow flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              id={item.id}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                activeTab === item.name 
                  ? "bg-[#a3e635] text-black shadow-lg shadow-[#a3e635]/20" 
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold uppercase tracking-widest text-[10px] hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto pt-6 md:pt-10 flex flex-col max-h-screen">
        <header className="flex justify-between items-center mb-10 shrink-0">
          <div>
            <h1 className="text-3xl font-display font-black uppercase text-white">{activeTab} <span className="text-[#a3e635] italic">{activeTab === "Dashboard" ? "Overview" : "Management"}</span></h1>
            <p className="text-gray-500 text-xs font-medium mt-1">Welcome back, Admin Abdullah.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#a3e635] text-black px-6 h-12 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl shadow-[#a3e635]/10">
              Download Report
            </button>
          </div>
        </header>

        <div className="flex-grow overflow-hidden relative">
          {activeTab === "Products" && <AdminProducts />}
          {activeTab === "Orders" && <AdminOrders />}
          {activeTab === "Dashboard" && (
            <div className="overflow-y-auto h-full pr-2 custom-scrollbar">
              {/* Stats Grid */}
              <div id="tour-stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#111] border border-[#1f1f1f] p-6 rounded-2xl relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-3 rounded-xl text-[#a3e635] group-hover:scale-110 transition-transform">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-black leading-none",
                        stat.trending === "up" ? "text-green-500" : stat.trending === "down" ? "text-red-500" : "text-gray-600"
                      )}>
                        {stat.trending === "up" && <ArrowUpRight className="w-3 h-3" />}
                        {stat.trending === "down" && <ArrowDownRight className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-1">{stat.name}</p>
                    <h3 className="text-2xl font-display font-black text-white">{stat.value}</h3>
                    <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                      <stat.icon className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Lower Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-[#111] border border-[#1f1f1f] rounded-3xl p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-display font-black uppercase tracking-widest text-white flex items-center gap-2">
                      Recent Orders <Clock className="w-5 h-5 text-[#a3e635]" />
                    </h3>
                    <button onClick={() => setActiveTab("Orders")} className="text-[10px] font-black uppercase tracking-widest text-[#a3e635] hover:underline">View All</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#1f1f1f] text-gray-600 text-[10px] uppercase tracking-widest font-black">
                          <th className="pb-4">Order ID</th>
                          <th className="pb-4">Customer</th>
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-[#1f1f1f] hover:bg-[#0a0a0a] transition-colors group">
                            <td className="py-4 font-mono font-bold text-[#a3e635]">{order.id}</td>
                            <td className="py-4 font-bold text-white/80">{order.customer}</td>
                            <td className="py-4 text-gray-500 font-medium">{order.date}</td>
                            <td className="py-4">
                              <span className={cn(
                                "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                order.status === "Delivered" ? "bg-green-500/10 text-green-500" :
                                order.status === "Processing" ? "bg-blue-500/10 text-blue-500" : 
                                order.status === "Cancelled" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                              )}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 text-right font-black text-white">{formatPrice(order.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions / Alerts */}
                <div className="space-y-6">
                  <div id="tour-inventory-alerts" className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8">
                    <h3 className="text-xl font-display font-black uppercase tracking-widest text-white mb-6">Inventory Alerts</h3>
                    <div className="space-y-4">
                      {products.filter(p => p.stock && p.stock < 10).slice(0, 2).map((product, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                          <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                          <div>
                            <h4 className="font-bold text-sm text-white line-clamp-1">Low Stock: {product.name}</h4>
                            <p className="text-[10px] text-gray-500 font-medium">Only {product.stock} units remaining.</p>
                          </div>
                        </div>
                      ))}
                      {products.filter(p => p.stock && p.stock < 10).length === 0 && (
                         <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                           <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                           <div>
                             <h4 className="font-bold text-sm text-white">Stock Optimal</h4>
                             <p className="text-[10px] text-gray-500 font-medium">No low stock items detected.</p>
                           </div>
                         </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 bg-gradient-to-br from-[#a3e635]/5 to-transparent">
                    <h3 className="text-xl font-display font-black uppercase tracking-widest text-white mb-4">System Health</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Database Sync Online</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">API Gateway Stable</span>
                    </div>
                    <button className="w-full mt-8 bg-[#0a0a0a] border border-[#1f1f1f] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#a3e635] hover:bg-[#a3e635] hover:text-black transition-all">
                      Run Diagnostic
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Customers" && <div className="text-center text-gray-500 mt-20">Customers Module Coming Soon</div>}
          {activeTab === "Settings" && <div className="text-center text-gray-500 mt-20">Settings Module Coming Soon</div>}
        </div>
      </div>
    </div>
  );
}
