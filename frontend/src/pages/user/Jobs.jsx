import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import JobCard from "../../components/JobCard.jsx";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job");
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      {jobs.map((job)=>(
        <JobCard job={job} />
      ))}
    </div>
  );
}

export default Jobs;
