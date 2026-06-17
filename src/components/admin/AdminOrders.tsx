import { formatPrice, cn } from "@/src/lib/utils";
import { useOrderStore } from "@/src/store/useOrderStore";
import { Search, Clock, CheckCircle2, Package, XCircle } from "lucide-react";
import { useState } from "react";
import { TourGuide } from "@/src/components/TourGuide";

export function AdminOrders() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const adminOrdersSteps = [
    {
      target: "body",
      content: "This is your Orders Management screen. You can process customer orders from here.",
      placement: "center" as const,
      disableBeacon: true,
    },
    {
      target: "#tour-order-search",
      content: "Use this search bar to quickly find an order by its ID or by the customer's name.",
    },
    {
      target: "#tour-order-status-first",
      content: "Change an order's status here! Click the dropdown to update the order from Pending to Processing, Shipped, or Delivered. Changes reflect everywhere immediately.",
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <TourGuide steps={adminOrdersSteps} tourKey="admin_orders" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div id="tour-order-search" className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text" 
            placeholder="Search orders..."
            className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl py-2 pl-10 pr-4 text-sm focus:border-primary outline-none transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden flex-grow flex flex-col">
        <div className="overflow-x-auto flex-grow custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-[#0a0a0a] sticky top-0 z-10">
              <tr className="border-b border-[#1f1f1f] text-gray-500 text-[10px] uppercase tracking-widest font-black">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#1f1f1f]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 font-mono font-bold text-primary">{order.id}</td>
                    <td className="p-4 font-bold text-white/80">{order.customer}</td>
                    <td className="p-4 text-gray-500 font-medium">{order.date}</td>
                    <td className="p-4">
                      <select 
                        id={index === 0 ? "tour-order-status-first" : undefined}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest outline-none border border-transparent hover:border-white/20 transition-all appearance-none cursor-pointer",
                          order.status === "Delivered" ? "bg-green-500/10 text-green-500" :
                          order.status === "Processing" ? "bg-blue-500/10 text-blue-500" : 
                          order.status === "Cancelled" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                        )}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right font-black text-white">{formatPrice(order.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
