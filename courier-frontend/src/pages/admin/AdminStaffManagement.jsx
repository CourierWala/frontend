import React from "react";
import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import StaffManagerModal from "./StaffManagerModal";

export default function AdminStaffManagement() {
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@courierwala.com",
      phone: "9876543210",
      role: "ROLE_STAFF_MANAGER",
      status: "ACTIVE",
      addresses: "Mumbai Hub",
    },
    {
      id: 2,
      name: "Anita Verma",
      email: "anita@courierwala.com",
      phone: "9876501234",
      role: "ROLE_STAFF_MANAGER",
      status: "ACTIVE",
      addresses: "Delhi Hub",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  // Open modal for CREATE
  const openCreateModal = () => {
    setSelectedManager(null);
    setIsModalOpen(true);
  };

  // Open modal for UPDATE
  const openEditModal = (manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  // Create or Update handler
  const handleSubmit = (data) => {
    if (selectedManager) {
      // UPDATE
      setManagers((prev) =>
        prev.map((m) => (m.id === selectedManager.id ? { ...m, ...data } : m)),
      );
    } else {
      // CREATE
      setManagers((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Staff Management</h1>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          <Plus size={18} /> Add Manager
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {managers.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-4">{m.name}</td>
                <td>{m.email}</td>
                <td>{m.role}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      m.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="text-right p-4">
                  <button
                    onClick={() => openEditModal(m)}
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

      {/* Modal */}
      <StaffManagerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedManager}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
