import React from "react";
import { FiCreditCard } from "react-icons/fi";

const BillingTab = () => {
  return (
    <div className="space-y-10">

      {/* PAYMENT METHODS */}
      <div className="bg-white p-8 rounded-xl border">
        <h2 className="text-xl font-semibold mb-1">Payment Methods</h2>
        <p className="text-gray-500 mb-6">
          Manage your payment methods
        </p>

        <div className="p-4 border rounded-lg bg-orange-50 flex justify-between">
          <div className="flex items-center gap-3">
            <FiCreditCard className="text-orange-600 text-xl" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-gray-500 text-sm">Expires 12/2025</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-orange-600 font-medium">Default</span>
            <button className="underline">Edit</button>
          </div>
        </div>

        <button className="w-full border border-orange-600 text-orange-600 px-4 py-2 rounded-lg mt-4">
          + Add Payment Method
        </button>
      </div>

      {/* BILLING HISTORY */}
      <div className="bg-white p-8 rounded-xl border">
        <h2 className="text-xl font-semibold mb-1">Billing History</h2>
        <p className="text-gray-500 mb-6">View your past transactions</p>

        {[12.99, 12.99, 24.99, 5.99].map((amount, i) => (
          <div
            key={i}
            className="flex justify-between items-center border rounded-lg p-4 mb-3"
          >
            <div>
              <p className="font-semibold">${amount}</p>
              <p className="text-gray-500 text-sm">Nov {14 - i}, 2025</p>
            </div>

            <span className="text-green-600 font-medium">Paid</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BillingTab;
