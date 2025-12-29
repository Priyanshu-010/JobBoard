import { formatDate } from "../utils/date";

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
  return (
    <div className="border p-4 rounded-lg flex justify-between items-center mb-6">
      <div>
        {company && (
          <p>
            <b>Company:</b> {company}
          </p>
        )}
        {role && (
          <p>
            <b>Role:</b> {role}
          </p>
        )}

        {name && (
          <p>
            <b>User:</b> {name}
          </p>
        )}
        {email && (
          <p>
            <b>Email:</b> {email}
          </p>
        )}
        <p className="text-sm text-gray-400">
          Applied on {formatDate(appliedAt)}
        </p>
      </div>
      <div>
        <p>
          <b>Status:</b> <span>{status}</span> 
        </p>
      </div>

      {isAdmin && (
        <div className="flex gap-2">
          <button
            onClick={() => onUpdateStatus("accepted")}
            className="bg-green-600 px-3 py-1 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => onUpdateStatus("rejected")}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default ApplicationRow;
