import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <nav className="flex w-full p-8">
        <Link
          to="/"
          className="text-3xl font-bold text-gray-300 hover:text-gray-400 px-3"
        >
          JobBoard
        </Link>
        <div>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
