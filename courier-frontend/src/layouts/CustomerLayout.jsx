import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineCube } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";

const CustomerLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onSignOut = () => {
         navigate('/');
  }

  // Disable scroll when sidebar is open (mobile)
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* MOBILE TOP NAVBAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black text-white w-full fixed top-0 left-0 z-30">
        <div className="flex items-center gap-2">
          <HiOutlineCube className="text-orange-500 text-2xl" />
          <h2 className="text-xl font-bold">Courier Wall</h2>
        </div>

        <button onClick={() => setIsOpen(true)}>
          <FiMenu className="text-white text-3xl" />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-black text-white p-6 transform z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        md:translate-x-0 md:static md:flex md:flex-col md:justify-between`}
      >
        {/* LOGO */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <HiOutlineCube className="text-orange-500 text-3xl" />
            <h2 className="text-2xl font-bold">Courier Wala</h2>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/30 mb-8"></div>

          {/* NAVIGATION */}
          <nav className="space-y-4">
            <SidebarLink to="/customer/dashboard" label="Overview" />
            <SidebarLink to="/customer/book" label="New Shipment" />
            <SidebarLink to="/customer/track" label="Track Package" />
            <SidebarLink to="/customer/deliveries" label="Shipment History" />
            <SidebarLink to="/customer/profile" label="Profile" />
          </nav>
        </div>

        {/* SIGN OUT */}
        <div className="mt-10">
          <div className="w-full h-[1px] bg-white/30 mb-8"></div>

          <button 
          onClick={onSignOut}
          className="text-gray-400 hover:text-white flex gap-2 items-center">
            <span>⏻</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 mt-16 md:mt-0">{children}</main>
    </div>
  );
};

const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md transition font-medium ${
        isActive
          ? "bg-orange-600 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
};

export default CustomerLayout;
