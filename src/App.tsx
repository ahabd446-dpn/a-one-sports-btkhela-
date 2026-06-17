/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { AdminDashboard } from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

// Placeholders for remaining pages
const Categories = () => <div className="p-20 text-center text-4xl font-display font-bold uppercase">CATEGORY <span className="text-primary italic">MAP</span> COMING SOON</div>;

export default function App() {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col selection:bg-primary selection:text-black scroll-smooth bg-[#0a0a0a] text-white">
          <Navbar />
          {/* pt-[calc(announcement_bar + navbar)] -> 40px + 64px = 104px on desktop, 64px on mobile */}
          <main className="flex-grow pt-16 md:pt-[104px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/categories" element={<Categories />} />
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
