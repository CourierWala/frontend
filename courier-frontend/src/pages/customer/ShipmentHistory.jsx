import React, { useEffect, useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
import { HiOutlineCube } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { callShipmentHistory } from "../../api/customer";
import { setShipments } from "../../store/slices/shipmentSlice";

const ShipmentHistory = () => {

  /* ================= REDUX ================= */
  const dispatch = useDispatch();

  const { list: shipments, loaded } = useSelector(
    (state) => state.shipments
  );

  /* ================= LOCAL UI STATE ================= */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ONLY ONCE ================= */
  useEffect(() => {
    if (!loaded) {
      fetchShipments();
    }
  }, [loaded]);

  async function fetchShipments() {
    try {
      setLoading(true);
      const response = await callShipmentHistory();
      dispatch(setShipments(response.data || []));
    } catch (error) {
      console.error("Failed to load shipment history", error);
    } finally {
      setLoading(false);
    }
  }

  /* ================= FILTER ================= */
  const filteredShipments = shipments.filter((item) => {
    const matchesSearch =
      item.trackingNumber
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      item.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ================= SUMMARY ================= */
  const totalShipments = shipments.length;

  const totalSpent = shipments.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  const deliveredCount = shipments.filter(
    (item) => item.orderStatus === "DELIVERED"
  ).length;

  const successRate =
    totalShipments === 0
      ? 0
      : Math.round((deliveredCount / totalShipments) * 100);

  /* ================= UI ================= */
  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">Shipment History</h1>
        <p className="text-gray-600 mb-8">
          View and manage all your past shipments
        </p>

        {/* FILTER BAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            placeholder="Search by tracking number..."
            className="flex-1 border rounded-lg px-4 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>CREATED</option>
            <option>IN_TRANSIT</option>
            <option>DELIVERED</option>
            <option>CANCELLED</option>
          </select>
        </div>

        {/* SHIPMENTS LIST */}
        <div className="bg-white mt-8 p-4 rounded-xl border shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            All Shipments ({filteredShipments.length})
          </h2>

          {loading && (
            <p className="text-center text-gray-500 py-6">
              Loading shipments...
            </p>
          )}

          {!loading && filteredShipments.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No shipments found
            </p>
          )}

          <div className="space-y-4">
            {filteredShipments.map((item) => (
              <ShipmentCard key={item.orderId} item={item} />
            ))}
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

          <SummaryCard
            label="Total Spent"
            value={`₹ ${totalSpent.toFixed(2)}`}
          />

          <SummaryCard
            label="Total Shipments"
            value={totalShipments}
          />

          <SummaryCard
            label="Success Rate"
            value={`${successRate}%`}
          />

          <SummaryCard
            label="Avg Delivery Time"
            value="N/A"
          />

        </div>

      </div>
    </CustomerLayout>
  );
};

export default ShipmentHistory;

/* ==================================================
                    COMPONENTS
================================================== */

const ShipmentCard = ({ item }) => {

  const statusColor = {
    CREATED: "bg-blue-500",
    IN_TRANSIT: "bg-orange-500",
    DELIVERED: "bg-green-500",
    CANCELLED: "bg-gray-500",
  };

  return (
    <div className="flex justify-between items-center p-4 rounded-xl border shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-white 
          ${statusColor[item.orderStatus] || "bg-gray-400"}`}
        >
          <HiOutlineCube />
        </div>

        <div>
          <h3 className="font-semibold">
            {item.trackingNumber}
          </h3>

          <p className="text-sm text-gray-600">
            📍 {item.pickupCity} → {item.deliveryCity}
          </p>

          <span
            className={`inline-block mt-1 text-xs text-white px-2 py-0.5 rounded 
            ${statusColor[item.orderStatus]}`}
          >
            {item.orderStatus}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <p className="font-semibold">
          ₹ {item.price?.toFixed(2)}
        </p>

        <p className="text-sm text-gray-500">
          📅 {item.pickupDate}
        </p>

        <button className="flex items-center gap-1 text-orange-600 text-sm mt-1">
          <FiEye /> View
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
