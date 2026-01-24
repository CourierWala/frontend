import React from "react";
import { Plus, Pencil } from "lucide-react";
import { useState } from "react";
import AddHubModal from "./AddHubModal";

export default function AdminHubManagement() {
  const [hubs, setHubs] = useState([
    {
      id: 1,
      hubName: "Mumbai Hub",
      address: "Andheri East",
      city: "Mumbai",
      managerName: "Rahul Sharma",
    },
    {
      id: 2,
      hubName: "Delhi Hub",
      address: "Dwarka",
      city: "Delhi",
      managerName: "Anita Verma",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null);

  const openCreateModal = () => {
    setSelectedHub(null);
    setIsModalOpen(true);
  };

  const openEditModal = (hub) => {
    setSelectedHub(hub);
    setIsModalOpen(true);
  };

  const handleSubmit = (hubData, managerData) => {
    console.dir(hubData);
    console.dir(managerData);
    if (selectedHub) {
      // UPDATE
      setHubs((prev) =>
        prev.map((h) => (h.id === selectedHub.id ? { ...h, ...hubData } : h)),
      );
    } else {
      // CREATE
      setHubs((prev) => [...prev, { ...hubData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Hub Management</h1>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          <Plus size={18} /> Add Hub
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Hub Name</th>
              <th>City</th>
              <th>Manager</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {hubs.map((hub) => (
              <tr key={hub.id} className="border-t">
                <td className="p-4">{hub.hubName}</td>
                <td>{hub.city}</td>
                <td>{hub.managerName}</td>
                <td className="text-right p-4">
                  <button
                    onClick={() => openEditModal(hub)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddHubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedHub}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
