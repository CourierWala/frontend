import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const AdminProfileTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label className="text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          defaultValue="Admin User"
          className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          defaultValue="admin@courierwala.com"
          className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Role</label>
        <input
          type="text"
          value="System Administrator"
          disabled
          className="w-full mt-1 border rounded-md p-2 bg-gray-100 text-gray-500"
        />
      </div>

      <div className="pt-4">
        <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-2 rounded-md">
          Update Profile
        </button>
      </div>
    </div>
  );
};

const AdminSecurityTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label className="text-sm text-gray-600">Current Password</label>
        <input type="password" className="w-full mt-1 border rounded-md p-2" />
      </div>

      <div>
        <label className="text-sm text-gray-600">New Password</label>
        <input type="password" className="w-full mt-1 border rounded-md p-2" />
      </div>

      <div>
        <label className="text-sm text-gray-600">Confirm New Password</label>
        <input type="password" className="w-full mt-1 border rounded-md p-2" />
      </div>

      <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-2 rounded-md">
        Change Password
      </button>
    </div>
  );
};

const AdminNotificationsTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      {[
        "System alerts",
        "New manager requests",
        "Payment & billing updates",
        "Weekly performance summary",
      ].map((label) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-gray-700">{label}</span>
          <input type="checkbox" defaultChecked className="w-5 h-5" />
        </div>
      ))}
    </div>
  );
};

const BillingTab = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-1">Billing & Company Info</h2>
      <p className="text-gray-500 mb-6">
        Manage your company details and billing preferences
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Company Name"
          defaultValue="Courier wala Inc."
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          type="text"
          placeholder="Billing Address"
          defaultValue="456 Corporate Blvd, New York, NY"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          type="text"
          placeholder="Subscription Plan"
          defaultValue="Premium"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          type="text"
          placeholder="Payment Method"
          defaultValue="Credit Card"
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div className="mt-8">
        <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-lg shadow">
          Save Billing Info
        </button>
      </div>
    </div>
  );
};

const PermissionsTab = () => {
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

const AdminProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTab = () => {
    switch (activeTab) {
      case "Profile":
        return <AdminProfileTab />;
      case "Security":
        return <AdminSecurityTab />;
      case "Notifications":
        return <AdminNotificationsTab />;
      case "Billing":
        return <BillingTab />;
      case "Permissions":
        return <PermissionsTab />;
      default:
        return <AdminProfileTab />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
      <p className="text-gray-600 mb-8">
        Manage admin account, security settings, and notifications
      </p>

      {/* Tabs */}
      <div className="flex justify-between sm:justify-center gap-3 mb-8">
        {["Profile", "Security", "Notifications", "Billing", "Permissions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full border text-sm font-medium transition
                ${
                  activeTab === tab
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }
              `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {renderTab()}
    </div>
  );
};

export default AdminProfileSettings;
