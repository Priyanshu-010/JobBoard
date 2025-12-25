import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore.js";

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  if(!user || !token){
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute;
