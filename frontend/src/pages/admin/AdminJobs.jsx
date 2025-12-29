import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axiosInstance.get("/job");
      setJobs(res.data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-4 w-full">
      <h1 className="text-2xl mb-4">All Jobs</h1>

      {jobs.map((job) => (
        <div
          key={job._id}
          className="border p-4 rounded flex justify-between"
        >
          <div>
            <p><b>{job.company}</b></p>
            <p>{job.role}</p>
          </div>

          <Link
            to={`/admin/jobs/${job._id}/applications`}
            className="bg-indigo-600 px-4 py-2 rounded"
          >
            View Applications
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AdminJobs;
