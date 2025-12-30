import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { timeAgo } from "../../utils/date.js";
import { ChevronLeft, MapPin, Calendar, Briefcase, Building2 } from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleClick = async (jobId) => {
    try {
      await axiosInstance.post(`/job/${jobId}/apply`);
      toast.success("Applied Successfully!");
      // Refresh job data to show 'Applied' state
      const res = await axiosInstance.get(`/job/${id}`);
      setJob(res.data);
    } catch (error) {
      toast.error("Already Applied");
      console.log(error)
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 animate-pulse">Fetching opportunity details...</p>
    </div>
  );

  if (!job) return (
    <div className="text-center py-20">
      <h2 className="text-2xl text-white font-bold">Job not found</h2>
      <Link to="/" className="text-indigo-400 hover:underline mt-4 block">Return to listings</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors w-fit">
        <ChevronLeft size={20} />
        Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              <Briefcase size={14} />
              {job.role}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {job.company}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-slate-500" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-slate-500" />
                Posted {timeAgo(job.createdAt)}
              </div>
            </div>
          </header>

          <hr className="border-slate-800" />

          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-white mb-4">About the Role</h3>
            <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-800 rounded-xl">
                <Building2 className="text-indigo-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Company</p>
                <p className="text-white font-medium">{job.company}</p>
              </div>
            </div>

            <button
              onClick={() => handleClick(job._id)}
              disabled={job.hasApplied}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-xl ${
                job.hasApplied
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
              }`}
            >
              {job.hasApplied ? "Applied" : "Apply Now"}
            </button>
            
            <p className="text-center text-xs text-slate-500 px-4">
              By clicking apply, your profile information will be shared with {job.company}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;