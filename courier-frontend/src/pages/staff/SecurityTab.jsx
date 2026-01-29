import React, { useState } from "react";
import { changePassword } from "../../api/staff";
import { toast } from "react-toastify";

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleChangePassword = async() => {
      const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const rules = [
                [currentPassword, "Current password is required"],
                [newPassword, "New password is required"],
                [
                    passwordRegex.test(newPassword),
                    "Password must be at least 8 characters and include uppercase, lowercase, number & special character",
                ],
                [confirmPassword, "Confirm password is required"],
                [newPassword === confirmPassword, "Passwords do not match"],
            ];
    for (const [condition, message] of rules){
      if (!condition) {
        toast.warning(message);
        return; 
      }
    }
   
    // staffid from session
       let staffid = 1;
       const body = {currentPassword, newPassword };
        const response = await changePassword(staffid,body);
        console.log(response);
         toast.success("Password changed successfully");
      //    if (response['status'] === 'success'){
      //       console.log("sucessful");
      //  }
  };
  
  return (
    <div className="grid md:grid-cols-1 gap-6">
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
        <h2 className="text-sm font-semibold">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Current Password */}
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-500 mb-1"> Current Password </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter current password"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs text-slate-500 mb-1"> Confirm New Password </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Re-enter new password"
            />
          </div>
        </div>

        {/* Action Btn */}
        <button onClick={handleChangePassword} className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium">
          Change Password
        </button>
      </div>
    </div>
  );
};

