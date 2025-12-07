import React, { useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
import { HiOutlineCube } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

const TrackPackage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [data, setData] = useState(null); // later you will replace this with API

  const handleSearch = () => {
    if (!trackingNumber.trim()) {
      setData(null);
      return;
    }

    // Mock data (later replace with real API)
    setData({
      status: "In Transit",
      from: "New York, NY",
      to: "Los Angeles, CA",
      updated: "Nov 16, 2025",
    });
  };

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">Track Your Package</h1>
        <p className="text-gray-600 mb-8">
          Enter your tracking number to see real-time updates
        </p>

        {/* SEARCH BAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            placeholder="Enter tracking number (e.g., TRK-8932)"
            className="flex-1 border rounded-lg px-4 py-2 focus:ring focus:ring-orange-200 outline-none"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 justify-center"
          >
            <FiSearch className="text-lg" />
            Track
          </button>
        </div>

        {/* EMPTY STATE or RESULT */}
        {!data ? (
          <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm mt-8 text-center">
            <HiOutlineCube className="text-gray-400 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Enter a tracking number to get started
            </h2>
            <p className="text-gray-500">
              You can find your tracking number in your order confirmation email
            </p>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm mt-8">

            <h2 className="text-2xl font-semibold mb-4">Shipment Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <DetailRow label="Status" value={data.status} />
              <DetailRow label="From" value={data.from} />
              <DetailRow label="To" value={data.to} />
              <DetailRow label="Last Updated" value={data.updated} />

            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default TrackPackage;

/* Reusable row for shipment details */
const DetailRow = ({ label, value }) => (
  <div className="flex flex-col text-gray-700">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-lg font-semibold">{value}</span>
  </div>
);
