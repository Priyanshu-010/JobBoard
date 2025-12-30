import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { toast } from "react-hot-toast";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/${id}`);
        setForm(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/job/${id}`, form);
      toast.success("Job updated");
      navigate("/admin/jobs");
    } catch (error) {
      toast.error("Update failed");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl">Edit Job</h1>
      <div className="flex flex-col">
        <div>
          <label>Company: </label>
          <input
            name="company"
            value={form.company}
            placeholder="Company"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role: </label>
          <input
            name="role"
            value={form.role}
            placeholder="Role"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location: </label>
          <input
            name="location"
            value={form.location}
            placeholder="Location"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center ">
          <label>Description: </label>
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
          />
        </div>

        <button className="bg-indigo-600 px-4 py-2 rounded">Update</button>
      </div>
    </form>
  );
}

export default EditJob;
