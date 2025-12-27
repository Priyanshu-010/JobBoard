function ApplicationRow({ application, isAdmin, onStatusChange }) {
  return (
    <div className="border p-3 flex justify-between">
      <div>
        <p>{application.user.name}</p>
        <p>{application.user.email}</p>
        <p>Status: {application.status}</p>
      </div>

      {isAdmin && (
        <div>
          <button onClick={() => onStatusChange(application._id, "accepted")}>
            Accept
          </button>
          <button onClick={() => onStatusChange(application._id, "rejected")}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default ApplicationRow