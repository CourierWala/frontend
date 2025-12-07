import React from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const onSignUp = () => {
     navigate("/customer/dashboard")
  }
  return (
    <div className="min-h-screen bg-[#FFF7EE] flex flex-col">

      {/* TOP NAV */}
      <div className="w-full flex justify-between items-center py-4 px-6 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="bg-orange-600 text-white p-2 rounded-lg text-xl">📦</span>
          <h1 className="text-xl font-bold">Courier Wala</h1>
        </div>

        <Link to="/" className="text-gray-500 hover:text-black">
          Back to Home
        </Link>
      </div>

      {/* CENTER WRAPPER */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="bg-orange-600 text-white p-2 rounded-lg text-3xl inline-block mb-4">
            📦
          </span>
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-gray-600">Start shipping with us today</p>
        </div>

        {/* SIGNUP CARD */}
        <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-1">Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your free SwiftShip account</p>

          {/* FULL NAME */}
          <Input
            label="Full Name"
            placeholder="Your Name"
            icon={<FiUser />}
          />

          {/* EMAIL */}
          <Input
            label="Email"
            placeholder="your@email.com"
            icon={<FiMail />}
          />

          {/* PHONE */}
          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            icon={<FiPhone />}
          />

          {/* PASSWORD */}
          <Input
            label="Password"
            type="password"
            icon={<FiLock />}
          />

          {/* CONFIRM PASSWORD */}
          <Input
            label="Confirm Password"
            type="password"
            icon={<FiLock />}
          />

          {/* TERMS */}
          <label className="flex items-center gap-2 mt-3 text-gray-600 text-sm">
            <input type="checkbox" />
            I agree to the Terms of Service and Privacy Policy
          </label>

          {/* SUBMIT BUTTON */}
          <button 
          onClick={onSignUp}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg mt-6">
            Create Account →
          </button>

          {/* EXISTING ACCOUNT LINK */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------- REUSABLE INPUT FIELD -------------------- */

const Input = ({ label, icon, type = "text", placeholder }) => (
  <div className="mb-4">
    <label className="text-gray-700 text-sm">{label}</label>
    <div className="relative mt-1">
      <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-lg pl-10 pr-3 py-2 
                   focus:ring focus:ring-orange-200 focus:outline-none transition"
      />
    </div>
  </div>
);

export default SignUp;
