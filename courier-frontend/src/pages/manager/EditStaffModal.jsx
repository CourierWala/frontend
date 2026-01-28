import React, { useState, useEffect } from "react";

export default function EditStaffModal({
  isOpen,
  onClose,
  data,
  mode,
  onAccept,
  onReject
}) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(data || {});
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50">
      <div className="bg-white w-full md:max-w-lg rounded-t-xl md:rounded-xl p-6">
        <h2 className="text-xl mb-4 font-bold">
          {mode === "APPLICANT"
            ? "Review Job Application"
            : "Edit Staff Member"}
        </h2>

        {["name", "email", "phone", "role", "location", "vehicle_type", "vehicle_num"].map((field) => (
          <>
            <label htmlFor={field} className="text-xl font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              key={field.length}
              value={form[field] || ""}
              className="w-full mb-3 p-2 border rounded"
              placeholder={field}
              readOnly
            />
          </>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Close
          </button>

          {mode === "APPLICANT" && (
            <button
              onClick={() => onAccept(form)}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Accept
            </button>
          )}

          {onReject !== null && (
            <button
              onClick={() => onReject(form)}
              className="px-4 py-2 bg-orange-600 text-white rounded"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
