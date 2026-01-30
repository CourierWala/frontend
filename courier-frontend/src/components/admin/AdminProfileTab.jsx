import React, { use, useEffect, useState } from "react";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../../api/admin";
import { useAuth } from "../../context/AuthContext";

const AdminProfileTab = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const adminId = user?.id;

  useEffect(() => {
    if (!adminId) return; // 🔥 IMPORTANT GUARD

    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile(adminId);
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [adminId]);


  // 📤 PUT profile (axios instance)
  const handleUpdate = async () => {
    try {
      await updateAdminProfile(adminId, {
        name,
        email,
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Update failed");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
      <div>
        <label className="text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Role</label>
        <input
          type="text"
          value="System Administrator"
          disabled
          className="w-full mt-1 border rounded-md p-2 bg-gray-100 text-gray-500"
        />
      </div>

      <div className="pt-4">
        <button
          onClick={handleUpdate}
          className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-2 rounded-md"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default AdminProfileTab;
