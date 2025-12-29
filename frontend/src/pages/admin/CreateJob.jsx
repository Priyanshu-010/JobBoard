import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios.js";
import { toast } from "react-hot-toast";

function CreateJob() {
  const [company, setCompany] =useState("")
  const [role, setRole] =useState("")
  const [location, setLocation] =useState("")
  const [description, setDescription] =useState("")

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/job", {company, role, location, description});
      toast.success("Job created");
      navigate("/admin/jobs");
    } catch (error) {
      console.log("Error in handleSubmit CreatePage, ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl">Create Job</h1>
      <div className="flex flex-col">
        <div>
          <label>Company: </label>
          <input name="company" placeholder="Company" onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div>
          <label>Role: </label>
          <input name="role" placeholder="Role" onChange={(e) => setRole(e.target.value)} />
        </div>
        <div>
          <label>Location: </label>
          <input
            name="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex items-center ">
          <label>Description: </label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="bg-indigo-600 px-4 py-2 rounded">Create</button>
      </div>
    </form>
  );
}

export default CreateJob;
