import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import React from "react";

export default function AdminHubManagement() {
  const [hubs, setHubs] = useState([
    { id: 1, name: "Mumbai Hub", location: "Mumbai", status: "Active" },
    { id: 2, name: "Delhi Hub", location: "Delhi", status: "Active" },
    { id: 3, name: "Hyderabad Hub", location: "Hyderabad", status: "Inactive" },
  ]);

  const removeHub = (id) => setHubs(hubs.filter((hub) => hub.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Hub Management</h1>
        <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md">
          <Plus size={18} /> Add Hub
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Hub Name</th>
              <th>Location</th>
              <th>Status</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {hubs.map((hub) => (
              <tr key={hub.id} className="border-t">
                <td className="p-4">{hub.name}</td>
                <td>{hub.location}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      hub.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {hub.status}
                  </span>
                </td>
                <td className="text-right p-4">
                  <button
                    onClick={() => removeHub(hub.id)}
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
