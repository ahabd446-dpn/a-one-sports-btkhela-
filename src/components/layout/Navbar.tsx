import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X, Trophy, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/src/store/useCartStore";
import { useAuthStore } from "@/src/store/useAuthStore";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.length);
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Rule 1: Announcement Bar - Fixed top-0, z-50, hidden on mobile, slides up on scroll */}
      <div className={cn(
        "fixed top-0 left-0 w-full z-[var(--z-announcement)] h-10 bg-primary text-black hidden md:flex items-center px-4 overflow-hidden border-b border-black/10 transition-transform duration-300",
        isScrolled ? "-translate-y-full" : "translate-y-0"
      )}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 focus-target">
              <MapPin className="w-3 h-3" /> Batkhela, PK
            </span>
            <span className="flex items-center gap-1.5 border-l border-black/20 pl-6">
              <Clock className="w-3 h-3" /> 8:00 AM - 8:00 PM
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>Authorized SS & CA Sports Dealer</span>
            <span className="bg-black text-primary px-3 py-1 rounded-full animate-pulse">Free Delivery over Rs. 5000</span>
          </div>
        </div>
      </div>

      {/* Rule 1 & 7: Main Navbar - Fixed, top-[height], z-40 */}
      <header className={cn(
        "fixed left-0 w-full z-[var(--z-navbar)] transition-all duration-300 border-b",
        isScrolled 
          ? "top-0 h-14 bg-[#0a0a0a]/95 backdrop-blur-2xl border-[#a3e635]/20 shadow-2xl shadow-[#a3e635]/5" 
          : "top-0 md:top-10 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-[#1f1f1f]"
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Logo Section */}
            <Link id="nav-logo" to="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
              <div className="bg-primary p-2 rounded-lg sm:p-2.5 sm:rounded-xl shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-2xl font-display font-black leading-none tracking-tighter uppercase text-white">
                  A ONE <span className="text-primary italic">SPORTS</span>
                </span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mt-0.5">
                  Batkhela
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "text-[12px] font-black uppercase tracking-widest transition-all hover:text-primary relative group",
                      isActive ? "text-primary" : "text-white/60"
                    )
                  }
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
                </NavLink>
              ))}
            </div>

            {/* Utility Icons */}
            <div className="flex items-center gap-2 sm:gap-5">
              <button id="search-trigger" className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/60 hover:text-primary lg:flex items-center gap-2 hidden">
                <Search className="w-5 h-5" />
              </button>
              
              <Link id="cart-nav-link" to="/cart" className="p-2 sm:p-2.5 hover:bg-white/5 rounded-xl transition-all text-white/60 hover:text-primary relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 bg-primary text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </Link>

              <Link 
                id="user-auth-link"
                to={user ? "/dashboard" : "/login"} 
                className={cn(
                  "p-2 sm:p-2.5 hover:bg-white/5 rounded-xl transition-all text-white/60 hover:text-primary",
                  user && "bg-primary/10 text-primary border border-primary/20"
                )}
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>

              <button 
                id="mobile-menu-toggle"
                className="lg:hidden p-2 bg-white/5 hover:bg-primary hover:text-black rounded-lg transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
        </nav>

        {/* Mobile Drawer - Rule 7: Mobile menu overlay z-20 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 lg:hidden z-[var(--z-mobile-menu)] h-screen bg-[#0a0a0a] p-6 flex flex-col pt-32"
            >
              <div className="space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={link.name}
                  >
                    <Link
                      to={link.href}
                      className="block text-4xl font-display font-black uppercase tracking-tighter hover:text-primary transition-colors py-2 text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pb-10 space-y-8">
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="block text-[8px] font-black uppercase text-white/30 mb-1">Support</span>
                    <p className="text-xs font-bold text-white">0300 9070260</p>
                  </div>
                  <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="block text-[8px] font-black uppercase text-white/30 mb-1">Hours</span>
                    <p className="text-xs font-bold text-white">8 AM - 8 PM</p>
                  </div>
                </div>
                <p className="text-[10px] text-white/40 font-medium leading-relaxed uppercase tracking-wider">A One Sports Batkhela - Batkhela's Premier destination for international standard sports equipment.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
