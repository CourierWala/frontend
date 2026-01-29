import React from "react";
import { FiLock } from "react-icons/fi";
import Button from "../ui/Button";

const SecurityTab = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">

      <h2 className="text-xl font-semibold mb-2">Change Password</h2>
      <p className="text-gray-500 mb-6">
        Update your password to keep your account secure
      </p>

      <div className="space-y-4">

        <InputRow label="Current Password" icon={<FiLock />} />
        <InputRow label="New Password" icon={<FiLock />} />
        <InputRow label="Confirm New Password" icon={<FiLock />} />

      </div>

      <Button className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg">
        Update Password
      </Button>

      {/* 2FA */}
      {/* <div className="mt-10 p-6 bg-white border rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Two-Factor Authentication</h2>
        <p className="text-gray-500 mb-4">
          Add an extra layer of security to your account
        </p> */}
{/* 
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Enable 2FA</p>
            <p className="text-gray-400 text-sm">Secure your account with 2FA</p>
          </div>

          <input type="checkbox" className="toggle-checkbox" />
        </div> */}
      {/* </div> */}
    </div>
  );
};

const InputRow = ({ label, icon }) => (
  <div>
    <label className="text-gray-700 text-sm">{label}</label>
    <div className="relative mt-1">
      <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
      <input
        type="password"
        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring focus:ring-orange-200"
      />
    </div>
  </div>
);

export default SecurityTab;
