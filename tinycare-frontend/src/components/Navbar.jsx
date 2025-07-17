import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role"); // Should be 'ADMIN' or 'USER'

  return (
    <nav className="bg-white/80 backdrop-blur shadow-md px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          TinyCare
        </Link>
        <div className="space-x-4 text-pink-600 font-medium hidden md:flex">
          <Link to="/">Home</Link>
          <Link to="/appointments">Appointments</Link>

          {/* Conditionally show admin link */}
          {role === "ADMIN" && (
            <Link to="/admin/users">Manage Users</Link>
          )}

          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
