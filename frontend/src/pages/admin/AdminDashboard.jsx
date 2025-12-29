import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job");
        const jobs = res.data;
        const totalApplications = jobs.reduce((sum, job) => {
          return sum + job.applications.length;
        }, 0);

        setStats({ jobs: jobs.length, applications: totalApplications });
      } catch (error) {
        console.log("Error in fetching jobs admin dashboard", error);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>

      <div className="flex gap-6 mb-6">
        <div className="border p-4 rounded">
          <p>Total Jobs</p>
          <h2 className="text-xl">{stats.jobs}</h2>
        </div>

        <div className="border p-4 rounded">
          <p>Total Applications</p>
          <h2 className="text-xl">{stats.applications}</h2>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/admin/jobs" className="bg-indigo-600 px-4 py-2 rounded">
          Manage Jobs
        </Link>

        <Link to="/create" className="bg-green-600 px-4 py-2 rounded">
          Create Job
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
