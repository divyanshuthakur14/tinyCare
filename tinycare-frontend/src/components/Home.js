import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to TinyCare</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")} style={{ margin: "10px" }}>Signup</button>
    </div>
  );
};

export default Home;
