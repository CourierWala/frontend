import { useEffect, useState } from "react";
import React from 'react'
import OrderCard from "../../components/common/Ordercard";
import { AcceptCustomerOrders, AcceptHubOrders, getAvailableOrders } from "../../api/staff";
import { toast } from "react-toastify";

export default function Overview() {
  const [tab, setTab] = useState("customer");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //console.log("overview");
    loadorders();
  }, []);


  const loadorders = async () => {
    const temp = await getAvailableOrders();
    setOrders(temp);
  }

  const availableCustomerOrders = orders.filter(o => o.status === "CREATED");
  const availableHubOrders = orders.filter(o => o.status === "AT_DESTINATION_HUB");

  const CustomerhandleAccept = async (orderid) => {
    const updateResponse = await AcceptCustomerOrders(orderid);
    if (updateResponse.status == "SUCCESS") {
      toast.success(updateResponse.message);
    }
    loadorders();
  };

  const HubhandleAccept = async (orderid) => {
    try {
      const updateResponse = await AcceptHubOrders(orderid);
      console.log("data : ", updateResponse?.data)
      if (updateResponse.status == "SUCCESS") {
        toast.success(updateResponse.message);
      }
      loadorders();
    } catch (error) {
         console.log(error)
         console.log(error?.responce)
         console.log(error.data)
    }
    // console.log(updateResponse);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">Available Orders</h1>


      <div className="bg-slate-50 rounded-xl border mb-4 flex overflow-hidden
">
        <button
          onClick={() => setTab("customer")}
          className={`flex-1 py-2.5 text-sm font-medium ${tab === "customer"
              ? "bg-white border-b-2 border-orange-600"
              : "text-slate-500"
            }`}
        >
          Available Customer Orders ({availableCustomerOrders.length})
        </button>

        <button
          onClick={() => setTab("Hub")}
          className={`flex-1 py-2.5 text-sm font-medium ${tab === "Hub"
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
          key={order.Orderid}
          order={order}
          tab={tab}

          customerOrderActions={tab === "customer" ? () => CustomerhandleAccept(order.Orderid) : undefined}
          HubOrderActions={tab === "Hub" ? () => HubhandleAccept(order.Orderid) : undefined}
          btnInfo={{ label1: "Accept", label2: "Accept", color1: "bg-orange-600", color2: "bg-orange-600" }}
        />
      ))}
    </div>
  );
}



