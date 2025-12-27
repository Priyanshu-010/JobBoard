import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import ApplicationRow from "../../components/ApplicationRow";

function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = axiosInstance.get("/job/myApps");
        setApps(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error("Error fetching applications");
        console.log(error);
      }
    };
    fetchApplications();
  }, []);

  const handleStatusUpdate = () => {};

  return (
    <div>
      {apps.map((app) => {
        <ApplicationRow
          key={app.jobId}
          application={app}
          isAdmin={false}
          onStatusChange={handleStatusUpdate}
        />;
      })}
    </div>
  );
}

export default MyApplications;
