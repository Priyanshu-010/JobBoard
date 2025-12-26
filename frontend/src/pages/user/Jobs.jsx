import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import JobCard from "../../components/JobCard.jsx";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job");
        setJobs(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex gap-6">
      {jobs.map((job)=>(
        <JobCard job={job} key={job._id} />
      ))}
    </div>
  );
}

export default Jobs;
