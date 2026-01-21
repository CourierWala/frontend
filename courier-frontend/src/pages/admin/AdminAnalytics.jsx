import { Download } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import React from "react";

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Analytics & Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportCard
          title="Monthly Report"
          description="Delivery volume, revenue, expenses and performance metrics"
        />

        <ReportCard
          title="Quarterly Report"
          description="Financial growth, hub efficiency and cost analysis"
        />

        <ReportCard
          title="Yearly Report"
          description="Annual performance, profitability and expansion insights"
        />
      </div>
    </div>
  );
}

const ReportCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
    <button className="mt-4 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md w-fit">
      <Download size={16} /> Download
    </button>
  </div>
);
