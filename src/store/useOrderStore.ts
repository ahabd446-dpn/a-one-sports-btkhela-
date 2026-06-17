import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
}

const initialOrders: Order[] = [
  { id: "#ORD-8821", customer: "Abdullah Khan", date: "Jun 14, 2026", status: "Delivered", total: 45000 },
  { id: "#ORD-8822", customer: "Zaid Ahmad", date: "Jun 14, 2026", status: "Processing", total: 12500 },
  { id: "#ORD-8823", customer: "Umar Farooq", date: "Jun 13, 2026", status: "Pending", total: 8500 },
  { id: "#ORD-8824", customer: "Ibrahim Ali", date: "Jun 13, 2026", status: "Pending", total: 3200 },
];

interface OrderState {
  orders: Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: initialOrders,
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      })),
    }),
    {
      name: "aos-order-storage",
    }
  )
);
