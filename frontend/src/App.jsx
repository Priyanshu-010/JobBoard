import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Jobs from "./pages/user/Jobs";

import CreateJob from "./pages/admin/CreateJob"

import Login from "./pages/Login";
import Register from "./pages/register";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
function App() {
  return (
    <div className="text-blue-300 bg-black h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CreateJob />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
