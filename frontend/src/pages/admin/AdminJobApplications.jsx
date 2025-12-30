import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import ApplicationRow from "../../components/ApplicationRow";
import { ChevronLeft, Users, Inbox, Search } from "lucide-react";
import toast from "react-hot-toast";

function AdminJobApplications() {
  const { id } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axiosInstance.get(`/job/${id}/applications`);
        setApps(res.data);
      } catch (error) {
        console.log("Error in Fetching Admin Applications", error);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [id]);

  const updateStatus = async (userId, status) => {
    try {
      await axiosInstance.patch(`/job/${id}/applications/${userId}`, { status });
      setApps((prev) =>
        prev.map((app) => (app.userId === userId ? { ...app, status } : app))
      );
      toast.success(`Application ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.log(error)
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Top Navigation & Info */}
      <div className="flex flex-col gap-6">
        <Link 
          to="/admin/jobs" 
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors w-fit group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl">
              <Users className="text-indigo-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Review Applicants</h1>
              <p className="text-slate-400">Review and manage candidate statuses for this role.</p>
            </div>
          </div>
          
          <div className="px-5 py-2 bg-slate-900 border border-slate-800 rounded-xl">
            <span className="text-slate-500 text-sm font-medium mr-2">Total Received:</span>
            <span className="text-white font-bold">{apps.length}</span>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {apps.length === 0 ? (
        <div className="text-center py-24 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-slate-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-white">No applicants yet</h3>
          <p className="text-slate-500 mt-2">Check back later or promote your job listing.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-4 px-8 py-4 bg-slate-800/50 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800">
            <div>Candidate</div>
            <div>Contact Email</div>
            <div>Applied On</div>
            <div className="text-right">Manage Status</div>
          </div>

          <div className="divide-y divide-slate-800">
            {apps.map((app) => (
              <ApplicationRow
                key={app.userId}
                name={app.name}
                email={app.email}
                status={app.status}
                appliedAt={app.appliedAt}
                isAdmin
                onUpdateStatus={(status) => updateStatus(app.userId, status)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJobApplications;