import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://tinycarebackend-ubpd.onrender.com/api/users/login", {
      email,
      password,
    });

    const token = res.data.token;
    localStorage.setItem("token", token);

    // ✅ Get user info to fetch the role
    const userRes = await axios.get("https://tinycarebackend-ubpd.onrender.com/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.setItem("role", userRes.data.role); // e.g., 'ADMIN' or 'USER'

    navigate("/dashboard"); // or redirect wherever needed
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    alert("Login failed. Please check credentials.");
  }
  console.log({ email, password });
};



  return (
    <div className="flex-1 flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Welcome Back 👶
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-pink-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
