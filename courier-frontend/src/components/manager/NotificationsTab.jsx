import React from "react";

const NotificationsTab = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-1">Notification Settings</h2>
      <p className="text-gray-500 mb-6">Manage alerts for shipments, staff, and system updates</p>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4" defaultChecked/>
          Email Notifications - New Shipments
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4" defaultChecked/>
          SMS Notifications - Staff Activity
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4"/>
          Push Notifications - System Alerts
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4"/>
          Weekly Summary Email
        </label>
      </div>

      <div className="mt-8">
        <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-lg shadow">
          Save Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsTab;
