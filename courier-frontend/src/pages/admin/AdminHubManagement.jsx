import React from "react";
import { Plus, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddHubModal from './AddHubModal';
import {
  getAllHubs,
  createHub,
  updateHub,
  createManager,
  updateManager,
} from "../../api/admin";

export default function AdminHubManagement() {

  const [hubs, setHubs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null);

  /* ===============================
     FETCH HUBS
  ================================ */
  const fetchHubs = async () => {
    try {
      const response = await getAllHubs();
      setHubs(response.data);
    } catch (err) {
      toast.error("Failed to load hubs");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  /* ===============================
     MODAL HANDLERS
  ================================ */
  const openCreateModal = () => {
    setSelectedHub(null);
    setIsModalOpen(true);
  };

  const openEditModal = (hub) => {
    setSelectedHub(hub);
    setIsModalOpen(true);
  };

  /* ===============================
     CREATE / UPDATE
  ================================ */
  const handleSubmit = async (hubData, managerData) => {
    try {
      if (selectedHub) {
        // UPDATE FLOW
        // await updateHub(selectedHub.id, hubData);

        if (selectedHub.managerId) {
          // await updateManager(selectedHub.managerId, managerData);
        }

        toast.success("Hub updated successfully");
      } else {
        // CREATE FLOW
        // const managerRes = await createManager(managerData);

        // const hubPayload = {
        //   ...hubData,
        //   managerId: managerRes.id,
        // };

        // await createHub(hubPayload);

        toast.success("Hub created successfully");
      }

      setIsModalOpen(false);
      fetchHubs();
    } catch (err) {
      toast.error("Operation failed");
      console.error(err);
    }
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
              <th className="p-4">ID</th>
              <th>Hub Name</th>
              <th>City</th>
              <th>Manager</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {hubs.map((hub) => (
              <tr key={hub.hubId} className="border-t">
                <td className="p-4">{hub.hubId}</td>
                <td>{hub.hubName}</td>
                <td>{hub.hubCity}</td>
                <td>{hub.managerName}</td>
                <td>{hub.managerEmail}</td>
                <td>{hub.managerPhone}</td>
                <td className="text-right p-4">
                  <button
                    onClick={() => openEditModal(hub)}
                    className="text-blue-600"
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
