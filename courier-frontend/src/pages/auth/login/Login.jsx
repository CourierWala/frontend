import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onLogin = () => {
     navigate("/customer/dashboard")
    
  }

  return (
    <div className="min-h-screen bg-[#FFF7EE] flex flex-col">

      {/* TOP NAV */}
      <div className="w-full flex justify-between items-center py-4 px-6 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="bg-orange-600 text-white p-2 rounded-lg text-xl">📦</span>
          <h1 className="text-xl font-bold">Courier wala</h1>
        </div>

        <Link to="/" className="text-gray-500 hover:text-black">
          Back to Home
        </Link>
      </div>

      {/* CENTER CONTENT FIXED */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        
        {/* WELCOME SECTION */}
        <div className="text-center mb-10">
          <span className="bg-orange-600 text-white p-2 rounded-lg text-3xl inline-block mb-4">
            📦
          </span>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 text-sm">
            Sign in to manage your deliveries
          </p>
        </div>

        {/* LOGIN CARD (ALWAYS CENTERED) */}
        <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow-sm">
          
          <h2 className="text-xl font-semibold mb-1">Sign In</h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          {/* EMAIL */}
          <label className="text-gray-700 text-sm">Email</label>
          <div className="relative mt-1 mb-4">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className="w-full border rounded-lg pl-10 pr-3 py-2"
              placeholder="your@email.com"
            />
          </div>

          {/* PASSWORD */}
          <label className="text-gray-700 text-sm">Password</label>
          <div className="relative mt-1 mb-4">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full border rounded-lg pl-10 pr-3 py-2"
              placeholder="********"
            />
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <input type="checkbox" /> Remember me
            </label>

            <button className="text-orange-600 text-sm hover:underline">
              Forgot password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button 
          onClick={onLogin}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg mb-4">
            Sign In →
          </button>

          {/* FOOTER */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* BOTTOM LEGAL TEXT */}
      <p className="text-center text-gray-500 text-xs py-4">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default Login;
