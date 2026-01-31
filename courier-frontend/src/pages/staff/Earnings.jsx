import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EarningsDetails from "./EarningsDetails";
import { fetchWeeklyEarnings } from "../../api/staff";

let dailyEarningsData;
const loadWeeklyEarnings = async () => {
  return await fetchWeeklyEarnings(4);
};
// Daily earnings (weekly)

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
  const [dailyEarningsData, setDailyEarningsData] = useState([]);
  const [totalEarningThiWeek, setTotalEarningThiWeek] = useState(0);
  const [todayEarning, setTodayEarning] = useState(0);
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = dayMap[new Date().getDay()];

  useEffect(() => {
    const fetchEarnings = async () =>{
      console.log("earnings");

      const data = await loadWeeklyEarnings();
      console.log(data);
      setDailyEarningsData(data);
      setTodayEarning(data.find((item) => item.day === today)?.amount ?? 0);
      setTotalEarningThiWeek(data.reduce((sum, item) => sum + item.amount, 0));
    };

    fetchEarnings();
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-xl font-semibold">CURRENT EARNINGS</h1>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          title="Today"
          amount={todayEarning}
          subtitle="12 deliveries"
        />
        <StatCard
          title="This Week"
          amount={totalEarningThiWeek}
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
          <h2 className="text-sm font-semibold mb-2">Monthly Earnings Trend</h2>

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

      <EarningsDetails todayEarning={todayEarning} />
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
