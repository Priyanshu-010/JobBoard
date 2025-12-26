import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className=" p-6 border border-indigo-500 rounded-xl max-w-100 text-md flex flex-col gap-4">
      <Link to="/details/:id" className="flex flex-col gap-3" key={job._id}>
        <h1 className="text-4xl font-extrabold">{job.company}</h1>
        <h1 className="border border-indigo-500 bg-indigo-400 text-white w-fit rounded-2xl px-3 ">
          {job.role}
        </h1>
        <p className="text-lg truncate w-90">{job.description}</p>
      </Link>
      <div> 
        <button className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Apply
        </button>
      </div>
    </div>
  );
}

export default JobCard;
