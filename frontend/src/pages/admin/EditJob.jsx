import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { toast } from "react-hot-toast";
import { PenSquare, ArrowLeft } from "lucide-react";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/${id}`);
        setForm(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch job details");
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/job/${id}`, form);
      toast.success("Job updated successfully");
      navigate("/admin/jobs");
    } catch (error) {
      toast.error("Update failed");
      console.log(error);
    }
  };

  const inputStyle = "w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/admin/jobs" className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors w-fit">
        <ArrowLeft size={18} />
        Cancel and Go Back
      </Link>

      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-teal-500/20 rounded-lg">
            <PenSquare className="text-teal-400" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Edit Job Details</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Company</label>
              <input
                className={inputStyle}
                name="company"
                value={form.company}
                placeholder="Company"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Role</label>
              <input
                className={inputStyle}
                name="role"
                value={form.role}
                placeholder="Role"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Location</label>
            <input
              className={inputStyle}
              name="location"
              value={form.location}
              placeholder="Location"
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Job Description</label>
            <textarea
              className={`${inputStyle} min-h-[150px] resize-none`}
              name="description"
              value={form.description}
              placeholder="Description"
              onChange={handleChange}
              required
            />
          </div>

          <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] shadow-xl shadow-teal-600/20 mt-4">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;