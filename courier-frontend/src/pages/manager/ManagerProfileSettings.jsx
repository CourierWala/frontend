import React, { useState } from "react";
import ManagerLayout from "../../layouts/ManagerLayout";

import ProfileTab from "../../components/manager/ProfileTab";
import SecurityTab from "../../components/manager/SecurityTab";
import NotificationsTab from "../../components/manager/NotificationsTab";

const ManagerProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTab = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Security":
        return <SecurityTab />;
      case "Notifications":
        return <NotificationsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <ManagerLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
        <p className="text-gray-600 mb-8">
          Manage your account, office settings, and preferences
        </p>

        {/* TABS */}
        <div className="flex justify-between sm:justify-center gap-3 mb-8">
          {["Profile", "Security", "Notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition
                ${
                  activeTab === tab
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* RENDER SELECTED TAB */}
        {renderTab()}
      </div>
    </ManagerLayout>
  );
};

export default ManagerProfileSettings;
