import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      toast.success("Login Successfull");
      navigate("/");
      // console.log(res.data.user.role);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center max-h-screen">
      <div className="flex flex-col gap-6 h-auto w-auto border py-4 px-8 border-indigo-400 rounded-xl">
        <div className="text-center">
          <Link
            to="/"
            className="text-3xl font-bold text-indigo-600 flex items-center justify-center"
          >
            <span>JobBoard</span>
          </Link>
          <p className="text-slate-500 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form className="p-6 rounded-xl shadow-lg border border-slate-200 space-y-6">
          <div>
            <label className="text-xl font-bold text-indigo-700">Email: </label>
            <input
              type="email"
              placeholder="Enter Your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-xl font-bold text-indigo-700">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter Your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleClick}
            className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
