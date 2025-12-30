import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useState } from "react";
import ApplicationRow from "../../components/ApplicationRow";

function AdminJobApplications() {
  const { id } = useParams(); //jobId
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axiosInstance.get(`/job/${id}/applications`);
        setApps(res.data);
      } catch (error) {
        console.log("Error in Fetching Admin Applications", error);
      }
    };
    fetchApps();
  }, [id]);

  const updateStatus = async (userId, status) => {
    await axiosInstance.patch(`/job/${id}/applications/${userId}`, { status });
    setApps((prev) =>
      prev.map((app) => (app.userId === userId ? { ...app, status } : app))
    );
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Applications</h1>

      {apps.length === 0 ? (
        <div>No Applications Found</div>
      ) : (
        apps.map((app) => (
          <ApplicationRow
            key={app.userId} //userId
            name={app.name}
            email={app.email}
            status={app.status}
            appliedAt={app.appliedAt}
            isAdmin
            onUpdateStatus={(status) => updateStatus(app.userId, status)}
          />
        ))
      )}
    </div>
  );
}

export default AdminJobApplications;
