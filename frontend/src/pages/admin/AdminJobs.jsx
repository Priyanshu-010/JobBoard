import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axiosInstance.get("/job");
      setJobs(res.data);
    };

    fetchJobs();
  }, []);

  console.log(jobs);
  const handleClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axiosInstance.delete(`/job/${id}`);
        setJobs((prev) => prev.filter((job) => job._id !== id));
        toast.success("Job deleted");
      } catch (error) {
        console.log("Error in deleting AdminJob.jsx", error);
        toast.error("Error in deleting Job");
      }
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4 w-full">
      <h1 className="text-2xl mb-4">All Jobs</h1>

      {jobs.map((job) => (
        <div key={job._id} className="border p-4 rounded flex justify-between">
          <div>
            <p>
              <b>{job.company}</b>
            </p>
            <p>{job.role}</p>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handleClick(job._id)}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Delete
            </button>
            <Link
              to={`/admin/jobs/${job._id}/applications`}
              className="bg-indigo-600 px-4 py-2 rounded"
            >
              View Applications
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminJobs;
