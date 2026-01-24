import React from "react";

const AdminBillingTab = () => {
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

export default AdminBillingTab;