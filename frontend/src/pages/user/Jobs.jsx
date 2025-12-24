import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";

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
    <div>
      {jobs.map((job)=>(
        <div key={job._id}>
          <h1>{job.company}</h1>
          <p>{job.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
