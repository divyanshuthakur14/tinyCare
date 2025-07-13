import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { logout } from "../utils/auth";

export default function BabyRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("/api/babies")
      .then((res) => setRecords(res.data))
      .catch(() => alert("Auth failed or no records"));
  }, []);

  return (
    <div>
      <h2>Baby Health Records</h2>
      <button onClick={logout}>Logout</button>
      <ul>
        {records.map((r) => (
          <li key={r.id}>
            ID: {r.id} — {r.babyName} — {r.ageInMonths} months — {r.weight} kg<br />
            Notes: {r.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}
