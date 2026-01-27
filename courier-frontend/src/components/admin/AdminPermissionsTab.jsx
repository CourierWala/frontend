import React, { useEffect, useState } from "react";

const AdminPermissionsTab = () => {
  const [staffPermissions, setStaffPermissions] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Delivery Driver",
      canEdit: true,
      canRemove: false,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Warehouse Staff",
      canEdit: true,
      canRemove: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Delivery Driver",
      canEdit: false,
      canRemove: false,
    },
  ]);

  const togglePermission = (id, type) => {
    setStaffPermissions((prev) =>
      prev.map((staff) =>
        staff.id === id ? { ...staff, [type]: !staff[type] } : staff,
      ),
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-1">Permissions & Roles</h2>
      <p className="text-gray-500 mb-6">
        Manage access levels for staff members
      </p>

      <div className="divide-y divide-gray-200">
        {staffPermissions.map((staff) => (
          <div
            key={staff.id}
            className="flex flex-col md:flex-row md:items-center justify-between py-4"
          >
            <div>
              <p className="font-medium">{staff.name}</p>
              <p className="text-gray-500 text-sm">{staff.role}</p>
            </div>
            <div className="flex gap-4 mt-2 md:mt-0">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={staff.canEdit}
                  onChange={() => togglePermission(staff.id, "canEdit")}
                  className="h-4 w-4"
                />
                Can Edit
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={staff.canRemove}
                  onChange={() => togglePermission(staff.id, "canRemove")}
                  className="h-4 w-4"
                />
                Can Remove
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-lg shadow">
          Save Permissions
        </button>
      </div>
    </div>
  );
};

export default AdminPermissionsTab;