import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { timeAgo } from "../../utils/date.js";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/${id}`);
        setJob(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleClick = async (jobId) => {
    console.log(jobId);
    try {
      await axiosInstance.post(`/job/${jobId}/apply`);
      toast.success("Applied");
    } catch (error) {
      toast.error("Already Applied");
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div>
      <h1>{job.company}</h1>
      <h2>{job.role}</h2>
      <p>{job.description}</p>
      <p>
        {job.location} · <span>{timeAgo(job.createdAt)}</span>
      </p>
      {/* <p>{job.applications.status}</p> */}
      

      <button
        className={
          job.hasApplied
            ? "w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed opacity-50"
            : "w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
        }
        onClick={() => handleClick(job._id)}
        disabled={job.hasApplied}
      >
        {job.hasApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobDetails;
