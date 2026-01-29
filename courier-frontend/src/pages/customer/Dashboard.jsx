import React, { useEffect, useState } from "react";
import StatCard from "../customer/StatCard"
import DeliveryList from "../customer/DeliveryList";
import CustomerLayout from "../../layouts/CustomerLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Dashboard = () => {
  const navigate = useNavigate();


  const { list: shipments } = useSelector(
    (state) => state.shipments
  );

  const total = shipments.length;

  const pickup = shipments.filter(
    (s) => s.orderStatus === "CREATED"
  ).length;

  const transit = shipments.filter(
    (s) => s.orderStatus === "IN_TRANSIT"
  ).length;

  const delivered = shipments.filter(
    (s) => s.orderStatus === "DELIVERED"
  ).length;


  const onCreateNewShipMent = () => {
    navigate("/customer/book")
  }
  return (
    <CustomerLayout>

      {/* ORANGE WELCOME BANNER */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">Welcome back, .... !</h1>
        <p className="mt-2 text-orange-100">
          You have 3 packages in transit and 2 pending pickups
        </p>
        <button onClick={onCreateNewShipMent} className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-50">
          + Create New Shipment
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Shipments" value={total} iconBg="bg-blue-500" />
        <StatCard title="In Transit" value={transit} iconBg="bg-orange-500" />
        <StatCard title="Delivered" value={delivered} iconBg="bg-green-500" />
        <StatCard title="Pending" value={pickup} iconBg="bg-yellow-500" />
      </div>

      {/* RECENT SHIPMENTS */}
      <DeliveryList />

    </CustomerLayout>
  );
};

export default Dashboard;
