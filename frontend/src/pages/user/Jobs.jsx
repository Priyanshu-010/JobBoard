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
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section / Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Find your next <span className="text-indigo-500">dream job</span>
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Browse through the latest opportunities from top companies and startups.
        </p>
      </div>

      {/* Jobs Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
          <p className="text-slate-500 text-lg">No jobs available at the moment.</p>
          <p className="text-slate-600 text-sm">Check back later for new openings!</p>
        </div>
      )}
    </div>
  );
}

export default Jobs;