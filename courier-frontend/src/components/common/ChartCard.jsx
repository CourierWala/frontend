import React from "react";

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
    <h3 className="mb-4">{title}</h3>
    {children}
  </div>
);

export default ChartCard;
