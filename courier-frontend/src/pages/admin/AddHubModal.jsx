import React from "react";
import { useEffect, useState } from "react";
import OlaAutocomplete from '../../components/common/OlaAutocomplete';

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
  });

  useEffect(() => {
    if (initialData) {
      setHubForm({
        hubName: initialData.hubName,
        address: initialData.address,
        city: initialData.city,
      });
      setManagerForm({
        name: initialData.managerName,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleHubChange = (e) => {
    const { name, value } = e.target;
    setHubForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(hubForm);
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

            <input
              name="hubName"
              placeholder="Hub Name"
              value={hubForm.hubName}
              onChange={handleHubChange}
              className="input w-full"
              required
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

            <input
              name="city"
              placeholder="City"
              value={hubForm.city}
              onChange={handleHubChange}
              className="input w-full"
              required
            />

          </div>

          {/* Manager Form */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Add / Update Manager</h3>

            <input
              name="name"
              placeholder="Manager Name"
              value={managerForm.name}
              onChange={handleManagerChange}
              className="input w-full"
            />

            <input
              name="email"
              placeholder="Email"
              value={managerForm.email}
              onChange={handleManagerChange}
              className="input w-full"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={managerForm.phone}
              onChange={handleManagerChange}
              className="input w-full"
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
