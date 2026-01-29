import React, { useEffect, useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
import { HiOutlineCube } from "react-icons/hi";
import { FiSearch, FiEye } from "react-icons/fi";
import { callShipmentHistory } from "../../api/customer";

const shipmentData = [
  {
    id: "TRK-8932",
    from: "New York, NY",
    to: "Los Angeles, CA",
    status: "In Transit",
    service: "Express",
    date: "Nov 14, 2025",
    price: "$12.99",
  },
  {
    id: "TRK-8891",
    from: "Chicago, IL",
    to: "Miami, FL",
    status: "In Transit",
    service: "Express",
    date: "Nov 13, 2025",
    price: "$12.99",
  },
  {
    id: "TRK-8850",
    from: "Seattle, WA",
    to: "Boston, MA",
    status: "Delivered",
    service: "Same Day",
    date: "Nov 12, 2025",
    price: "$24.99",
  },
  {
    id: "TRK-8820",
    from: "Austin, TX",
    to: "Denver, CO",
    status: "Delivered",
    service: "Standard",
    date: "Nov 11, 2025",
    price: "$5.99",
  },
  {
    id: "TRK-8789",
    from: "Portland, OR",
    to: "San Diego, CA",
    status: "Delivered",
    service: "Express",
    date: "Nov 10, 2025",
    price: "$12.99",
  },
  {
    id: "TRK-8756",
    from: "Phoenix, AZ",
    to: "Dallas, TX",
    status: "Cancelled",
    service: "Standard",
    date: "Nov 9, 2025",
    price: "$5.99",
  },
  {
    id: "TRK-8723",
    from: "Atlanta, GA",
    to: "Nashville, TN",
    status: "Delivered",
    service: "Standard",
    date: "Nov 8, 2025",
    price: "$5.99",
  },
  {
    id: "TRK-8692",
    from: "San Francisco, CA",
    to: "Las Vegas, NV",
    status: "Delivered",
    service: "Express",
    date: "Nov 7, 2025",
    price: "$12.99",
  },
];

const ShipmentHistory = () => {

  useEffect(() => {
         getShipmentHistory();
  }, [])

  async function getShipmentHistory(){
    const response = await callShipmentHistory(); 
    console.log("after calling !!")
    console.log(response.data);
  }

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [serviceFilter, setServiceFilter] = useState("All Services");

  const filtered = shipmentData.filter((item) => {
    const matchesSearch = item.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || item.status === statusFilter;
    const matchesService =
      serviceFilter === "All Services" || item.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">Shipment History</h1>
        <p className="text-gray-600 mb-8">View and manage all your past shipments</p>

        {/* FILTER BAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-3 sm:items-center">

          <input
            type="text"
            placeholder="Search by tracking number..."
            className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring focus:ring-orange-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* STATUS DROPDOWN */}
          <select
            className="border rounded-lg px-4 py-2 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Cancelled</option>
          </select>

          {/* SERVICE DROPDOWN */}
          <select
            className="border rounded-lg px-4 py-2 bg-white"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option>All Services</option>
            <option>Standard</option>
            <option>Express</option>
            <option>Same Day</option>
          </select>
        </div>

        {/* SHIPMENTS LIST */}
        <div className="bg-white mt-8 p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Shipments ({filtered.length})</h2>

            <button className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700">
              ⬇ Export
            </button>
          </div>

          <div className="space-y-4">
            {filtered.map((item) => (
              <ShipmentCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* SUMMARY STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

          <SummaryCard label="Total Spent" value="$142.89" />
          <SummaryCard label="Total Shipments" value="8" />
          <SummaryCard label="Success Rate" value="95%" />
          <SummaryCard label="Avg Delivery Time" value="2.3 days" />

        </div>
      </div>
    </CustomerLayout>
  );
};

export default ShipmentHistory;

/*****************************
     REUSABLE COMPONENTS
******************************/

const ShipmentCard = ({ item }) => {
  const statusColor = {
    Delivered: "bg-green-500",
    "In Transit": "bg-orange-500",
    Cancelled: "bg-gray-500",
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">

      {/* Left area */}
      <div className="flex items-center gap-3">

        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${statusColor[item.status]}`}>
          <HiOutlineCube />
        </div>

        <div>
          <h3 className="font-semibold">{item.id}</h3>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>📍 {item.from}</span>
            <span className="mx-1">→</span>
            <span>{item.to}</span>
          </div>

          {/* Labels */}
          <div className="flex gap-2 mt-1">
            <span className={`text-white text-xs px-2 py-0.5 rounded ${statusColor[item.status]}`}>
              {item.status}
            </span>

            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
              {item.service}
            </span>
          </div>
        </div>
      </div>

      {/* Right area */}
      <div className="text-right">
        <p className="font-semibold">{item.price}</p>

        <p className="text-sm text-gray-500">📅 {item.date}</p>

        <button className="flex items-center gap-1 text-orange-600 text-sm font-medium mt-1 hover:text-orange-700">
          <FiEye />
          View
        </button>
      </div>

    </div>
  );
};

const SummaryCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);
