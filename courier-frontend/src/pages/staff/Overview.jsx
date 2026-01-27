import { useEffect, useState } from "react";
import React from 'react'
import OrderCard from "../../components/common/Ordercard";
import { ordersData } from "./orders";

export default function Overview() {
  const [tab, setTab] = useState("available");
  const [orders, setOrders] = useState([]);
 


  useEffect(() => {
    setOrders(ordersData);
  }, []);

  const availableOrders = orders.filter(o => o.status === "CREATED");
  const acceptedOrders = orders.filter(o => o.status === "PICKED_UP");

  const handlePickup = (id) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status: "PICKED_UP" } : o
      )
    );
  };

  const handleHandover = (id) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status: "AT_SOURCE_HUB" } : o
      )
    );
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">Overview Orders</h1>

     
      <div className="bg-slate-50 rounded-xl border mb-4 flex overflow-hidden
">
        <button
          onClick={() => setTab("available")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "available"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}
        >
          Available Orders
        </button>

        <button
          onClick={() => setTab("accepted")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "accepted"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}
        >
          Accepted Orders ({acceptedOrders.length})
        </button>
      </div>

          {(tab === "available" ? availableOrders : acceptedOrders).length === 0 && (
          <p className="text-sm text-slate-500 text-center py-6">
            No orders found.
          </p>
        )}

      {(tab === "available" ? availableOrders : acceptedOrders).map(order => (
                  <OrderCard
            key={order.id}
            order={order}
            tab={tab}
            onPickup={
              tab === "available"
                ? () => handlePickup(order.id)
                : undefined
            }
            onHandover={
              tab === "accepted"
                ? () => handleHandover(order.id)
                : undefined
            }
            onOverview={() => alert(order.id)}
          />

      ))}
    </div>
  );
}



