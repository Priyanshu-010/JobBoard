import { formatDate } from "../utils/date";
import { CheckCircle, XCircle, Clock, Mail, User } from "lucide-react";

function ApplicationRow({
  company,
  role,
  name,
  email,
  status,
  appliedAt,
  isAdmin = false,
  onUpdateStatus,
}) {
  // Helper to color-code the status badges
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="group hover:bg-slate-800/30 transition-colors px-6 md:px-8 py-5 flex flex-col md:grid md:grid-cols-4 items-start md:items-center gap-4">
      
      {/* Company / User Info */}
      <div className="flex flex-col">
        {company ? (
          <p className="text-white font-semibold text-lg md:text-base">{company}</p>
        ) : (
          <div className="flex items-center gap-2 text-white font-medium">
            <User size={16} className="text-indigo-400" />
            {name}
          </div>
        )}
      </div>

      {/* Role / Email Info */}
      <div className="flex flex-col">
        {role ? (
          <p className="text-indigo-300 font-medium">{role}</p>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Mail size={14} />
            {email}
          </div>
        )}
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-slate-400 text-sm italic">
        <Clock size={14} className="md:hidden" />
        {formatDate(appliedAt)}
      </div>

      {/* Status & Actions */}
      <div className="w-full flex justify-between md:justify-end items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusStyles(status)}`}>
          {status || "Pending"}
        </span>

        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateStatus("accepted")}
              className="p-2 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30"
              title="Accept"
            >
              <CheckCircle size={20} />
            </button>
            <button
              onClick={() => onUpdateStatus("rejected")}
              className="p-2 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors border border-transparent hover:border-rose-500/30"
              title="Reject"
            >
              <XCircle size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationRow;