import React, { useEffect, useState } from "react";
import "./StaffManagerFormStyles.css";
import OlaAutocomplete from "./../../components/common/OlaAutocomplete";
import { toast } from "react-toastify";

const StaffManagerModal = ({
  isOpen,
  onClose,
  initialData = null,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "ROLE_STAFF_MANAGER",
    status: "ACTIVE",
    address: "",
  });

  const ROLES = ["ROLE_STAFF_MANAGER"];

  const STATUSES = ["ACTIVE", "INACTIVE"];

  useEffect(() => {
    if (initialData != null) {
      setFormData({
        ...initialData,
        password: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rules = [
      [formData.name, "Name is required"],
      [formData.email, "Email is required"],
      [/^\S+@\S+\.\S+$/.test(formData.email), "Invalid email format"],
      [
        formData.password.length < 8,
        "Your password must be at least 8 characters long.",
      ],
      [
        !/[a-z]/.test(formData.password),
        "Your password must contain at least one lowercase letter.",
      ],
      [
        !/[A-Z]/.test(formData.password),
        "Your password must contain at least one uppercase letter.",
      ],
      [
        !/[0-9]/.test(formData.password),
        "Your password must contain at least one digit.",
      ],
      [
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
          formData.password,
        ),
        "Your password must contain at least one special character.",
      ],
      [formData.phone, "Phone number is required"],
      [!/^\d{10}$/.test(formData.phone), "Phone must be 10 digits"],
      [formData.address, "Address is required"],
    ];

    for (const [condition, message] of rules) {
      if (!condition) {
        toast.warning(message);
        return;
      }
    }

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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full input"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full input"
            required
          />

          <label htmlFor="password">Password</label>
          {!initialData && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full input"
              required
            />
          )}

          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full input"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="role">Role</label>
            <label htmlFor="status">Status</label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.addresses}
            onChange={handleChange}
            className="w-full input min-h-[80px]"
          />

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
