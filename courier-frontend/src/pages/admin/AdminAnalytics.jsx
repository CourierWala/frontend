import { Download } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import React from "react";
import { downloadAdminReport } from "../../api/adminReports";

export default function AdminAnalytics() {
  const handleDownload = async (type, format) => {
    try {
      const response = await downloadAdminReport(type, format);

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}-report.${format === "pdf" ? "pdf" : "xlsx"}`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Report download failed", error);
      alert("Failed to download report");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Analytics & Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportCard
          title="Monthly Report"
          description="Delivery volume, revenue, expenses and performance metrics"
          onPdf={() => handleDownload("monthly", "pdf")}
          onExcel={() => handleDownload("monthly", "excel")}
        />

        <ReportCard
          title="Quarterly Report"
          description="Financial growth, hub efficiency and cost analysis"
          onPdf={() => handleDownload("quarterly", "pdf")}
          onExcel={() => handleDownload("quarterly", "excel")}
        />

        <ReportCard
          title="Yearly Report"
          description="Annual performance, profitability and expansion insights"
          onPdf={() => handleDownload("yearly", "pdf")}
          onExcel={() => handleDownload("yearly", "excel")}
        />
      </div>
    </div>
  );
}

const ReportCard = ({ title, description, onPdf, onExcel }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>

    <div className="mt-4 flex gap-2">
      <button
        onClick={onPdf}
        className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md"
      >
        <Download size={16} /> PDF
      </button>

      <button
        onClick={onExcel}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        <Download size={16} /> Excel
      </button>
    </div>
  </div>
);
