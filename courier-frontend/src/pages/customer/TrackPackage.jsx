import React, { useState } from "react";
import axios from "axios";
import CustomerLayout from "../../layouts/CustomerLayout";
import { HiOutlineCube } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

const TrackPackage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setData(null);
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await axios.get(
        `http://localhost:8082/api/tracking/${trackingNumber}`
      );
      console.log(response?.data)
      setData(response.data);
    } catch (err) {
      setError("Invalid tracking number or tracking not available");
    } finally {
      setLoading(false);
    }
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
        <div className="bg-white p-4 rounded-xl shadow-sm border flex gap-3">
          <input
            type="text"
            placeholder="Enter tracking number (e.g., TRK-8932)"
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-orange-200 outline-none"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-60"
          >
            <FiSearch />
            {loading ? "Tracking..." : "Track"}
          </button>
        </div>

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mt-6">
            {error}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !data && !error && (
          <div className="bg-white p-10 rounded-xl border shadow-sm mt-8 text-center">
            <HiOutlineCube className="text-gray-400 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">
              Enter a tracking number to get started
            </h2>
            <p className="text-gray-500 mt-1">
              You can find your tracking number in your order confirmation email
            </p>
          </div>
        )}

        {/* DATA VIEW */}
        {data && (
          <>
            {/* SHIPMENT SUMMARY */}
            <div className="bg-white p-6 rounded-xl border shadow-sm mt-8">
              <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailRow label="Tracking Number" value={data.trackingNumber} />
                <DetailRow label="Current Status" value={data.currentStatus} />
                <DetailRow label="From" value={data.fromCity} />
                <DetailRow label="To" value={data.toCity} />
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-white p-6 rounded-xl border shadow-sm mt-6">
              <h2 className="text-xl font-semibold mb-6">Shipment Timeline</h2>

              <div className="relative border-l-2 border-orange-200 ml-4">
                {data.timeline.map((item, index) => (
                  <div key={index} className="mb-8 ml-6">
                    <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-orange-600 rounded-full">
                      <BsCheckCircleFill className="text-white text-sm" />
                    </span>
                    <h3 className="font-semibold">{item.status}</h3>
                    <p className="text-gray-600 text-sm">{item.remarks}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </CustomerLayout>
  );
};

export default TrackPackage;

/* -------------------- SMALL COMPONENT -------------------- */

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

/* -------------------- DATE FORMATTER -------------------- */

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
