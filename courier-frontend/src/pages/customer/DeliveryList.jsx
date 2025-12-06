import React from "react";
import { MdLocalShipping } from "react-icons/md";

const deliveries = [
  {
    id: 1,
    trackingId: "TRK-8932",
    status: "In Transit",
    from: "New York, NY",
    to: "Los Angeles, CA",
    eta: "Nov 16, 2025",
    shipped: "Nov 14, 2025",
  },
  {
    id: 2,
    trackingId: "TRK-8891",
    status: "In Transit",
    from: "Chicago, IL",
    to: "Miami, FL",
    eta: "Nov 15, 2025",
    shipped: "Nov 13, 2025",
  },
  {
    id: 3,
    trackingId: "TRK-8850",
    status: "Delivered",
    from: "Seattle, WA",
    to: "Boston, MA",
    eta: "Nov 14, 2025",
    shipped: "Nov 12, 2025",
  },
];

const DeliveryList = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Shipments</h2>
        <button className="text-orange-600 font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {deliveries.map((d) => (
          <div key={d.id} className="p-4 border rounded-lg flex justify-between items-start hover:bg-gray-50">

            <div className="flex gap-4">
              <div className="text-orange-500 text-2xl">
                <MdLocalShipping />
              </div>

              <div>
                <p className="font-semibold">{d.trackingId}</p>

                <p className="text-sm text-gray-500">
                  📍 {d.from} → {d.to}
                </p>

                <span
                  className={`text-sm px-2 py-1 rounded-full mt-1 inline-block ${
                    d.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {d.status}
                </span>
              </div>
            </div>

            <div className="text-right text-sm text-gray-600">
              <p>ETA: {d.eta}</p>
              <p>{d.shipped}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default DeliveryList;
