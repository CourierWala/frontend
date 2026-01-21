import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import React from "react";

export default function AdminStaffManagement() {
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@courierwala.com",
      hub: "Mumbai",
    },
    {
      id: 2,
      name: "Anita Verma",
      email: "anita@courierwala.com",
      hub: "Delhi",
    },
  ]);

  const removeManager = (id) =>
    setManagers(managers.filter((m) => m.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Staff Management</h1>
        <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md">
          <Plus size={18} /> Add Manager
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Hub</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-4">{m.name}</td>
                <td>{m.email}</td>
                <td>{m.hub}</td>
                <td className="text-right p-4">
                  <button
                    onClick={() => removeManager(m.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
