import React, { useEffect, useState } from "react";
import { fetchOrders, getOrderDetails, handoverOrder, pickupOrder } from "../../api/staff";


const mockOrders = [
  {
    id: "ORDER-284",
    customer: "Om Kharmate",
    pickup: "123 Vaduj, Satara",
    delivery: "45 Ram Charan, Raigad",
    distance: "100 km",
    weight: "2.5 kg",
    amount: 45,
    status: "IN_TRANSEIT",
  },
  {
    id: "ORDER-2846",
    customer: "Sarah Khan",
    pickup: "789 Rajarampuri, Kolhapur",
    delivery: "321 Radhika Patil, Satara",
    distance: "150 km",
    weight: "1.8 kg",
    amount: 52,
    status: "OUT_FOR_DELIVERY",
  },
];

export default function Overview() {
  const [tab, setTab] = useState("available");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

 
  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error("Unable to load orders");
    }
  };

  useEffect(() => {
    
    setOrders(mockOrders);
    // loadOrders();        // enable when backend ready
  }, []);

  /*  DERIVED ORDERS  */
  const availableOrders = orders.filter((o) => o.status === "IN_TRANSEIT");
  const acceptedOrders = orders.filter((o) => o.status === "OUT_FOR_DELIVERY");

  
  const handlePickup = async (orderId) => {
    try {
      // await pickupOrder(orderId); // real API
      // loadOrders();               // refresh from DB
      window.alert("order picked" + orderId);
    } catch (error) {
      window.alert("Pickup failed");
    }
  };


  /*  HANDOVER */
  const handleHandover = (orderid) => {
    try {
       //await handoverOrder(orderId); // real API
      // loadOrders();               // refresh from DB
      window.alert("order handover" + orderid);
    } catch (error) {
      window.alert("handover failed");
    }
  };
  const onOverview = (orderid) => {
    try {
      // await getOrderDetails(orderId); // real API
      
      window.alert("order overview" + orderid);
    } catch (error) {
      window.alert("order fetch fails");
    } 
  };

  

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">WELCOME TO DELIVERY STAFF</h1>
        <p className="text-sm text-slate-500">
          Logged in as <span className="text-sky-600">Mike Wilson</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 rounded-xl border mb-4 flex">
        <button
          onClick={() => setTab("available")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "available"
              ? "bg-white border-b-2 border-orange-600 rounded-l-xl"
              : "text-slate-500"
          }`}
        >
          Available Orders
        </button>

        <button
          onClick={() => setTab("accepted")}
          className={`flex-1 py-2.5 text-sm font-medium ${
            tab === "accepted"
              ? "bg-white border-b-2 border-orange-600 rounded-r-xl"
              : "text-slate-500"
          }`}
        >
          Accepted Orders ({acceptedOrders.length})
        </button>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {(tab === "available" ? availableOrders : acceptedOrders).length ===
          0 &&(
          <p className="text-sm text-slate-500">No orders found.</p>
        )}

        {(tab === "available"
          ? availableOrders
          : acceptedOrders
        ).map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            tab={tab}
            onPickup={() => handlePickup(order.id)}
            onHandover={() => handleHandover(order.id)}
            onOverview={() => {
              setSelectedOrder(order);
              setShowDetails(true);
            }}
          />
        ))}
      </div>

      {/* Details Modal */}
      {showDetails && selectedOrder && (
        <Modal onClose={() => setShowDetails(false)}>
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <p><b>ID:</b> {selectedOrder.id}</p>
          <p><b>Customer:</b> {selectedOrder.customer}</p>
          <p><b>Status:</b> {selectedOrder.status}</p>
          <p><b>Amount:</b> ${selectedOrder.amount}</p>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- ORDER CARD ---------------- */
function OrderCard({ order, tab, onPickup, onHandover, onOverview }) {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-2">
      <div className="flex justify-between">
        <div>
          <p className="text-xs font-semibold text-orange-600">{order.id}</p>
          <p className="text-sm font-medium">{order.customer}</p>
        </div>
        <span className="text-xs font-semibold text-green-600">
          {order.status}
        </span>
      </div>

      <p className="text-xs text-slate-600">📍 Pickup: {order.pickup}</p>
      <p className="text-xs text-slate-600">📦 Delivery: {order.delivery}</p>

      <div className="flex gap-2 mt-2">
        {tab === "available" && (
          <button
            onClick={onPickup}
            className="flex-1 py-2 rounded-lg bg-orange-600 text-white text-sm"
          >
            Pickup
          </button>
        )}

        {tab === "accepted" && (
          <button
            onClick={onHandover}
            className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm"
          >
            Handover
          </button>
        )}

        <button
          onClick={onOverview}
          className="flex-1 py-2 rounded-lg bg-slate-100 text-sm"
        >
          Overview
        </button>
      </div>
    </div>
  );
}

/* ---------------- MODAL ---------------- */
function Modal({ children, onClose }){
  return(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
