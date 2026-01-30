import React, { useEffect, useState } from "react";
import { fetchStaffProfile, saveStaffProfile } from "../../api/staff";
import { toast } from "react-toastify";

export default function ProfileTab() {

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleType: "",
    vehicleNumber: ""
  });

  useEffect(() => {
    //console.log("profiletab mounted");
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await fetchStaffProfile();
      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        vehicleType: data.vehicleType || "",
        vehicleNumber: data.vehicleNumber || ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const saveChanges = async () => {
    const rules = [
      [profile.firstName, "First name is required"],
      [profile.lastName, "Last name is required"],
      [/^\S+@\S+\.\S+$/.test(profile.email), "Invalid email format"],
      [/^\d{10}$/.test(profile.phone), "Phone must be 10 digits"],
      [profile.vehicleType, "Select vehicle type"],
      [profile.vehicleNumber, "Vehicle number is required"],
    ];

    for (const [condition, message] of rules) {
      if (!condition) {
        toast.warning(message);
        return;
      }
    }

    try {
      const response = await saveStaffProfile({...profile,address: null });

      if (response.data.status === "success") 
          toast.success(response.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="grid md:grid-cols-1 gap-6">
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

          <div>
            <label className="block text-xs text-slate-500 mb-1">First Name</label>
            <input
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Last Name</label>
            <input
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Email</label>
            <input
              value={profile.email}
              readOnly
              className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Phone Number</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Vehicle Type</label>
            <select
              value={profile.vehicleType}
              onChange={(e) =>
                setProfile({ ...profile, vehicleType: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="VAN">Van</option>
              <option value="BIKE">Bike</option>
              <option value="CAR">Car</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Vehicle Number</label>
            <input
              value={profile.vehicleNumber}
              onChange={(e) =>
                setProfile({ ...profile, vehicleNumber: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          className="mt-4 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
