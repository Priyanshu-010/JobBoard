import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import ApplicationRow from "../../components/ApplicationRow";
import { BriefcaseBusiness, Inbox } from "lucide-react";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axiosInstance.get("/job/myapps");
        setApps(res.data);
      } catch (error) {
        console.log("Error in fetching applications ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Applications</h1>
          <p className="text-slate-400 mt-1">Track the status of your sent applications.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-3">
          <BriefcaseBusiness className="text-indigo-400" size={24} />
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Sent</p>
            <p className="text-xl font-bold text-white">{apps.length}</p>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {apps.length > 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Table Header (Desktop only) */}
          <div className="hidden md:grid grid-cols-4 px-8 py-4 bg-slate-800/50 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800">
            <div>Company</div>
            <div>Role</div>
            <div>Applied Date</div>
            <div className="text-right">Status</div>
          </div>

          <div className="divide-y divide-slate-800">
            {apps.map((app) => (
              <ApplicationRow
                key={app.jobId}
                company={app.company}
                role={app.role}
                status={app.status}
                appliedAt={app.appliedAt}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="text-slate-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-white">No applications yet</h3>
          <p className="text-slate-500 mt-2 max-w-xs mx-auto">
            You haven't applied to any jobs yet. Start your search today!
          </p>
        </div>
      )}
    </div>
  );
}

export default MyApplications;