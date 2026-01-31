import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import ManagerLayout from "../../layouts/ManagerLayout";

import {
  getManagerOrderStatus,
  getVehicleTypeRatio,
  getDispatchTrend,
  getStaffLoad,
  getAllJobApplications,
} from "../../api/manager";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [vehicleRatioData, setVehicleRatioData] = useState([]);
  const [dispatchTrend, setDispatchTrend] = useState([]);
  const [staffLoad, setStaffLoad] = useState([]);
  const [applicants, setApplicants] = useState(0);
  const { user } = useAuth();

  const VEHICLE_COLORS = ["#3b82f6", "#10b981", "#f97316", "#ef4444"];

  const fetchStaff = async () => {
    try {
      const jobApplications = await getAllJobApplications(user.id);
      setApplicants(jobApplications.data.length);
    } catch (error) {
      console.error("Failed to fetch staff", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const orderStatusRes = await getManagerOrderStatus();
      const vehicleRatioRes = await getVehicleTypeRatio();
      const dispatchTrendRes = await getDispatchTrend();
      const staffLoadRes = await getStaffLoad();

      setOrderStatusData(orderStatusRes || []);

      // map backend data for PieChart
      const vehiclePieData = (vehicleRatioRes || []).map((v) => ({
        name: v.vehicleType,
        value: v.count,
      }));
      setVehicleRatioData(vehiclePieData);

      // dispatch trend mapping
      const trend = (dispatchTrendRes || []).map((d) => ({
        day: d.date,
        dispatched: d.count,
      }));
      setDispatchTrend(trend);

      setStaffLoad(staffLoadRes || []);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  return (
    <ManagerLayout>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Manager!</h1>
        <p className="mt-2 text-orange-100">You have {applicants} new actions to take</p>
        <button
          className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-50"
          onClick={() =>
            navigate("/manager/staff", { state: { activeTab: "APPLICANTS" } })
          }
        >
          See the actions
        </button>
      </div>

      <div className="space-y-6">
        {/* ===== TOP ROW ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ORDER STATUS */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="mb-4 font-semibold">Orders by Status (My Hub)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={orderStatusData}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* VEHICLE RATIO */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="mb-4 font-semibold">
              Delivery Staff – Vehicle Ratio
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={vehicleRatioData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {vehicleRatioData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={VEHICLE_COLORS[i % VEHICLE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DISPATCH TREND */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="mb-4 font-semibold">
            Hub Dispatch Trend (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dispatchTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="dispatched"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* STAFF LOAD */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="mb-4 font-semibold">Delivery Staff Workload</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={staffLoad} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar
                dataKey="activeOrders"
                fill="#f97316"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ManagerLayout>
  );
}
