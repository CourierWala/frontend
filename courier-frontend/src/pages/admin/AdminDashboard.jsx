import React, { useEffect, useState } from "react";
import { IndianRupee, Warehouse, Users, AlertTriangle } from "lucide-react";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

import ChartCard from "../../components/common/ChartCard";

import {
  getFinanceByHub,
  getParcelDeliveryStats,
  getEmployeesByHub,
  getAdminDashboardSummary,
} from "../../api/admin";

export default function AdminDashboard() {
  /* ================= STATE ================= */

  const [financeData, setFinanceData] = useState([]);
  const [parcelStatus, setParcelStatus] = useState([]);
  const [employeesByHub, setEmployeesByHub] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    activeHubs: 0,
    managers: 0,
  });

  /* ================= DERIVED TOTALS ================= */

  const totalRevenue = financeData.reduce(
    (sum, h) => sum + (h.revenue || 0),
    0
  );

  const totalExpenses = financeData.reduce(
    (sum, h) => sum + (h.expenses || 0),
    0
  );

  /* ================= FETCH DASHBOARD DATA ================= */

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // const [
      //   financeRes,
      //   parcelRes,
      //   employeesRes,
      //   summaryRes,
      // ] = await Promise.all([
      //   getFinanceByHub(),
      //   getParcelDeliveryStats(),
      //   getEmployeesByHub(),
      //   getAdminDashboardSummary(),
      // ]);

      const parcelRes = await getParcelDeliveryStats();
      const employeesRes = await getEmployeesByHub();
      const summaryRes = await getAdminDashboardSummary();

      setParcelStatus([
        {
          name: "Successful",
          value: parcelRes?.successful || 0,
          color: "#10b981",
        },
        {
          name: "Failed",
          value: parcelRes?.failed || 0,
          color: "#ef4444",
        },
      ]);

      setEmployeesByHub(employeesRes || []);

      setSummary({
        totalRevenue: summaryRes?.totalRevenue || 0,
        totalExpenses: summaryRes?.totalExpenses || 0,
        activeHubs: summaryRes?.activeHubs || 0,
        managers: summaryRes?.managers || 0,
      });
    } catch (error) {
      console.error("Failed to load admin dashboard data", error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* ================= METRIC CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Revenue"
            value={`₹${summary.totalRevenue || totalRevenue}`}
            icon={<IndianRupee className="text-green-500" />}
          />

          <MetricCard
            title="Total Expenses"
            value={`₹${summary.totalExpenses || totalExpenses}`}
            icon={<AlertTriangle className="text-red-500" />}
          />

          <MetricCard
            title="Active Hubs"
            value={summary.activeHubs}
            icon={<Warehouse className="text-orange-500" />}
          />

          <MetricCard
            title="Managers"
            value={summary.managers}
            icon={<Users className="text-blue-500" />}
          />
        </div>

        {/* ================= PIE + BAR ================= */}
        {/* EMPLOYEES BY HUB */}
        <ChartCard title="Employees per Hub">
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={employeesByHub}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hub" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="delivery" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PARCEL STATUS */}
          <ChartCard title="Parcel Delivery Ratio">
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie
                  data={parcelStatus}
                  dataKey="value"
                  innerRadius={60}
                >
                  {parcelStatus.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </>
  );
}

/* ================= METRIC CARD ================= */

const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-2">{icon}</div>
    <div className="text-gray-600 text-sm">{title}</div>
    <div className="text-2xl font-semibold">{value}</div>
  </div>
);



