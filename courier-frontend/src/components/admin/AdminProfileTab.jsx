import React from "react";

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

export default AdminProfileTab;