import AdminLayout from "../../layouts/AdminLayout";
import React from "react";

export default function AdminInvestorRelations() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Investor Relations</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="font-semibold">Company Overview</h2>
        <p className="text-gray-600">
          Courier Wala is a technology-driven logistics platform enabling
          efficient parcel movement across multiple hubs with real-time tracking
          and optimized pricing.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="font-semibold">Financial Highlights</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Consistent quarter-on-quarter revenue growth</li>
          <li>Optimized cost per delivery through hub-based routing</li>
          <li>Scalable pricing model based on distance and weight slabs</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="font-semibold">Operational KPIs</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Delivery success rate above 95%</li>
          <li>Average delivery time reduced by 18%</li>
          <li>Multi-hub operational coverage</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="font-semibold">Governance & Compliance</h2>
        <p className="text-gray-600">
          Courier Wala adheres to internal audit standards, data security
          protocols, and transparent financial reporting practices.
        </p>
      </div>
    </div>
  );
}
