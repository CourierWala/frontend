
import React, { useState } from "react";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationTab from "./NotificationTab";


export default function Profile() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6">
      <h1 className="text-xl font-semibold">PROFILE</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-4 ">
      <button
        onClick={() => setTab("profile")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition ${
          tab === "profile" ? "bg-orange-600 text-white" : "bg-white border text-slate-600 hover:bg-slate-50"
        }`}>
        Profile
      </button>

      <button
        onClick={() => setTab("security")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition ${
          tab === "security" ? "bg-orange-600 text-white" : "bg-white border text-slate-600 hover:bg-slate-50"
        }`}>
        Security
      </button>

      {/* <button
        onClick={() => setTab("notifications")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition ${
          tab === "notifications" ? "bg-orange-600 text-white" : "bg-white border text-slate-600 hover:bg-slate-50"
        }`}>
        Notifications
      </button> */}
</div>


      {/* Tabs */}
      {tab === "profile" && <ProfileTab />}
      {tab === "security" && <SecurityTab />}
      {/* {tab === "notifications" && <NotificationTab />} */}
    </div>
  );
}
