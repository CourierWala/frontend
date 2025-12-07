import React from "react";
import StatCard from "../customer/StatCard"
import DeliveryList from "../customer/DeliveryList";
import CustomerLayout from "../../layouts/CustomerLayout";



const Dashboard = () => {
  return (
    <CustomerLayout>
      
      {/* ORANGE WELCOME BANNER */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="mt-2 text-orange-100">
          You have 3 packages in transit and 2 pending pickups
        </p>
        <button className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-50">
          + Create New Shipment
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Shipments" value="24" iconBg="bg-blue-500" />
        <StatCard title="In Transit" value="3" iconBg="bg-orange-500" />
        <StatCard title="Delivered" value="19" iconBg="bg-green-500" />
        <StatCard title="Pending" value="2" iconBg="bg-yellow-500" />
      </div>

      {/* RECENT SHIPMENTS */}
      <DeliveryList />

    </CustomerLayout>
  );
};

export default Dashboard;
