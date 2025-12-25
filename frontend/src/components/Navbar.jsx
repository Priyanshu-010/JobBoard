import React from "react";
import { Link } from "react-router-dom";
// import useAuthStore from "../store/authStore";

import { FilePenLine, PlusIcon } from "lucide-react";

function Navbar() {
  // const user = useAuthStore((state) => state.user);
  // const token = useAuthStore((state) => state.token);
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <nav className="flex w-full p-8 justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-gray-300 hover:text-gray-400 px-3"
        >
          JobBoard
        </Link>
        {/* {user.role === "admin" ? (
          <div className="flex justify-between items-center gap-6 p-3 text-xl font-semibold">
            <Link
              to="/create"
              className="hover:scale-90 flex justify-between items-center hover:text-blue-400 gap-1"
            >
              <PlusIcon size={30} />
              Create
            </Link>
            <Link to="/dashboard" className="hover:text-blue-400">
              DashBoard
            </Link>
            <Link to="/admin-apps" className="hover:text-blue-400">
              Applications
            </Link>
            <button>Logout</button>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-6 p-3 text-xl font-semibold">
            <Link to="/">Jobs</Link>
            <Link to="/apps">My-Apps</Link>
            <button>Logout</button>
          </div>
        )} */}
      </nav>
    </header>
  );
}

export default Navbar;
