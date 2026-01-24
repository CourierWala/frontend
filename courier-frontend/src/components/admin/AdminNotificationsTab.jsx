import React from "react";

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

export default AdminNotificationsTab;