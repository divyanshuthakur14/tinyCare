// src/components/Signup.js
import React, { useState } from "react";
import axios from "../api/axiosInstance";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("/api/users", {
        name,
        email,
        password,
        role: "USER" // or "ADMIN" if needed
      });
      alert("Signup successful! Now login.");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Signup</h2>
      <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            /><br /><br />
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Signup;
