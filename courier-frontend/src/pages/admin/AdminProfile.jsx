import React, { useState } from "react";
import AdminProfileTab from './../../components/admin/AdminProfileTab';
import AdminSecurityTab from './../../components/admin/AdminSecurityTab';
import AdminNotificationsTab from './../../components/admin/AdminNotificationsTab';
import AdminBillingTab from './../../components/admin/AdminBillingTab';
import AdminPermissionsTab from './../../components/admin/AdminPermissionsTab';

const AdminProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTab = () => {
    switch (activeTab) {
      case "Profile":
        return <AdminProfileTab />;
      case "Security":
        return <AdminSecurityTab />;
      case "Notifications":
        return <AdminNotificationsTab />;
      case "Billing":
        return <AdminBillingTab />;
      case "Permissions":
        return <AdminPermissionsTab />;
      default:
        return <AdminProfileTab />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
      <p className="text-gray-600 mb-8">
        Manage admin account, security settings, and notifications
      </p>

      {/* Tabs */}
      <div className="flex justify-between sm:justify-center gap-3 mb-8">
        {["Profile", "Security", "Notifications", "Billing", "Permissions"].map((tab) => (
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

      {/* Active Tab Content */}
      {renderTab()}
    </div>
  );
};

export default AdminProfileSettings;
