import React, { useState } from "react";
import { motion } from "motion/react";
import { Trophy, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulation
    setUser({
      uid: "admin-123",
      email: email || "admin@aonesports.com",
      displayName: "Admin Abdullah",
      role: "admin",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 px-4 bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#111] border border-[#1f1f1f] p-8 md:p-10 rounded-2xl relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <div className="bg-[#a3e635]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-[#a3e635]" />
          </div>
          <h1 className="text-3xl font-display font-extrabold uppercase text-white mb-2">Welcome <span className="text-[#a3e635] italic">Back</span></h1>
          <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input 
                type="email" 
                className="w-full h-12 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all text-sm text-white placeholder-gray-700"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Password</label>
              <button type="button" className="text-[10px] font-black text-[#a3e635] uppercase hover:underline">Forgot password?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full h-12 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl pl-12 pr-12 outline-none focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all text-sm text-white placeholder-gray-700"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            onClick={handleLogin}
            className="w-full h-12 bg-[#a3e635] text-black rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#bef264] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#a3e635]/10"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500 uppercase tracking-widest">
          Don't have an account? <Link to="/signup" className="text-[#a3e635] font-black hover:underline ml-1">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
