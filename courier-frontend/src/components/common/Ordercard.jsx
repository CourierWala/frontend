import React from 'react'
export default function OrderCard({order,tab,onPickup,onHandover}) 
{
  return (
    <div className="bg-white rounded-xl border p-4 space-y-2 mb-4">

      {/* // order id and name */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs font-medium text-orange-600 pb-1">{order.id}</p>
          <p className="text-sm font-medium"> customer Name - {order.customer}</p>
        </div>
        <span className="text-xs font-semibold text-green-600">
          {order.status}
        </span>
      </div>

       {/* // order information */}
              <p className="text-xs text-slate-600">
                📦 <span className="font-medium">Delivery:</span> {order.delivery} 📍 <span className="font-medium">Pickup:</span> {order.pickup}
              </p>

              <p className="text-xs text-slate-600">
                🏢 <span className="font-medium">Source Hub:</span> {order.sourceHub}    🏁 <span className="font-medium">Destination Hub:</span>{order.destinationHub} 
              </p>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
            <span>📏 {order.distanceKm} km</span>
            <span>⚖️ {order.packageWeight} kg</span>
            <span>🚚 {order.deliveryType}</span>
          </div>
          <div>
            <div className="font-semibold ">
              price - ₹{order.price}
            </div>
          </div>
          



      {/* // action tab */}
      <div className="flex gap-2 mt-2">
        {tab === "customer" && (
          <button
            onClick={onPickup}
            className="flex-1 py-2 rounded-lg bg-orange-600 text-white text-sm"
          >
            Accept
          </button>
        )}

        {tab === "Hub" && (
          <button
            onClick={onHandover}
            className="flex-1 py-2 rounded-lg bg-orange-600 text-white text-sm"
          >
            Accept
          </button>
        )}

        {/* <button
          onClick={onOverview}
          className="flex-1 py-2 rounded-lg bg-slate-100 text-sm"
        >
          Overview
        </button> */}
      </div>
    </div>
  );
}
