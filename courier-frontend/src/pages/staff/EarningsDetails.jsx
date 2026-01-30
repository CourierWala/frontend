import React from "react";

function EarningsDetails(props) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-sm font-semibold mb-3">Earning Details</h2>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-slate-500">Total Earnings</p>
            <p className="text-lg font-semibold text-orange-600">$12,847</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-slate-500">This Month</p>
            <p className="text-lg font-semibold text-green-600">$2,340</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-slate-500">Today</p>
            <p className="text-lg font-semibold text-blue-600">
              {props.todayEarning}
            </p>
          </div>
        </div>

        <div className="mt-4 text-xs space-y-2">
          <div>
            <p className="text-slate-500">Bank Account</p>
            <p className="flex justify-between">
              <span>xxxx xxxx 5678</span>
              <button className="text-orange-600 text-xs">Edit</button>
            </p>
          </div>
          <div>
            <p className="text-slate-500">Payment Method</p>
            <p className="flex justify-between">
              <span>Direct Deposit</span>
              <button className="text-orange-600 text-xs">Change</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EarningsDetails;
