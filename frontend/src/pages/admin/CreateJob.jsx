import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axios.js";
import { toast } from "react-hot-toast";
import { PlusCircle, ArrowLeft } from "lucide-react";

function CreateJob() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/job", { company, role, location, description });
      toast.success("Job created successfully");
      navigate("/admin/jobs");
    } catch (error) {
      console.log("Error in handleSubmit CreatePage, ", error);
      toast.error("Failed to create job");
    }
  };

  // Common input styles for reuse
  const inputStyle = "w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/admin/jobs" className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors w-fit">
        <ArrowLeft size={18} />
        Back to Jobs
      </Link>

      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <PlusCircle className="text-indigo-400" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Post New Opening</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Company Name</label>
              <input 
                className={inputStyle}
                name="company" 
                placeholder="e.g. Google" 
                onChange={(e) => setCompany(e.target.value)} 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Job Role</label>
              <input 
                className={inputStyle}
                name="role" 
                placeholder="e.g. Frontend Developer" 
                onChange={(e) => setRole(e.target.value)} 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Location</label>
            <input 
              className={inputStyle}
              name="location" 
              placeholder="e.g. Remote or New York, NY" 
              onChange={(e) => setLocation(e.target.value)} 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Job Description</label>
            <textarea 
              className={`${inputStyle} min-h-[150px] resize-none`}
              name="description" 
              placeholder="Describe the responsibilities and requirements..." 
              onChange={(e) => setDescription(e.target.value)} 
              required
            />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] shadow-xl shadow-indigo-600/20 mt-4">
            Create Job Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;