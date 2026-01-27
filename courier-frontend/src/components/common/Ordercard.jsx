import React from 'react'
export default function OrderCard({order,tab,onPickup,onHandover,onOverview,}) 
{
  return (
    <div className="bg-white rounded-xl border p-4 space-y-2 mb-4">
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
