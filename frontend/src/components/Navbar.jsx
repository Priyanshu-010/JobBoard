import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { FilePenLine, PlusIcon, LogOut, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      logout();
      toast.success("Logged Out");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error Logging Out");
    }
  };

  return (
    /* Glassmorphism effect: sticky top with a blur background */
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <nav className="container mx-auto max-w-7xl flex px-6 py-4 justify-between items-center">
        
        {/* Logo Section */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <Briefcase className="text-indigo-400" size={28} />
          JobBoard
        </Link>

        <div className="flex items-center gap-2">
          {token ? (
            user?.role === "admin" ? (
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link
                  to="/create"
                  className="hidden md:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                >
                  <PlusIcon size={18} />
                  Create Job
                </Link>
                <Link to="/dashboard" className="text-slate-300 hover:text-white px-3 py-2 transition-colors">
                  Dashboard
                </Link>
                <Link to="/admin/jobs" className="text-slate-300 hover:text-white px-3 py-2 transition-colors">
                  Applications
                </Link>
                <button 
                  onClick={handleClick}
                  className="flex items-center gap-2 text-slate-400 hover:text-red-400 px-3 py-2 transition-colors border-l border-slate-800 ml-2"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              /* User Navigation */
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 transition-colors">
                  Find Jobs
                </Link>
                <Link to="/apps" className="text-slate-300 hover:text-white px-3 py-2 transition-colors">
                  My Applications
                </Link>
                <button 
                  onClick={handleClick}
                  className="flex items-center gap-2 text-slate-400 hover:text-red-400 px-3 py-2 transition-colors border-l border-slate-800 ml-2"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )
          ) : (
            /* Guest Navigation */
            <div className="flex items-center gap-3 text-sm font-medium">
              <Link 
                to="/login" 
                className="text-slate-300 hover:text-white px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg transition-all border border-slate-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;