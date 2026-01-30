import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock, FiTruck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/common/NavBar";
import { toast } from "react-toastify";
import { staff_signup } from "../../../api/staff";

const StaffSignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    hubId: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSignUp = async () => {
    const rules = [
      [form.name.trim(), "Full name is required"],
      [form.email.trim(), "Email is required"],
      [/^\S+@\S+\.\S+$/.test(form.email), "Invalid email format"],
      [form.phone.trim(), "Phone number is required"],
      [/^\d{10}$/.test(form.phone), "Phone must be 10 digits"],
      [form.password.trim(), "Password is required"],
      [form.password.length >= 8, "Password must be at least 8 characters"],
      [form.confirmPassword.trim(), "Confirm password is required"],
      [form.password === form.confirmPassword, "Passwords do not match"],
      [form.vehicleType, "Select vehicle type"],
      [form.vehicleNumber.trim(), "Vehicle number is required"],
      [form.licenseNumber.trim(), "License number is required"],
      [form.hubId, "Select hub"],
    ];

    for (const [condition, message] of rules) {
      if (!condition) {
        toast.warning(message);
        return;
      }
    }
    const response = await staff_signup(
      form.name,
      form.email,
      form.phone,
      form.password,
      form.vehicleType,
      form.vehicleNumber,
      form.licenseNumber,
      form.hubId,
    );
    
    console.log(response);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7EE] flex flex-col">
      <NavBar />
      {/* //main container */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 mt-20">
        <div className="w-full max-w-xl bg-white border rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-1">Staff Registration</h2>
          <p className="text-gray-500 mb-6">
            Join Courier Wala as a Delivery Partner
          </p>

          {/* Full Name */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Full Name</label>
            <div className="relative mt-1">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                name="name"
                onChange={onChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Email</label>
            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                name="email"
                type="email"
                onChange={onChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Phone Number</label>
            <div className="relative mt-1">
              <FiPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                name="phone"
                onChange={onChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Password</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                onChange={onChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Confirm Password</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                onChange={onChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Vehicle Type</label>
            <select
              name="vehicleType"
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">Select Vehicle</option>
              <option value="BIKE">Bike</option>
              <option value="VAN">Van</option>
              <option value="CAR">Car</option>
            </select>
          </div>

          {/* Vehicle Number */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Vehicle Number</label>
            <div className="relative mt-1">
              <FiTruck className="absolute left-3 top-3 text-gray-400" />
              <input
                name="vehicleNumber"
                onChange={onChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* License Number */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">License Number</label>
            <input
              name="licenseNumber"
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-orange-200"
            />
          </div>

          {/* Hub */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Hub</label>
            <select
              name="hubId"
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">Select Hub</option>
              <option value="1">Mumbai Hub</option>
              <option value="2">Pune Hub</option>
              <option value="3">Delhi Hub</option>
            </select>
          </div>

          <button
            onClick={onSignUp}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg mt-6"
          >
            Register as Staff →
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-orange-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffSignUp;
