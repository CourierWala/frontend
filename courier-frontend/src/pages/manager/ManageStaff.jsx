import React, { useState, useEffect } from "react";
import { Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import ManagerLayout from "../../layouts/ManagerLayout";
import EditStaffModal from './EditStaffModal';
import { acceptStaff, getAllCurrentStaff, getAllJobApplications } from "../../api/manager";
/* ---------------- Main Page ---------------- */

export default function ManageStaff() {
  const [activeTab, setActiveTab] = useState("STAFF");

  const [staffList, setStaffList] = useState([]);

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const current = await getAllCurrentStaff();
      // console.dir(current)
      setStaffList(current.data);
      const jobApplications = await getAllJobApplications();
      // console.dir(jobApplications)
      setApplicants(jobApplications.data)
    } catch (error) {
      console.error("Failed to fetch staff", error);
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listToRender = activeTab === "STAFF" ? staffList : applicants;

  /* ---------------- Handlers ---------------- */

  const handleAccept = async (applicant) => {
    const response = await acceptStaff(applicant.Id);
    setStaffList((prev) => [...prev, applicant]);
    setApplicants((prev) => prev.filter((a) => a.Id !== applicant.Id));
    setIsModalOpen(false);
  };

  const handleRemove = (Id) => {
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
                key={item.Id}
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
                        {item.Email}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-orange-500" />
                        {item.Phone}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-orange-500" />
                        {item.Location}
                      </div>
                    </div>
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
