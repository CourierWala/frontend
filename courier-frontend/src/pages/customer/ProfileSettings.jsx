import React, { useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";

import ProfileTab from "../../components/profile/ProfileTab";
import SecurityTab from "../../components/profile/SecurityTab";
import NotificationsTab from "../../components/profile/NotificationsTab";
import BillingTab from "../../components/profile/BillingTab";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTab = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Security":
        return <SecurityTab />;
      case "Notifications":
        return <NotificationsTab />;
      case "Billing":
        return <BillingTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
        <p className="text-gray-600 mb-8">
          Manage your account settings and preferences
        </p>

        {/* TABS */}
        <div className="flex justify-between sm:justify-center gap-3 mb-8">
          {["Profile", "Security", "Notifications", "Billing"].map((tab) => (
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
    </CustomerLayout>
  );
};

export default ProfileSettings;
