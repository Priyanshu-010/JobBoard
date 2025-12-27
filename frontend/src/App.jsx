import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Jobs from "./pages/user/Jobs";
import JobDetails from "./pages/user/JobDetails";
import MyApplications from "./pages/user/MyApplications";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobApplications from "./pages/admin/AdminJobApplications";
import CreateJob from "./pages/admin/CreateJob";
import EditJob from "./pages/admin/EditJob";

import Login from "./pages/Login";
import Register from "./pages/register";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
function App() {
  return (
    <div className="text-blue-300 bg-black min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <Routes>
          {/* AUTH */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps"
            element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-apps"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminJobApplications />
                </AdminRoute>
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
          <Route
            path="/edit/:jobId"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <EditJob />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
