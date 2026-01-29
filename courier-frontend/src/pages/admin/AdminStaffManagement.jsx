import React from "react";
import { useState, useEffect } from "react";
import { Plus, Pencil } from "lucide-react";
import StaffManagerModal from "./StaffManagerModal";
import { getAllManagers, createManager, updateManager } from "../../api/admin";
import { toast } from "react-toastify";

export default function AdminStaffManagement() {
  const [managers, setManagers] = useState([]);
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
      const response = await getAllManagers();
      setManagers(response.data);
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
        console.dir(data);
        const update = {
          name : data['managerName'],
          email : data['managerEmail'],
          phone : data['managerPhone'],
        }
        response = await updateManager(selectedManager.managerId, update);
      } else {
        // CREATE
        console.dir(data);
        response = await createManager(data);
      }
      console.dir(response);
      if (response["status"] === 200) {
        window.alert(response.data.message);
      }

      if (selectedManager?.managerId && response["status"] === 200) {
        // UPDATE
        toast.success(response.data.message);
        setManagers((prev) =>
          // Go through all managers. If this manager is the one I edited, replace its data. Otherwise, leave alone.
          prev.map((m) =>
            m.id === selectedManager.id ? { ...m, ...data } : m,
          ),
        );
      } else {
        // CREATE
        toast.success(response.data.message);
        setManagers((prev) => [...prev, { ...data}]);
      }

      setIsModalOpen(false);
      await fetchManagers(); // refresh list
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
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Hub Name</th>
              <th>Status</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {managers.map((m) => (
              <tr key={m.managerId} className="border-t">
                <td className="p-4">{m.managerId}</td>
                <td>{m.managerName}</td>
                <td>{m.managerEmail}</td>
                <td>{m.hubName}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      m.managerStatus == "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.managerStatus}
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
