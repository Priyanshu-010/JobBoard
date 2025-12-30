import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import ApplicationRow from "../../components/ApplicationRow";

function MyApplications() {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axiosInstance.get("/job/myapps");
        setApps(res.data);
      } catch (error) {
        console.log("Error in fetching applications ", error);
      }
    };
    fetchApps();
  }, []);
  return (
    <div>
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
  );
}

export default MyApplications;
