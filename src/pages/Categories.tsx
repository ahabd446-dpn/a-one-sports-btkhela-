import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Trophy, Shield, Zap, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const sportsCategories = [
  {
    name: "Cricket",
    slug: "cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    description: "Premium English and Kashmir Willow bats, protective kits, balls, and accessories from SS & CA.",
    icon: Trophy,
    color: "from-lime-500/20 to-transparent",
    borderHover: "group-hover:border-lime-500/50"
  },
  {
    name: "Football",
    slug: "football",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
    description: "Professional Sialkot-made matches footballs, gloves, shin guards, and team uniforms.",
    icon: Shield,
    color: "from-blue-500/20 to-transparent",
    borderHover: "group-hover:border-blue-500/50"
  },
  {
    name: "Badminton",
    slug: "badminton",
    image: "https://images.unsplash.com/photo-1626225454284-d3c631481180?auto=format&fit=crop&q=80&w=800",
    description: "Carbon fiber Yonex rackets, high-grade shuttlecocks, nets, and grip accessories.",
    icon: Zap,
    color: "from-yellow-500/20 to-transparent",
    borderHover: "group-hover:border-yellow-500/50"
  },
  {
    name: "Shoes",
    slug: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    description: "Spikes for cricket, cleats for football, and high-performance indoor/running shoes.",
    icon: Sparkles,
    color: "from-red-500/20 to-transparent",
    borderHover: "group-hover:border-red-500/50"
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800",
    description: "Kit bags, bats grips, bat oil, protective helmets, and general sports gear.",
    icon: Trophy,
    color: "from-purple-500/20 to-transparent",
    borderHover: "group-hover:border-purple-500/50"
  }
];

export function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sports Categories | A One Sports Batkhela</title>
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-white tracking-tighter">
          THE <span className="text-primary italic">ARMORY</span> DEPARTMENTS
        </h1>
        <p className="text-gray-500 font-medium mt-3 text-sm max-w-lg mx-auto">
          Explore our professional categories. Select your sport to view pro-grade equipment tailored for champions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sportsCategories.map((cat, idx) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link 
              to={`/categories/${cat.slug}`}
              className={`group block bg-[#111] border border-[#1f1f1f] rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 relative ${cat.borderHover}`}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-primary">
                  <cat.icon className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl font-display font-black uppercase text-white group-hover:text-primary transition-colors flex items-center gap-2">
                  {cat.name} <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium min-h-[3rem]">
                  {cat.description}
                </p>
              </div>

              {/* Decorative Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10`} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
