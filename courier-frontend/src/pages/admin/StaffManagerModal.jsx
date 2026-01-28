import React, { useEffect, useState } from "react";
import "./StaffManagerFormStyles.css";
import { toast } from "react-toastify";

const StaffManagerModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const EMPTY_FORM = {
    managerName: "",
    managerEmail: "",
    managerPhone: "",
    managerRole: "ROLE_STAFF_MANAGER",
    managerStatus: "ACTIVE",
  };

  const [formData, setFormData] = useState(EMPTY_FORM);

  // const STATUSES = ["ACTIVE", "INACTIVE"];
  const STATUSES = ["ACTIVE"];

  useEffect(() => {
    if (initialData) {
      setFormData({
        managerName: initialData.managerName ?? "",
        managerEmail: initialData.managerEmail ?? "",
        managerPhone: initialData.managerPhone ?? "",
        managerRole: initialData.managerRole ?? "ROLE_STAFF_MANAGER",
        managerStatus: initialData.managerStatus ?? "ACTIVE",
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (formData) => {
    const rules = [
      [formData.managerName, "Name is required"],
      [formData.managerEmail, "Email is required"],
      [/^\S+@\S+\.\S+$/.test(formData.managerEmail), "Invalid email format"],
      [formData.managerPhone, "Phone number is required"],
      [/^\d{10}$/.test(formData.managerPhone), "Phone must be 10 digits"],
    ];

    for (const [condition, message] of rules) {
      if (!condition) {
        return message; // return first error
      }
    }

    return null; // valid
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEditMode = Boolean(initialData?.managerId);

    const error = validateForm(formData, isEditMode);
    if (error) {
      toast.warning(error);
      return;
    }
    // window.alert("success");
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {initialData ? "Update Staff Manager" : "Add Staff Manager"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <label htmlFor="managerName">Name</label>
          <input
            type="text"
            name="managerName"
            placeholder="Full Name"
            value={formData.managerName}
            onChange={handleChange}
            className="w-full input"
            // required
          />

          <label htmlFor="managerEmail">Email</label>
          <input
            type="text"
            name="managerEmail"
            placeholder="Email Address"
            value={formData.managerEmail}
            onChange={handleChange}
            className="w-full input"
            // required
          />

          <label htmlFor="managerPhone">Phone</label>
          <input
            type="tel"
            name="managerPhone"
            placeholder="Phone Number"
            value={formData.managerPhone}
            onChange={handleChange}
            className="w-full input"
            // required
          />

          {!initialData && (
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="managerRole">Role</label>
              <label htmlFor="managerStatus">Status</label>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {!initialData && (
              <>
                <input
                  type="text"
                  name="managerRole"
                  placeholder="Role"
                  value={formData.managerRole}
                  onChange={handleChange}
                  className="w-full input"
                  readOnly
                />

                <select
                  name="managerStatus"
                  value={formData.managerStatus}
                  onChange={handleChange}
                  className="input"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffManagerModal;
