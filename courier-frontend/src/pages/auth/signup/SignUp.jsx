  import React, { useState } from "react";
  import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
  import { Link, useNavigate } from "react-router-dom";
  import NavBar from "../../../components/common/NavBar";
  import { toast } from "react-toastify";
  import { customerSignup } from "../../../api/auth";

  const SignUp = () => {
    const navigate = useNavigate();

    //usestates
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const onSignUp = async () => {
      //valiadtion
      const rules = [
        [name.trim(), "Full name is required"],
        [email.trim(), "Email is required"],
        [/^\S+@\S+\.\S+$/.test(email), "Invalid email format"],
        [phone.trim(), "Phone number is required"],
        [/^\d{10}$/.test(phone), "Phone must be 10 digits"],
        [password.trim(), "Password is required"],
        [password.length >= 8, "Password must be at least 8 characters"],
        [confirmPassword.trim(), "Confirm password is required"],
        [password === confirmPassword, "Passwords do not match"],
        [acceptedTerms, "You must accept Terms & Privacy Policy"],
      ];

      for (const [condition, message] of rules) {
        if (!condition) {
          toast.warning(message);
          return;
        }
      }
      const body = { name, email, phone, password };
      // API call
      try {
        const response = await customerSignup(body);
        console.log(response);
        toast.success("Account created successfully");
        navigate("/login");
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      }
    };

    return (
  <div className="min-h-screen bg-[#FFF7EE] flex flex-col">
    <NavBar />

    {/* Main container */}
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-10 pt-28">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Create Your Account
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white border rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-1">Sign Up</h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Create your free Courier wala account
          </p>

          {/* Full Name */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Full Name</label>
            <div className="relative mt-1">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Enter full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Email</label>
            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Phone Number</label>
            <div className="relative mt-1">
              <FiPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Enter phone number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Password</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Confirm Password</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Re-enter password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 mt-3 text-gray-600 text-sm">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>

          {/* Button */}
          <button
            onClick={onSignUp}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg mt-6 text-sm sm:text-base"
          >
            Create Account →
          </button>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

  };

  export default SignUp;
