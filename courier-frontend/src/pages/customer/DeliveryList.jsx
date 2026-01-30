import React, { useEffect } from "react";
import { MdLocalShipping } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { callShipmentHistory } from "../../api/customer";
import { setShipments } from "../../store/slices/shipmentSlice";
import { useNavigate } from "react-router-dom";

const DeliveryList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: shipments, loaded } = useSelector(
    (state) => state.shipments
  );

  /* ================= FETCH ONCE ================= */
  useEffect(() => {
    if (!loaded) {
      fetchRecentShipments();
    }
  }, [loaded]);

  const onViewAll = () => {
            navigate("/customer/deliveries")
  }
  const fetchRecentShipments = async () => {
    try {
      const response = await callShipmentHistory();
      dispatch(setShipments(response.data || []));
    } catch (error) {
      console.error("Failed to load shipment history", error);
    }
  };

  /* ================= SHOW ONLY RECENT (TOP 5) ================= */

  const recentShipments = [...shipments]
  .sort(
    (a, b) => new Date(b.pickupDate) - new Date(a.pickupDate)
  )
  .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Shipments</h2>
        <button onClick={onViewAll} className="text-orange-600 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentShipments.length === 0 && (
          <p className="text-gray-500 text-sm">
            No recent shipments
          </p>
        )}

        {recentShipments.map((d) => (
          <div
            key={d.orderId}
            className="p-4 border rounded-lg flex justify-between items-start hover:bg-gray-50"
          >
            {/* LEFT */}
            <div className="flex gap-4">
              <div className="text-orange-500 text-2xl">
                <MdLocalShipping />
              </div>

              <div>
                <p className="font-semibold">
                  {d.trackingNumber}
                </p>

                <p className="text-sm text-gray-500">
                  📍 {d.pickupCity} → {d.deliveryCity}
                </p>

                <span
                  className={`text-sm px-2 py-1 rounded-full mt-1 inline-block ${
                    d.orderStatus === "DELIVERED"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {d.orderStatus}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right text-sm text-gray-600">
              <p>📅 {d.pickupDate}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DeliveryList;
