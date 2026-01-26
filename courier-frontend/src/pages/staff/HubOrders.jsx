import { useEffect, useState } from "react";
import React from "react";
import OrderCard from "../../components/common/Ordercard";
import { ordersData } from "./orders";

export default function HubOrders() {
  const [tab, setTab] = useState("available");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(ordersData);
  }, []);

  const hubOrders = orders.filter(o => o.status === "AT_DESTINATION_HUB");
  const outForDelivery = orders.filter(o => o.status === "OUT_FOR_DELIVERY");

  const handlePickup = (id) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status: "OUT_FOR_DELIVERY" } : o
      )
    );
  };

  const handleHandover = (id) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status: "DELIVERED" } : o
      )
    );
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">Hub Orders</h1>
      <div className="bg-slate-50 rounded-xl border mb-4 flex overflow-hidden">
        <button
          onClick={() => setTab("available")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "available"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}>
          Hub Orders
        </button>

        <button
          onClick={() => setTab("accepted")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "accepted"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}>
          Out For Delivery ({outForDelivery.length})
        </button>
      </div>

      {(tab === "available" ? hubOrders : outForDelivery).map(order => (
        <OrderCard
          key={order.id}
          order={order}
          tab={tab}
          onPickup={() => handlePickup(order.id)}
          onHandover={() => handleHandover(order.id)}
          onOverview={() => alert(order.id)}
        />
      ))}
    </div>
  );
}
