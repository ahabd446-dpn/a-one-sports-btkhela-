import { Helmet } from "react-helmet-async";
import { Truck, MapPin, ShieldCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Shipping & Delivery | A One Sports Batkhela</title>
      </Helmet>

      <div className="text-center mb-16">
        <div className="inline-flex bg-primary/10 p-3 rounded-2xl text-primary mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white">
          DELIVERY & <span className="text-primary italic">SHIPPING</span>
        </h1>
        <p className="text-gray-500 font-medium mt-3">Everything you need to know about order delivery across Pakistan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <MapPin className="w-24 h-24 text-white" />
          </div>
          <h3 className="font-display font-black uppercase text-lg text-primary mb-4">Local Delivery (Khyber Pakhtunkhwa)</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-medium list-disc list-inside">
            <li>Serving areas: Batkhela, Malakand, Swat, Peshawar, Mardan, Dir, Chitral, etc.</li>
            <li>Timeline: **2 to 3 Business Days**</li>
            <li>Urgent orders can be dispatched via local bus services on request.</li>
            <li>Free delivery for orders above **Rs. 5,000**.</li>
          </ul>
        </div>

        <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Truck className="w-24 h-24 text-white" />
          </div>
          <h3 className="font-display font-black uppercase text-lg text-primary mb-4">Nationwide Delivery</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-medium list-disc list-inside">
            <li>Serving all other cities in Punjab, Sindh, and Balochistan.</li>
            <li>Timeline: **3 to 5 Business Days**</li>
            <li>Shipped via reliable courier services (Leopards, TCS, M&P).</li>
            <li>Tracking details sent instantly via SMS/Email.</li>
            <li>Standard flat rate of **Rs. 250** for orders below Rs. 5,000.</li>
          </ul>
        </div>
      </div>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 space-y-6">
        <h3 className="font-display font-black uppercase text-xl text-white">Delivery Policy Details</h3>
        
        <div className="flex gap-4">
          <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-white text-sm">Order Processing Time</h4>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Orders placed before 2:00 PM (Monday - Saturday) are dispatched on the same day. Orders placed on Sunday or national holidays will be processed on the next business day.</p>
          </div>
        </div>

        <div className="flex gap-4 border-t border-[#1f1f1f]/50 pt-6">
          <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-white text-sm">Secure Packaging</h4>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">We pay extra attention to sports equipment. Cricket bats are bubble wrapped and shipped in robust cardboard boxes, and delicate gear like helmets or wickets are packed inside reinforced wooden/cardboard packaging to prevent transit damage.</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-3 bg-primary text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:-translate-y-0.5"
        >
          Go Back to Shop
        </Link>
      </div>
    </div>
  );
}
