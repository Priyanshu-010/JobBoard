import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Jobs from "./pages/user/Jobs";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="text-blue-300 bg- h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
