import React, { useEffect, useState } from "react";
import { IndianRupee, Warehouse, Users, AlertTriangle } from "lucide-react";

import {
  LineChart,
  Line,
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

import AdminLayout from "../../layouts/AdminLayout";
import ChartCard from "../../components/common/ChartCard";

import {
  getFinanceByHub,
  getParcelDeliveryStats,
  getEmployeesByHub,
  getAdminDashboardSummary,
} from "../../api/admin";

export default function AdminDashboard() {
  const dummyFinanceData = [
    { hub: "Mumbai", revenue: 420000, expenses: 310000 },
    { hub: "Delhi", revenue: 380000, expenses: 260000 },
    { hub: "Bangalore", revenue: 450000, expenses: 300000 },
    { hub: "Hyderabad", revenue: 290000, expenses: 210000 },
  ];

  const dummyParcelStatus = [
    { name: "Successful", value: 82, color: "#10b981" },
    { name: "Failed", value: 18, color: "#ef4444" },
  ];

  const dummyEmployeesByHub = [
    { hub: "Mumbai", delivery: 60, warehouse: 30, support: 20 },
    { hub: "Delhi", delivery: 55, warehouse: 25, support: 18 },
    { hub: "Bangalore", delivery: 70, warehouse: 35, support: 22 },
    { hub: "Hyderabad", delivery: 40, warehouse: 20, support: 15 },
  ];

  /* ================= STATE ================= */

  const [financeData, setFinanceData] = useState(dummyFinanceData);
  const [parcelStatus, setParcelStatus] = useState(dummyParcelStatus);
  const [employeesByHub, setEmployeesByHub] = useState(dummyEmployeesByHub);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    activeHubs: 0,
    managers: 0,
  });

  const totalRevenue = financeData.reduce((s, h) => s + h.revenue, 0);
  const totalExpenses = financeData.reduce((s, h) => s + h.expenses, 0);

  /* ================= FETCH DASHBOARD DATA ================= */

  useEffect(() => {
    // fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const financeRes = getFinanceByHub();
      const parcelRes = getParcelDeliveryStats();
      const employeesRes = getEmployeesByHub();
      const summaryRes = getAdminDashboardSummary();

      /* -------- normalize responses -------- */

      setFinanceData(financeRes?.data ?? []);

      setParcelStatus([
        {
          name: "Successful",
          value: parcelRes?.data?.successful ?? 0,
          color: "#10b981",
        },
        {
          name: "Failed",
          value: parcelRes?.data?.failed ?? 0,
          color: "#ef4444",
        },
      ]);

      setEmployeesByHub(employeesRes?.data ?? []);

      setSummary({
        totalRevenue: summaryRes?.data?.totalRevenue ?? 0,
        totalExpenses: summaryRes?.data?.totalExpenses ?? 0,
        activeHubs: summaryRes?.data?.activeHubs ?? 0,
        managers: summaryRes?.data?.managers ?? 0,
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
            value={`₹${summary.totalRevenue == 0 ? totalRevenue : summary.totalRevenue}`}
            icon={<IndianRupee className="text-green-500" />}
          />

          <MetricCard
            title="Total Expenses"
            value={`₹${summary.totalExpenses == 0 ? totalExpenses : summary.totalExpenses}`}
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

        {/* ================= LINE CHART ================= */}
        <ChartCard title="Revenue vs Expenses per Hub">
          <ResponsiveContainer width="100%" height={430}>
            <LineChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hub" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="revenue" stroke="#10b981" />
              <Line dataKey="expenses" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* ================= PIE + BAR ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Parcel Delivery Ratio">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={parcelStatus} dataKey="value" innerRadius={60}>
                  {parcelStatus.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Employees per Hub">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={employeesByHub}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hub" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="delivery" fill="#f97316" />
                <Bar dataKey="warehouse" fill="#3b82f6" />
                <Bar dataKey="support" fill="#8b5cf6" />
              </BarChart>
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
