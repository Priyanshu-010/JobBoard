import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { PenSquareIcon, Trash2Icon, Users, ChevronRight, Briefcase } from "lucide-react";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job");
        setJobs(res.data);
      } catch (error) {
        toast.error("Failed to load jobs");
        console.log(error)
      }
    };
    fetchJobs();
  }, []);

  const handleClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        await axiosInstance.delete(`/job/${id}`);
        setJobs((prev) => prev.filter((job) => job._id !== id));
        toast.success("Job deleted successfully");
      } catch (error) {
        console.log("Error in deleting AdminJob.jsx", error);
        toast.error("Error in deleting Job");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Listings</h1>
          <p className="text-slate-400 mt-1">Edit, delete, or track applications for your posted jobs.</p>
        </div>
        <Link 
          to="/create" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20 text-center"
        >
          + Post New Job
        </Link>
      </div>

      {/* Jobs List */}
      <div className="grid gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div 
              key={job._id} 
              className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-slate-700 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex p-3 bg-slate-800 rounded-xl text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">{job.company}</h2>
                  <p className="text-indigo-400 font-medium text-sm">{job.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleEdit(job._id)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-teal-600/20 hover:text-teal-400 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 hover:border-teal-500/30 transition-all font-medium"
                >
                  <PenSquareIcon size={18} />
                  Edit
                </button>
                
                <button
                  onClick={() => handleClick(job._id)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 hover:border-rose-500/30 transition-all font-medium"
                >
                  <Trash2Icon size={18} />
                  Delete
                </button>

                <Link
                  to={`/admin/jobs/${job._id}/applications`}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-5 py-2 rounded-lg border border-indigo-500/20 transition-all font-semibold"
                >
                  <Users size={18} />
                  View Applicants
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
            <p className="text-slate-500">No jobs posted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminJobs;