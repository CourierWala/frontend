import React from "react";
import { FiBell } from "react-icons/fi";

const NotificationsTab = () => {
  const items = [
    { title: "Email Notifications", desc: "Receive updates via email" },
    { title: "SMS Notifications", desc: "Get text alerts for deliveries" },
    { title: "Package Updates", desc: "Real-time tracking updates" },
    { title: "Promotional Emails", desc: "Receive offers and deals" },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">

      <h2 className="text-xl font-semibold mb-2">Notification Preferences</h2>
      <p className="text-gray-500 mb-6">Manage how you receive notifications</p>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50"
          >
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <FiBell className="text-orange-600" /> {item.title}
              </h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>

            <input type="checkbox" className="toggle-checkbox" />
          </div>
        ))}
      </div>

      <button className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg">
        Save Preferences
      </button>
    </div>
  );
};

export default NotificationsTab;
