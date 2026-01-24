import React from "react";

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

export default AdminSecurityTab;