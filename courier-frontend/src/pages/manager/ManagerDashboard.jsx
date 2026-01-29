import React, { useState } from "react";
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
} from "recharts";
import ManagerLayout from "../../layouts/ManagerLayout";
import ChartCard from "./../../components/common/ChartCard";

const staffByLocation = [
  { location: "New York", count: 25 },
  { location: "Los Angeles", count: 20 },
  { location: "Chicago", count: 18 },
  { location: "Houston", count: 15 },
  { location: "Phoenix", count: 12 },
  { location: "Others", count: 10 },
];

const staffByRole = [
  { name: "Delivery Drivers", value: 45, color: "#f97316" },
  { name: "Warehouse Staff", value: 30, color: "#3b82f6" },
  { name: "Customer Support", value: 15, color: "#8b5cf6" },
  { name: "Management", value: 10, color: "#10b981" },
];

export default function ManagerDashboard() {
  return (
    <ManagerLayout>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Manager!</h1>
        <p className="mt-2 text-orange-100">You have 3 new actions to take</p>
        <button className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-50">
          See the actions
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Staff Distribution by Location">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={staffByLocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="location"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Staff by Role">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={staffByRole}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                dataKey="value"
              >
                {staffByRole.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {staffByRole.map((item, index) => (
              <LegendItem key={index} color={item.color} label={item.name} />
            ))}
          </div>
        </ChartCard>
      </div>
    </ManagerLayout>
  );
}

// ---------------------- Reusable Components ----------------------

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: color }}
    ></div>
    <span className="text-gray-600">{label}</span>
  </div>
);