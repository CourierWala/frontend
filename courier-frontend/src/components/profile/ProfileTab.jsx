import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import Button from "../ui/Button";
import { getUserData, updateUserProfile } from "../../api/customer";
import { toast } from "react-toastify";

const ProfileTab = () => {

  const [customer, setCustomer] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});


  const validate = () => {
    const newErrors = {};

    if (!name || name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const response = await getUserData();
    const data = response.data;

    setCustomer(data);
    setName(data.name || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
  };

  const onSaveChanges = async () => {
    if (!validate()) {
      toast.warning(errors.name)
      toast.warning(errors.phone)
      return; //  stop if invalid
    }


    try {
      const payload = { name, phone };
      const response = await updateUserProfile(payload);
      if (response.data.status === "success")
        toast.success("Profile updated successfully");

      else
        toast.warning("Failed to update profile");

    } catch (err) {
      console.error(err);
      console.log(err.response)
      toast.error("Failed to update profile");
    }
  };


  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">

      <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
      <p className="text-gray-500 mb-6">Update your personal details</p>

      {/* FORM */}
      <div className="grid grid-cols-1 gap-6">

        {/* NAME */}
        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<FiUser />}
        />

        {/* EMAIL (READ ONLY) */}
        <InputField
          label="Email"
          value={email}
          readOnly
          icon={<FiMail />}
        />

        {/* PHONE */}
        <InputField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          icon={<FiPhone />}
        />

      </div>

      <div className="mt-8">
        <Button
          onClick={onSaveChanges}
          className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-lg shadow">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

/* -------------------- INPUT COMPONENT -------------------- */

const InputField = ({ label, value, onChange, icon, readOnly = false }) => (
  <div>
    <label className="text-gray-700 text-sm">{label}</label>
    <div className="relative mt-1">
      <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full border rounded-lg pl-10 pr-3 py-2
          focus:ring focus:ring-orange-200 focus:outline-none
          transition
          ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />
    </div>
  </div>
);

export default ProfileTab;
