import React from "react";
import {BarChart,Bar,LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";
import EarningsDetails from "./EarningsDetails";


// Daily earnings (weekly)
const dailyEarningsData = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 180 },
  { day: "Wed", amount: 150 },
  { day: "Thu", amount: 200 },
  { day: "Fri", amount: 220 },
  { day: "Sat", amount: 90 },
  { day: "Sun", amount: 60 },
];

// Monthly earnings (yearly trend)
const monthlyEarningsData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1350 },
  { month: "Mar", amount: 1600 },
  { month: "Apr", amount: 1800 },
  { month: "May", amount: 2100 },
  { month: "Jun", amount: 1950 },
  { month: "Jul", amount: 2250 },
  { month: "Aug", amount: 2400 },
  { month: "Sep", amount: 2600 },
  { month: "Oct", amount: 2900 },
  { month: "Nov", amount: 3100 },
  { month: "Dec", amount: 3400 },
];

export default function Earnings() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-xl font-semibold">CURRENT EARNINGS</h1>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Today" amount="$145" subtitle="12 deliveries" />
        <StatCard
          title="This Week"
          amount="$1,087"
          subtitle="+12% from last week"
        />
        <StatCard title="This Month" amount="$2,340" subtitle="87 deliveries" />
        <StatCard title="All Time" amount="$12,847" subtitle="Total earnings" />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Earnings Bar Chart */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">
            Daily Earnings (This Week)
          </h2>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEarningsData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Earnings Line Chart */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <h2 className="text-sm font-semibold mb-2">
            Monthly Earnings Trend
          </h2>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyEarningsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>


      <EarningsDetails
      />

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border shadow-sm p-4 overflow-x-auto">
        <h2 className="text-sm font-semibold mb-3">Recent Transactions</h2>

        <table className="min-w-full text-xs">
          <thead className="text-slate-500">
            <tr>
              <th className="text-left py-1.5">TRANSACTION ID</th>
              <th className="text-left py-1.5">ORDER ID</th>
              <th className="text-left py-1.5">DATE</th>
              <th className="text-left py-1.5">AMOUNT</th>
              <th className="text-left py-1.5">STATUS</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {["2847", "2846", "2845", "2844"].map((id, i) => (
              <tr key={id} className="border-t">
                <td className="py-2">TXN-123{i}</td>
                <td className="py-2 text-orange-600">ORDER-{id}</td>
                <td className="py-2">2025-12-0{i + 4}</td>
                <td className="py-2 text-green-600">$4{i + 1}.00</td>
                <td className="py-2">
                  <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[11px]">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */
function StatCard({ title, amount, subtitle }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 text-sm">
      <p className="text-slate-500">{title}</p>
      <p className="text-xl font-semibold mt-2">{amount}</p>
      <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}
