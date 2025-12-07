import React from "react";

const StatCard = ({ title, value, iconBg }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">

      <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${iconBg}`}>
        📦
      </div>

      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>

    </div>
  );
};

export default StatCard;
