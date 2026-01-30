import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/common/NavBar";
import { toast } from "react-toastify";
import axios from "axios";
import { userLogin } from "../../../api/auth";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const onLogin = async (e) => {
    e.preventDefault();
    const rules = [
      [email.trim(), "Email is required"],
      [/^\S+@\S+\.\S+$/.test(email), "Invalid email format"],
      [password.trim(), "Password is required"],
      [password.length >= 6, "Password must be at least 6 characters"],
    ];

    for (const [condition, message] of rules){
      if (!condition) {
        toast.warning(message);
        return;
      }
    }
    try {
      const response = await userLogin(email, password);
      if(response.data.status === "failure"){
        toast.error(response.data.message)
        return;
      }

      const currRole = response.data.role.slice(1, -1);

      const user = {
        email: response?.data.email,
        id: response.data.id,
        role: currRole,
      };
      login(user);
      toast.success("Login successful");
      console.log("curr role : ", currRole);
      if (currRole == "ROLE_CUSTOMER") navigate("/customer/dashboard");
      else if (currRole == "ROLE_ADMIN") navigate("/admin/dashboard");
      else if (currRole == "ROLE_DELIVERY_STAFF") navigate("/staff/dashboard");
      else if (currRole == "ROLE_STAFF_MANAGER") navigate("/manager/dashboard"); // 'ROLE_ADMIN','ROLE_CUSTOMER','ROLE_DELIVERY_STAFF','ROLE_STAFF_MANAGER')
    } catch (error) {
      console.log("error : ", error);
      console.log("error res : ", error.response);
      setErrorMessage("Invalid Credential !!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7EE] flex flex-col">
      <NavBar />

      {/* login block */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
        </div>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-3 py-2"
              placeholder="enter password"
            />
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>

            <button className="text-orange-600 text-sm hover:underline">
              Forgot password?
            </button>
          </div>
          {errorMessage && (
            <div className="font-bold text-red-700 text-center m-2 p-2">
              Error : {errorMessage}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={(e) => onLogin(e)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg mb-4"
          >
            Sign In →
          </button>

          {/* FOOTER */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-600 hover:underline">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs py-4">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default Login;
