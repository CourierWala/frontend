import React from 'react'
export default function OrderCard({order,tab,customerOrderActions,HubOrderActions,btnInfo}) 
{
  return(
    <div className="bg-white rounded-xl border p-4 space-y-2 mb-4">

      {/* // order id and name */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs font-medium text-orange-600 pb-1">ORDER ID : {order.Orderid}</p>
          <p className="text-sm font-medium"> Customer Name : {order.customerName}</p>
        </div>
        <span className="text-xs font-semibold text-green-600">
          {order.status}
        </span>
      </div>

       {/* // order information */}
              <p className="text-xs text-slate-600">
                📦 <span className="font-medium">Delivery:</span> {order.deliveryAddress} 📍 <span className="font-medium">Pickup:</span> {order.pickupAddress}
              </p>

              <p className="text-xs text-slate-600">
                🏢 <span className="font-medium">Source Hub:</span> {order.sourceHubName}    🏁 <span className="font-medium">Destination Hub:</span>{order.destinationHubName} 
              </p>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
            <span>📏 {order.distanceKm} km</span>
            <span>⚖️ {order.packageWeight} kg</span>
            <span>🚚 {order.deliveryType}</span>
          </div>
          <div>
            <div className="font-semibold ">
              Price - ₹{order.price}
            </div>
          </div>
          



      {/* // action tab */}
      <div className="flex gap-2 mt-2">
        {tab === "customer" && (
          <button
            onClick={customerOrderActions}
            className={`flex-1 py-2 rounded-lg  ${btnInfo?.color1} text-white text-sm`}
          >
            {btnInfo?.label1}
          </button>
        )}

        {tab === "Hub" && (
          <button
            onClick={HubOrderActions}
            className= {`flex-1 py-2 rounded-lg ${btnInfo?.color2} text-white text-sm`}
          >
            {btnInfo?.label2}
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
