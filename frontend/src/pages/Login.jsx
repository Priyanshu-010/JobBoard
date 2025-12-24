import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import axiosInstance from "../api/axios";
import {toast} from "react-hot-toast"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      login(res.data.user, res.data.token)
      toast.success("Login Successfull")
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <label>Email: </label>
        <input
          type="email"
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label>password: </label>
        <input
          type="passwrod"
          placeholder="Enter Your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default Login;
