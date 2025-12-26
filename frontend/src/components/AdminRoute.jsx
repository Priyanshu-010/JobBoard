import React from 'react'
import useAuthStore from '../store/authStore'
import { Navigate } from 'react-router-dom'

function AdminRoute({children}) {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user);

  if(!token){
    return <Navigate to="/login" replace/>
  }

  if(user.role !== "admin"){
    return <Navigate to="/login" replace/>
  }

  return children;
}

export default AdminRoute