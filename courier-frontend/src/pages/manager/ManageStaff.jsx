import React, { useState, useEffect } from "react";
import { Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import ManagerLayout from "../../layouts/ManagerLayout";
import EditStaffModal from './EditStaffModal';
/* ---------------- Main Page ---------------- */

export default function ManageStaff() {
  const [activeTab, setActiveTab] = useState("STAFF");

  const [staffList, setStaffList] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@Courier-wala.com",
      phone: "+1 (555) 123-4567",
      role: "Delivery Driver",
      location: "New York Hub",
      vehicle_type: "Car",
      vehicle_num: "4444"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@Courier-wala.com",
      phone: "+1 (555) 234-5678",
      role: "Warehouse Staff",
      location: "Los Angeles Hub",
      vehicle_type: "Van",
      vehicle_num: "7452"
    },
  ]);

  const [applicants, setApplicants] = useState([
    {
      id: "a1",
      name: "Daniel Watson",
      email: "daniel.w@Courier-wala.com",
      phone: "+1 (555) 888-1234",
      role: "Delivery Driver",
      location: "Houston Hub",
      vehicle_type: "Bike",
      vehicle_num: "4512"
    },
    {
      id: "a2",
      name: "Sophia Lee",
      email: "sophia.l@Courier-wala.com",
      phone: "+1 (555) 999-5678",
      role: "Warehouse Staff",
      location: "Chicago Hub",
      vehicle_type: "Van",
      vehicle_num: "1233"
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listToRender = activeTab === "STAFF" ? staffList : applicants;

  /* ---------------- Handlers ---------------- */

  const handleAccept = (applicant) => {
    setStaffList((prev) => [...prev, applicant]);
    setApplicants((prev) => prev.filter((a) => a.id !== applicant.id));
    setIsModalOpen(false);
  };

  const handleRemove = (id) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleReject = (selected) => {
    setApplicants((prev) => prev.filter((s) => s.id !== selected.id));
    setIsModalOpen(false);
  };

  return (
    <ManagerLayout>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("STAFF")}
            className={`px-4 py-3 border-b-2 transition ${
              activeTab === "STAFF"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Current Staff Members
          </button>

          <button
            onClick={() => setActiveTab("APPLICANTS")}
            className={`px-4 py-3 border-b-2 transition ${
              activeTab === "APPLICANTS"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Pending Job Applicants
          </button>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {listToRender.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                }}
                className="p-4 md:p-6 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 font-medium">{item.name}</h3>

                    <div className="space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-orange-500" />
                        {item.email}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-orange-500" />
                        {item.phone}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-orange-500" />
                        {item.location}
                      </div>
                    </div>

                    <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {item.role}
                    </span>
                  </div>

                  {activeTab === "STAFF" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg h-fit"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditStaffModal
        isOpen={isModalOpen}
        data={selectedItem}
        mode={activeTab === "STAFF" ? "STAFF" : "APPLICANT"}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleAccept}
        onReject={activeTab === "STAFF" ? null : handleReject}
      />
    </ManagerLayout>
  );
}
