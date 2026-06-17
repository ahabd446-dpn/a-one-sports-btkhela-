import { Smartphone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          {/* Brand Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="flex flex-col">
                <span className="text-2xl font-display font-extrabold leading-tight tracking-tighter text-white">
                  A ONE <span className="text-[#a3e635] italic">SPORTS</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-600 -mt-1">
                  Batkhela
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 max-w-xs">
              Batkhela's premier destination for international standard sports equipment. Excellence in every kick, swing, and goal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#111] hover:bg-[#a3e635] hover:text-black transition-all rounded-xl flex items-center justify-center border border-[#1f1f1f] group">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#111] hover:bg-[#a3e635] hover:text-black transition-all rounded-xl flex items-center justify-center border border-[#1f1f1f] group">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#111] hover:bg-[#a3e635] hover:text-black transition-all rounded-xl flex items-center justify-center border border-[#1f1f1f] group">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a3e635] mb-8">Explore</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop The Armory</Link></li>
              <li><Link to="/categories/cricket" className="hover:text-white transition-colors">Cricket Gear</Link></li>
              <li><Link to="/categories/football" className="hover:text-white transition-colors">Football Gear</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Sports News</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a3e635] mb-8">Support</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Delivery Options</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Customer Care</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a3e635] mb-8">Contact</h4>
            <ul className="space-y-5 text-xs font-bold tracking-widest text-gray-500">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#a3e635] shrink-0" />
                <span className="leading-relaxed">Main Bazar Batkhela, Khyber Pakhtunkhwa, PK</span>
              </li>
              <li className="flex gap-4">
                <Smartphone className="w-5 h-5 text-[#a3e635] shrink-0" />
                <a href="tel:03009070260" className="text-white hover:text-[#a3e635] transition-colors">0300 9070260</a>
              </li>
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-[#a3e635] shrink-0" />
                <a href="mailto:info@aonesports.com" className="hover:text-[#a3e635] transition-colors lowercase">info@aonesports.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {currentYear} A One Sports Batkhela. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Powered by Excellence</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Store Open (8 AM - 8 PM)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
