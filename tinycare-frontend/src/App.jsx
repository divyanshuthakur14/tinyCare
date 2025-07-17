import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from './components/Home';
import BabyRecords from "./components/BabyRecords";
import AppointmentRequests from "./components/AppointmentRequests";
import { isLoggedIn } from "./utils/auth";
import AllUsers from "./components/AllUsers";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/baby-records"
            element={isLoggedIn() ? <BabyRecords /> : <Login />}
          />
          <Route
            path="/appointments"
            element={isLoggedIn() ? <AppointmentRequests /> : <Login />}
          />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/dashboard" element={<AllUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
