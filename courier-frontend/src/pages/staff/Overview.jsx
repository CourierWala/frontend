import { useEffect, useState } from "react";
import React from 'react'
import OrderCard from "../../components/common/Ordercard";
import { ordersData } from "./orders";

export default function Overview() {
  const [tab, setTab] = useState("customer");
  const [orders, setOrders] = useState([]);
 


  useEffect(() => {
    setOrders(ordersData);
  }, []);

  const availableCustomerOrders = orders.filter(o => o.status === "CREATED");
  const availableHubOrders = orders.filter(o => o.status === "AT_DESTINATION_HUB");

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
        o.id === id ? { ...o, status: "AT_DESTINATION_HUB" } : o
      )
    );
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">Available Orders</h1>

     
      <div className="bg-slate-50 rounded-xl border mb-4 flex overflow-hidden
">
        <button
          onClick={() => setTab("customer")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "customer"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}
        >
          Available Customer Orders
        </button>

        <button
          onClick={() => setTab("Hub")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "Hub"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
          }`}
        >
          Available Hub Orders ({availableHubOrders.length})
        </button>
      </div>

          {(tab === "customer" ? availableCustomerOrders : availableHubOrders).length === 0 && (
          <p className="text-sm text-slate-500 text-center py-6">
            No orders found.
          </p>
        )}

      {(tab === "customer" ? availableCustomerOrders : availableHubOrders).map(order => (
                  <OrderCard
            key={order.id}
            order={order}
            tab={tab}
            onPickup={
              tab === "customer"
                ? () => handlePickup(order.id)
                : undefined
            }
            onHandover={
              tab === "Hub"
                ? () => handleHandover(order.id)
                : undefined
            }
            // onOverview={() => alert(order.id)}
          />

      ))}
    </div>
  );
}



