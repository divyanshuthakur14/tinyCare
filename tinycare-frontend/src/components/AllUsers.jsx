import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = () => {
      fetch("https://tinycarebackend-ubpd.onrender.com/api/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(setUsers)
        .catch(err => console.error("Failed to fetch users", err));
    };

    if (token) fetchUsers();
  }, [token]); // ✅ dependency added

  const promoteToAdmin = async (userId) => {
    try {
      const res = await fetch(`https://tinycarebackend-ubpd.onrender.com/api/users/${userId}/role?role=ADMIN`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert("User promoted to ADMIN");
        // Refresh the list
        const updated = users.map(user =>
          user.id === userId ? { ...user, role: "ADMIN" } : user
        );
        setUsers(updated);
      } else {
        alert("Failed to promote user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-pink-600">All Users</h2>
      <table className="w-full text-left border border-gray-300 rounded-xl">
        <thead>
          <tr className="bg-pink-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-gray-200">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                {user.role === "USER" ? (
                  <button
                    onClick={() => promoteToAdmin(user.id)}
                    className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
                  >
                    Make Admin
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">Admin</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
