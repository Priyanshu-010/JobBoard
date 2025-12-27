import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import toast from "react-hot-toast";

function JobCard({ job }) {
  const navigate = useNavigate();
  const hasApplied = job.hasApplied;

  const handleClick = async (jobId) => {
    console.log(jobId);
    try {
      await axiosInstance.post(`/job/${jobId}/apply`);
      toast.success("Applied");
    } catch (error) {
      toast.error("Already Applied");
      console.log(error);
    } finally {
      navigate(`/details/${jobId}`);
    }
  };

  // const formatDate = (dateString) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };
  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 10) return "just now";
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}hr ago`;
    return new Date(past).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className=" p-6 border border-indigo-500 rounded-xl max-w-100 text-md flex flex-col gap-4">
      <Link
        to={`/details/${job._id}`}
        className="flex flex-col gap-2"
        key={job._id}
      >
        <h1 className="text-4xl font-extrabold">{job.company}</h1>
        <h1 className="border border-indigo-500 bg-indigo-400 text-white w-fit rounded-2xl px-3 ">
          {job.role}
        </h1>
        <p className="text-lg truncate w-90">{job.description}</p>
        <p className="">
          {job?.location} · <span>{timeAgo(job.createdAt)}</span>
        </p>
        <p></p>
      </Link>
      <div>
        {hasApplied ? (
          <button
            className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed opacity-50"
            disabled
            onClick={() => handleClick(job._id)}
          >
            Applied
          </button>
        ) : (
          <button
            className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            onClick={() => handleClick(job._id)}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;
