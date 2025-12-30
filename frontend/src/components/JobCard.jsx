import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import toast from "react-hot-toast";
import { timeAgo } from "../utils/date.js";
import { MapPin, Clock, Building2 } from "lucide-react";

function JobCard({ job }) {
  const navigate = useNavigate();
  const hasApplied = job.hasApplied;

  const handleClick = async (jobId) => {
    try {
      await axiosInstance.post(`/job/${jobId}/apply`);
      toast.success("Applied Successfully");
    } catch (error) {
      toast.error("Already Applied");
      console.log(error);
    } finally {
      navigate(`/details/${jobId}`);
    }
  };

  return (
    <div className="group p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between gap-4 shadow-xl">
      <Link
        to={`/details/${job._id}`}
        className="flex flex-col gap-3"
        key={job._id}
      >
        <div className="flex justify-between items-start">
          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <Building2 className="text-indigo-400" size={24} />
          </div>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Full Time
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {job.company}
          </h2>
          <h3 className="text-indigo-300 font-medium text-sm mt-1">
            {job.role}
          </h3>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            {job?.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {timeAgo(job.createdAt)}
          </div>
        </div>
      </Link>

      <div className="mt-2">
        {hasApplied ? (
          <button
            className="w-full bg-slate-800 text-slate-400 py-2.5 rounded-xl font-semibold cursor-not-allowed border border-slate-700"
            disabled
          >
            Already Applied
          </button>
        ) : (
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-semibold transition-all transform active:scale-95 shadow-lg shadow-indigo-600/20"
            onClick={() => handleClick(job._id)}
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;