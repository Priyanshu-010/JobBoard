import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Briefcase } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const inputStyle = "w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all";

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            <Briefcase className="text-indigo-400" size={32} />
            JobBoard
          </Link>
          <p className="text-slate-400 text-sm">Welcome back! Access your account.</p>
        </div>

        <form onSubmit={handleClick} className="space-y-5">
          <div className="space-y-2 relative">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                className={inputStyle} 
                placeholder="name@company.com" 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2 relative">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                className={inputStyle} 
                placeholder="••••••••" 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2">
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;