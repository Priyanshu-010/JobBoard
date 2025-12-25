  import { create } from "zustand";

  const useAuthStore = create((set)=>({

    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,

    login:(user, token)=>{
      localStorage.setItem("user", user.role)
      localStorage.setItem("token", token)
      set({user, token})
    },
    logout:()=>{
      localStorage.removeItem("token")
      set({user: null, token: null})
    }
  }))

  export default useAuthStore