import React from "react";
import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ProfileTab = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">

      {/* SECTION TITLE */}
      <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
      <p className="text-gray-500 mb-6">Update your personal details</p>

      {/* PROFILE PHOTO */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-semibold">
          JD
        </div>

        <div className="text-center sm:text-left">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition">
            Change Photo
          </button>
          <p className="text-gray-500 text-sm mt-1">
            JPG, PNG or GIF. Max size 2MB
          </p>
        </div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* FIRST NAME */}
        <InputField
          label="First Name"
          defaultValue="John"
          icon={<FiUser />}
        />

        {/* LAST NAME */}
        <InputField
          label="Last Name"
          defaultValue="Doe"
          icon={<FiUser />}
        />

        {/* EMAIL */}
        <InputField
          label="Email"
          defaultValue="john@example.com"
          icon={<FiMail />}
        />

        {/* PHONE */}
        <InputField
          label="Phone Number"
          defaultValue="+1 (555) 123-4567"
          icon={<FiPhone />}
        />

        {/* ADDRESS — FULL WIDTH */}
        <div className="md:col-span-2">
          <InputField
            label="Address"
            defaultValue="123 Main St, New York, NY 10001"
            icon={<FiMapPin />}
          />
        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="mt-8">
        <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-lg shadow">
          Save Changes
        </button>
      </div>

    </div>
  );
};

/* -------------------- REUSABLE INPUT COMPONENT -------------------- */

const InputField = ({ label, defaultValue, icon }) => (
  <div>
    <label className="text-gray-700 text-sm">{label}</label>
    <div className="relative mt-1">
      <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full border rounded-lg pl-10 pr-3 py-2 
                   focus:ring focus:ring-orange-200 focus:outline-none
                   transition"
      />
    </div>
  </div>
);

export default ProfileTab;
