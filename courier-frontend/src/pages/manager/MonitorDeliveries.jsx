import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
} from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ManagerLayout from "../../layouts/ManagerLayout";

export default function MonitorDeliveries() {
  const deliveries = [
    {
      id: "1",
      trackingNumber: "TRK-9922",
      from: "New York, NY",
      to: "Los Angeles, CA",
      status: "in-transit",
      driver: "Sarah Johnson",
      eta: "Nov 16, 2025",
      currentDate: "Nov 14, 2025",
    },
    {
      id: "2",
      trackingNumber: "TRK-8891",
      from: "Chicago, IL",
      to: "Miami, FL",
      status: "in-transit",
      driver: "Michael Chen",
      eta: "Nov 15, 2025",
      currentDate: "Nov 13, 2025",
    },
    {
      id: "3",
      trackingNumber: "TRK-8850",
      from: "Seattle, WA",
      to: "Boston, MA",
      status: "delivered",
      driver: "Emily Rodriguez",
      eta: "Nov 14, 2025",
      currentDate: "Nov 12, 2025",
    },
    {
      id: "4",
      trackingNumber: "TRK-7743",
      from: "Denver, CO",
      to: "Austin, TX",
      status: "pending",
      driver: "Unassigned",
      eta: "Nov 18, 2025",
      currentDate: "Nov 14, 2025",
    },
    {
      id: "5",
      trackingNumber: "TRK-6621",
      from: "Phoenix, AZ",
      to: "Portland, OR",
      status: "delayed",
      driver: "James Wilson",
      eta: "Nov 17, 2025",
      currentDate: "Nov 14, 2025",
    },
    {
      id: "6",
      trackingNumber: "TRK-5512",
      from: "Atlanta, GA",
      to: "Philadelphia, PA",
      status: "in-transit",
      driver: "Lisa Anderson",
      eta: "Nov 15, 2025",
      currentDate: "Nov 14, 2025",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-500" size={20} />;
      case "in-transit":
        return <Truck className="text-orange-500" size={20} />;
      case "pending":
        return <Clock className="text-yellow-500" size={20} />;
      case "delayed":
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      delivered: "bg-green-100 text-green-700",
      "in-transit": "bg-orange-100 text-orange-700",
      pending: "bg-yellow-100 text-yellow-700",
      delayed: "bg-red-100 text-red-700",
    };

    return (
      <span className={`px-3 py-1 rounded-full ${styles[status]}`}>
        {status === "in-transit"
          ? "In Transit"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    total: deliveries.length,
    inTransit: deliveries.filter((d) => d.status === "in-transit").length,
    delivered: deliveries.filter((d) => d.status === "delivered").length,
    pending: deliveries.filter((d) => d.status === "pending").length,
    delayed: deliveries.filter((d) => d.status === "delayed").length,
  };

  const weeklyDeliveries = [
    { week: "Week 1", delivered: 420, delayed: 15 },
    { week: "Week 2", delivered: 450, delayed: 12 },
    { week: "Week 3", delivered: 480, delayed: 18 },
    { week: "Week 4", delivered: 510, delayed: 10 },
    { week: "Week 5", delivered: 540, delayed: 14 },
    { week: "Week 6", delivered: 580, delayed: 16 },
  ];

  const deliveryTimeByMonth = [
    { month: "Jul", avgHours: 42 },
    { month: "Aug", avgHours: 40 },
    { month: "Sep", avgHours: 38 },
    { month: "Oct", avgHours: 35 },
    { month: "Nov", avgHours: 32 },
    { month: "Dec", avgHours: 30 },
  ];

  const statusDistribution = [
    { name: "Delivered", value: stats.delivered, color: "#10b981" },
    { name: "In Transit", value: stats.inTransit, color: "#f97316" },
    { name: "Pending", value: stats.pending, color: "#eab308" },
    { name: "Delayed", value: stats.delayed, color: "#ef4444" },
  ];

  return (
    <ManagerLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="text-blue-500" size={20} />
              </div>
            </div>
            <div className="text-gray-600 mb-1 text-sm">Total Deliveries</div>
            <div className="text-2xl md:text-3xl">{stats.total}</div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Truck className="text-orange-500" size={20} />
              </div>
            </div>
            <div className="text-gray-600 mb-1 text-sm">In Transit</div>
            <div className="text-2xl md:text-3xl">{stats.inTransit}</div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-500" size={20} />
              </div>
            </div>
            <div className="text-gray-600 mb-1 text-sm">Delivered</div>
            <div className="text-2xl md:text-3xl">{stats.delivered}</div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-500" size={20} />
              </div>
            </div>
            <div className="text-gray-600 mb-1 text-sm">Pending</div>
            <div className="text-2xl md:text-3xl">{stats.pending}</div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-500" size={20} />
              </div>
            </div>
            <div className="text-gray-600 mb-1 text-sm">Delayed</div>
            <div className="text-2xl md:text-3xl">{stats.delayed}</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Delivery Performance */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="mb-4">Weekly Delivery Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyDeliveries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="delivered" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="delayed" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="mb-4">Delivery Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Average Delivery Time Trend */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4">
              Average Delivery Time Trend (Last 6 Months)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={deliveryTimeByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgHours"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery List */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <h3 className="mb-4">Active Deliveries</h3>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="p-4 border rounded-xl hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{delivery.trackingNumber}</h4>
                    <p className="text-sm text-gray-500">
                      {delivery.from} → {delivery.to}
                    </p>
                  </div>
                  {getStatusIcon(delivery.status)}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  {getStatusBadge(delivery.status)}
                  <span className="text-sm text-gray-500">
                    ETA: {delivery.eta}
                  </span>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  Driver: <span className="font-medium">{delivery.driver}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
}
