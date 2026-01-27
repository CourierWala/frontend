import React from "react";
import { useState, useEffect } from "react";
import { Plus, Pencil } from "lucide-react";
import StaffManagerModal from "./StaffManagerModal";
import { getAllManagers, createManager, updateManager} from "../../api/admin";

export default function AdminStaffManagement() {
  const dummyMangers = [
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
  ];

  const [managers, setManagers] = useState(dummyMangers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  /*
  ================================
     GET all managers data
  ================================
  */

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      // const response = await getAllManagers();
      // setManagers(response.data);
    } catch (error) {
      console.error("Failed to fetch managers", error);
    }
  };

  /* 
  ================================
     MODAL HANDLERS
  ================================ 
  */

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

  /* 
  ===============================
     CREATE / UPDATE manager
  ================================ 
  */
  const handleSubmit = async (data) => {
    try {
      let response;
      if (selectedManager) {
        // UPDATE
        // response = await updateManager(selectedManager.id, data);
      } else {
        // CREATE
        // response = await createManager(data);
      }

      if (response["status"] === "success") {
        window.alert("save changes successfully");
      }

      if (selectedManager?.id && response["status"] === "success") {
        // UPDATE
        toast.success("Profile updated successfully");
        setManagers((prev) =>
          // Go through all managers. If this manager is the one I edited, replace its data. Otherwise, leave alone.
          prev.map((m) =>
            m.id === selectedManager.id ? { ...m, ...data } : m,
          ),
        );
      } else {
        // CREATE
        toast.success(
          "Profile created successfully" && response["status"] === "success",
        );
        setManagers((prev) => [...prev, { ...data, id: Date.now() }]);
      }

      // await fetchManagers(); // refresh list
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save failed", err);
    }
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
