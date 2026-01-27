import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OlaAutocomplete from "../../components/common/OlaAutocomplete";

export default function AddHubModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) {
  const [hubForm, setHubForm] = useState({
    hubName: "",
    address: "",
    city: "",
    latitude: null,
    longitude: null,
  });

  const [managerForm, setManagerForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "ROLE_STAFF_MANAGER",
    status: "ACTIVE",
  });

  /* ===============================
     PREFILL DATA (EDIT MODE)
  ================================ */
  useEffect(() => {
    if (initialData) {
      setHubForm({
        hubName: initialData.hubName || "",
        address: initialData.address || "",
        city: initialData.city || "",
        latitude: initialData.latitude || null,
        longitude: initialData.longitude || null,
      });

      setManagerForm({
        name: initialData.managerName || "",
        email: initialData.managerEmail || "",
        phone: initialData.managerPhone || "",
        role: "ROLE_STAFF_MANAGER",
        status: "ACTIVE",
      });
    } else {
      // Reset form when opening create modal
      setHubForm({
        hubName: "",
        address: "",
        city: "",
        latitude: null,
        longitude: null,
      });

      setManagerForm({
        name: "",
        email: "",
        phone: "",
        role: "ROLE_STAFF_MANAGER",
        status: "ACTIVE",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  /* ===============================
     HANDLERS
  ================================ */
  const handleHubChange = (e) => {
    const { name, value } = e.target;
    setHubForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ===============================
     SUBMIT
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();

    const rules = [
      [hubForm.hubName, "Hub name is required"],
      [hubForm.address, "Address is required"],
      [hubForm.city, "City is required"],
      [managerForm.name, "Manager name is required"],
      [managerForm.email, "Email is required"],
      [/^\S+@\S+\.\S+$/.test(managerForm.email), "Invalid email format"],
      [managerForm.phone, "Phone number is required"],
      [/^\d{10}$/.test(managerForm.phone), "Phone must be 10 digits"],
    ];

    for (const [condition, message] of rules) {
      if (!condition) {
        toast.warning(message);
        return;
      }
    }

    /* ✅ Build payloads directly (NO setState before submit) */
    const finalHubData = {
      ...hubForm,
    };

    const finalManagerData = {
      ...managerForm,
      password: "CwHub@1234",
      addresses: hubForm.hubName,
    };

    onSubmit(finalHubData, finalManagerData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {initialData ? "Update Hub" : "Add New Hub"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-6">
          {/* Hub Form */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Hub Details</h3>

            <label>Hub name</label>
            <input
              name="hubName"
              value={hubForm.hubName}
              onChange={handleHubChange}
              className="input w-full"
              placeholder="Hub Name"
            />

            <OlaAutocomplete
              label="Address"
              value={hubForm.address}
              onSelect={(location) =>
                setHubForm((prev) => ({
                  ...prev,
                  address: location.address,
                  latitude: location.lat,
                  longitude: location.lng,
                }))
              }
            />

            <label>City</label>
            <input
              name="city"
              value={hubForm.city}
              onChange={handleHubChange}
              className="input w-full"
              placeholder="City, PIN code"
            />
          </div>

          {/* Manager Form */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">
              Add / Update Manager
            </h3>

            <label>Name</label>
            <input
              name="name"
              value={managerForm.name}
              onChange={handleManagerChange}
              className="input w-full"
              placeholder="Manager Name"
            />

            <label>Email</label>
            <input
              name="email"
              value={managerForm.email}
              onChange={handleManagerChange}
              className="input w-full"
              placeholder="Email"
            />

            <label>Phone</label>
            <input
              name="phone"
              value={managerForm.phone}
              onChange={handleManagerChange}
              className="input w-full"
              placeholder="Phone"
            />
          </div>

          {/* Footer */}
          <div className="col-span-2 flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? "Update Hub" : "Create Hub"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
