import React, { useEffect, useState } from "react";
import { fetchShipmentHistory } from "../../api/staff";
import { ordersData } from "./orders";

export default function StaffShipmentHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  
//   const historyorders =[
//   {
//     "id": "ORDER-2",
//     "customer": "Om Kharmate",
//     "pickup": "123 Vaduj, Satara",
//     "delivery": "45 Ram Charan, Raigad",
//     "distance": "100 km",
//     "weight": "2.5 kg",
//     "amount": 45,
//     "status": "DELIVERED"
//   },
//   {
//     "id": "ORDER-3",
//     "customer": "Ram Charan",
//     "pickup": "Kolhapur",
//     "delivery": "Mumbai",
//     "distance": "210 km",
//     "weight": "3 kg",
//     "amount": 60,
//     "status": "DELIVERED"
//   }
// ]



  useEffect(() => {
    console.log("staffshipmentHistory");
     const deliveredOrders = ordersData.filter(
      (o) => o.status === "DELIVERED"
    );
    setOrderHistory(deliveredOrders);
    //later call api
    //loadhistory()
  }, []);

  const loadHistory = async () => {
    try {
      const data = await fetchShipmentHistory();
      setOrderHistory(data);
    } catch (error) {
      console.error("Unable to load shipment history");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">ORDER HISTORY</h1>
        <p className="text-sm text-slate-500">
          View all your past deliveries
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col md:flex-row gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Search by Order ID or Customer name..."
        />
        <button className="px-4 py-2 rounded-lg bg-slate-100 text-sm">
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {orderHistory.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border shadow-sm p-4 md:p-5 flex flex-col gap-2"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="text-xs font-semibold text-orange-600">
                  {order.id}
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {order.customer}
                </p>
              </div>

              <div className="flex flex-col items-end text-xs">
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold mb-1">
                  {order.status}
                </span>
                <span className="text-green-600 font-medium">
                  ₹{order.amount}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>
                <span className="mr-1">📍</span>
                <span className="font-medium">Pickup:</span> {order.pickup}
              </p>
              <p>
                <span className="mr-1">📦</span>
                <span className="font-medium">Delivery:</span> {order.delivery}
              </p>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
              <span>
                {order.distance} • {order.weight}
              </span>
              <button className="text-orange-600 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
