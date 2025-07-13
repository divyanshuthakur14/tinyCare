import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import BabyRecords from "./components/BabyRecords";
import AppointmentRequests from "./components/AppointmentRequests";
import { isLoggedIn } from "./utils/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/baby-records" element={isLoggedIn() ? <BabyRecords /> : <Login />} />
        <Route path="/appointments" element={isLoggedIn() ? <AppointmentRequests /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
