import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import { Link } from "react-router-dom";
import { LayoutDashboard, Briefcase, Users, PlusCircle, Settings } from "lucide-react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job");
        const jobs = res.data;
        const totalApplications = jobs.reduce((sum, job) => {
          return sum + (job.applications?.length || 0);
        }, 0);

        setStats({ jobs: jobs.length, applications: totalApplications });
      } catch (error) {
        console.log("Error in fetching jobs admin dashboard", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <LayoutDashboard className="text-indigo-400" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">Overview of your platform's activity</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase size={80} className="text-indigo-400" />
          </div>
          <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Total Jobs Posted</p>
          <h2 className="text-5xl font-black text-white mt-2 tracking-tighter">{stats.jobs}</h2>
          <div className="mt-4 flex items-center gap-2 text-indigo-400 text-sm font-semibold">
            Active Listings
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={80} className="text-cyan-400" />
          </div>
          <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Total Applications</p>
          <h2 className="text-5xl font-black text-white mt-2 tracking-tighter">{stats.applications}</h2>
          <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            Received Interest
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-6">
        <h3 className="text-lg font-semibold text-white">Quick Management</h3>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/admin/jobs" 
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-slate-700 hover:border-slate-600 shadow-lg"
          >
            <Settings size={20} className="text-slate-400" />
            Manage All Jobs
          </Link>

          <Link 
            to="/create" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:-translate-y-1 shadow-xl shadow-indigo-600/20"
          >
            <PlusCircle size={20} />
            Post New Opening
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;