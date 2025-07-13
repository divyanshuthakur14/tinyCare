import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function AppointmentRequests() {
  const [requests, setRequests] = useState([]);
  const [newReq, setNewReq] = useState("");

  useEffect(() => {
    axios.get("/appointments")
      .then((res) => setRequests(res.data));
  }, []);

  const createRequest = () => {
    axios.post("/appointments", { reason: newReq })
      .then(() => alert("Request sent"))
      .catch(() => alert("Failed"));
  };

  return (
    <div>
      <h2>Appointment Requests</h2>
      <input placeholder="Reason" onChange={(e) => setNewReq(e.target.value)} />
      <button onClick={createRequest}>Request</button>
      <ul>
        {requests.map((r) => (
          <li key={r.id}>{r.reason} - {r.status}</li>
        ))}
      </ul>
    </div>
  );
}
