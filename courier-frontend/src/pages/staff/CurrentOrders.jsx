import { useEffect, useState } from "react";
import React from "react";
import OrderCard from "../../components/common/Ordercard";
import { DeliverCustomerOrders, DeliverHubOrders, getcurrentOrders } from "../../api/staff";
import { toast } from "react-toastify";

export default function CurrentOrders() {
  const [tab, setTab] = useState("customer");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadorders();
    //setOrders(ordersData);
  }, []);

  const loadorders = async() =>{
          const temp = await getcurrentOrders();
          setOrders(temp);
          //console.log(temp);
        }
  const customerOrders = orders.filter(o => o.status === "PICKED_UP");
  const outForDelivery = orders.filter(o => o.status === "OUT_FOR_DELIVERY");

  const CustomerhandleHandover = async(orderid) => {
    const updateResponse = await DeliverCustomerOrders(orderid);

       if(updateResponse.status == "SUCCESS")
              toast.success(updateResponse.message);
        loadorders();
            // console.log(updateResponse);
  };
  const HubhandleHandover = async (orderid) => {
    const updateResponse = await DeliverHubOrders(orderid);
    if(updateResponse.status == "SUCCESS")
         toast.success(updateResponse.message);
    loadorders();
           // console.log(updateResponse);
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
          key={order.Orderid}
          order={order}
          tab={tab}
          customerOrderActions = {tab === "customer" ? () => CustomerhandleHandover(order.Orderid) : undefined  }
          HubOrderActions = {  tab === "Hub"  ? () => HubhandleHandover(order.Orderid)  : undefined }
          btnInfo = {{ label1:"Handover",label2:"Handover",color1 :"bg-green-600",color2 :"bg-green-600"}}
        
        />
      ))}
    </div>
  );
}
