import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  ShoppingBag,
  ChevronRight,
  Package
} from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import { formatPrice, cn } from "@/src/lib/utils";

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderTrackingCode, setOrderTrackingCode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    // Card details
    cardNumber: "",
    cardExpiry: "",
    cardCvv: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  // Format Card Number as user types
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 16) value = value.slice(0, 16);
    // Add space every 4 digits
    const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: "" }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setFormData(prev => ({ ...prev, cardExpiry: value }));
    if (errors.cardExpiry) setErrors(prev => ({ ...prev, cardExpiry: "" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{11}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Must be 11 digits";

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.province.trim()) newErrors.province = "Province is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    if (paymentMethod === "card") {
      const plainCard = formData.cardNumber.replace(/\D/g, "");
      if (plainCard.length !== 16) newErrors.cardNumber = "Card number must be 16 digits";
      if (formData.cardExpiry.length !== 5) newErrors.cardExpiry = "Invalid expiry";
      if (formData.cardCvv.length < 3) newErrors.cardCvv = "CVV required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to top to see errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderTrackingCode(`AOS-${Math.floor(100000 + Math.random() * 900000)}-PK`);
      setIsSuccess(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 py-16">
        <Helmet>
          <title>Order Confirmation | A One Sports</title>
        </Helmet>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-[#111] border border-[#1f1f1f] p-8 md:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
          >
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4 relative z-10">
            Order <span className="text-primary italic">Confirmed</span>
          </h1>
          <p className="text-white/60 mb-8 max-w-md mx-auto relative z-10">
            Thank you for your purchase. We've received your order and are getting your gear ready for shipment.
          </p>

          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1f1f1f] text-left mb-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Order Number</p>
                <p className="font-bold text-primary">{orderTrackingCode}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Date</p>
                <p className="font-bold text-sm">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Total</p>
                <p className="font-bold text-sm">{formatPrice(total)}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Payment</p>
                <p className="font-bold text-sm uppercase">{paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}</p>
              </div>
            </div>
          </div>

          <Link to="/shop" className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-all transform hover:-translate-y-1 relative z-10">
            Return to Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // Redirect to cart if empty
  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold uppercase mb-4">Cart is empty</h2>
        <button onClick={() => navigate("/shop")} className="text-primary hover:underline flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Helmet>
        <title>Secure Checkout | A One Sports</title>
      </Helmet>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 mb-8">
        <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary">Checkout</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        {/* Left Column: Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-display font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                Contact <span className="text-primary italic">Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                      errors.email ? "border-red-500/50 focus:border-red-500/50" : "border-[#2a2a2a] focus:border-primary/50"
                    )}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn(
                      "w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                      errors.phone ? "border-red-500/50" : "border-[#2a2a2a]"
                    )}
                    placeholder="0300 1234567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-display font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                Shipping <span className="text-primary italic">Address</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all", errors.fullName ? "border-red-500/50" : "border-[#2a2a2a]")}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.fullName}</p>}
                </div>
                
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all", errors.address ? "border-red-500/50" : "border-[#2a2a2a]")}
                    placeholder="House/Apartment, Street Name"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all", errors.city ? "border-red-500/50" : "border-[#2a2a2a]")}
                      placeholder="City"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1"><AlertCircle className="w-3 h-3 inline mr-1"/>{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Province</label>
                    <select 
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none", errors.province ? "border-red-500/50" : "border-[#2a2a2a]")}
                    >
                      <option value="">Select Province</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                      <option value="KPK">Khyber Pakhtunkhwa</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                      <option value="AJK">AJK</option>
                    </select>
                    {errors.province && <p className="text-red-500 text-xs mt-1"><AlertCircle className="w-3 h-3 inline mr-1"/>{errors.province}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all", errors.postalCode ? "border-red-500/50" : "border-[#2a2a2a]")}
                    placeholder="Zip / Postal Code"
                  />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1"><AlertCircle className="w-3 h-3 inline mr-1"/>{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-black uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                  Payment <span className="text-primary italic">Method</span>
                </h2>
                <div className="flex items-center gap-1 text-[10px] text-[#a3e635] font-black uppercase tracking-widest bg-[#a3e635]/10 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Secure Encrypted
                </div>
              </div>
              
              <div className="space-y-4">
                {/* COD Option */}
                <label 
                  className={cn(
                    "flex items-center p-4 border rounded-2xl cursor-pointer transition-all",
                    paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-[#2a2a2a] hover:border-[#3a3a3a] bg-[#0a0a0a]"
                  )}
                >
                  <div className="flex-grow flex items-center gap-4">
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", paymentMethod === "cod" ? "border-primary" : "border-[#4a4a4a]")}>
                      {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className={cn("w-5 h-5", paymentMethod === "cod" ? "text-primary" : "text-white/40")} />
                      <div>
                        <p className="font-bold text-sm">Cash on Delivery (COD)</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Pay when you receive</p>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Card Option */}
                <label 
                  className={cn(
                    "flex flex-col p-4 border rounded-2xl cursor-pointer transition-all",
                    paymentMethod === "card" ? "border-primary bg-primary/5" : "border-[#2a2a2a] hover:border-[#3a3a3a] bg-[#0a0a0a]"
                  )}
                >
                  <div 
                    className="flex items-center gap-4"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === "card" ? "border-primary" : "border-[#4a4a4a]")}>
                      {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div className="flex-grow flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className={cn("w-5 h-5", paymentMethod === "card" ? "text-primary" : "text-white/40")} />
                        <div>
                          <p className="font-bold text-sm">Credit / Debit Card</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Visa, Mastercard</p>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-50 hidden sm:flex">
                         {/* Card icons visual */}
                         <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                         <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details Form Expansion */}
                  <AnimatePresence>
                    {paymentMethod === "card" && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-[#1f1f1f] space-y-4">
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Card Number</label>
                            <input 
                              type="text" 
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono tracking-widest", errors.cardNumber ? "border-red-500/50" : "border-[#2a2a2a]")}
                              placeholder="0000 0000 0000 0000"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1"><AlertCircle className="w-3 h-3 inline mr-1"/>{errors.cardNumber}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Expiry Date</label>
                              <input 
                                type="text" 
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleExpiryChange}
                                className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono tracking-widest", errors.cardExpiry ? "border-red-500/50" : "border-[#2a2a2a]")}
                                placeholder="MM/YY"
                              />
                              {errors.cardExpiry && <p className="text-red-500 text-xs mt-1"><AlertCircle className="w-3 h-3 inline mr-1"/>{errors.cardExpiry}</p>}
                            </div>
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">CVC/CVV</label>
                              <input 
                                type="text" 
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleChange}
                                maxLength={4}
                                className={cn("w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono tracking-widest", errors.cardCvv ? "border-red-500/50" : "border-[#2a2a2a]")}
                                placeholder="123"
                              />
                              {errors.cardCvv && <p className="text-red-500 text-xs mt-1"><AlertCircle className="w-3 h-3 inline mr-1"/>{errors.cardCvv}</p>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </label>
              </div>
            </div>

            {/* Mobile Submit Button (Hidden on Desktop, shown via Order Summary below on desktop but we can put it here for small screens) */}
            <div className="lg:hidden">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing Order...</span>
                ) : (
                  <>Complete Order <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
            
          </form>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="lg:w-1/3 hidden lg:block">
          <div className="sticky top-32 bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 space-y-8">
            <h2 className="text-xl font-display font-black uppercase tracking-widest mb-6">Order <span className="text-[#a3e635] italic">Summary</span></h2>
            
            {/* Items snippet */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-[#0a0a0a] rounded border border-[#1f1f1f] shrink-0 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[8px] font-bold rounded-full flex items-center justify-center z-10">{item.quantity}</span>
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <p className="text-xs font-bold truncate text-white">{item.name}</p>
                    <p className="text-[10px] text-white/50">{formatPrice(item.price)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-gray-600">Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold uppercase tracking-widest text-gray-600">Shipping</span>
                <span className={cn("font-bold", shipping === 0 ? "text-[#a3e635]" : "")}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="pt-6 border-t border-[#1f1f1f] flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-widest">Total</span>
                <span className="text-3xl font-display font-black text-[#a3e635]">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#a3e635] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#a3e635]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>Complete Order <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
              
              <div className="text-center text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
