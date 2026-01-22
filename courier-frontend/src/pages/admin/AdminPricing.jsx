import AdminLayout from "../../layouts/AdminLayout";
import React from "react";

export default function AdminPricing() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-xl font-semibold">Pricing Control</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-600 text-sm">Base Price (₹)</label>
            <input type="number" className="w-full border p-2 rounded-md" />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Price per KM (₹)</label>
            <input type="number" className="w-full border p-2 rounded-md" />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Handling Charge (₹)</label>
            <input type="number" className="w-full border p-2 rounded-md" />
          </div>
        </div>

        <div>
          <label className="text-gray-600 text-sm">
            Weight Slab Pricing (₹ per KG)
          </label>
          <textarea
            className="w-full border rounded-md p-2 mt-1"
            rows="3"
            placeholder="0–5kg : ₹20/kg | 5–10kg : ₹18/kg | 10kg+ : ₹15/kg"
          />
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md">
          Update Pricing
        </button>
      </div>
    </div>
  );
}
