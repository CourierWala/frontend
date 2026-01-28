import { useEffect, useState } from "react";
import React from "react";
import OrderCard from "../../components/common/Ordercard";
import { ordersData } from "./orders";

export default function CurrentOrders() {
  const [tab, setTab] = useState("customer");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(ordersData);
  }, []);

  const customerOrders = orders.filter(o => o.status === "PICKED_UP");
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
      <h1 className="text-2xl font-semibold mb-4">Current Orders</h1>
      <div className="bg-slate-50 rounded-xl border mb-4 flex overflow-hidden">
        <button
          onClick={() => setTab("customer")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "customer"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}>
          Current Customer Orders
        </button>

        <button
          onClick={() => setTab("Hub")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "Hub"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}>
           Current Hub Orders ({outForDelivery.length})
        </button>
      </div>

      {(tab === "customer" ? customerOrders : outForDelivery).map(order => (
        <OrderCard
          key={order.id}
          order={order}
          tab={tab}
          onPickup={() => handlePickup(order.id)}
          onHandover={() => handleHandover(order.id)}
          btnInfo = {{ label1:"Handover",label2:"Handover",color1 :"bg-green-600",color2 :"bg-green-600"}}
        
        />
      ))}
    </div>
  );
}
