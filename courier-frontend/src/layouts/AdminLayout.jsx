import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineCube } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { signOutUser } from "../api/auth";
import { toast } from "react-toastify";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onSignOut = async () => {
    try {
      console.log("logout user !!");
      await signOutUser();
      toast.success("signout successful");
      logout();
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/staff-management", label: "Staff Management" },
    { to: "/admin/hub-management", label: "Hub Management" },
    { to: "/admin/pricing", label: "Pricing Control" },
    { to: "/admin/analytics", label: "Analytics" },
    { to: "/admin/profile", label: "Profile" },
    { to: "/admin/investor-relations", label: "Investor Relations" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black text-white w-full fixed top-0 left-0 z-30">
        <div className="flex items-center gap-2">
          <HiOutlineCube className="text-orange-500 text-2xl" />
          <h2 className="text-xl font-bold">Courier wala</h2>
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
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-black text-white p-6 transform z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        md:translate-x-0 md:static md:flex md:flex-col md:justify-between`}
      >
        <div className="sticky top-0 pt-[15px] ...">
          <div className="flex items-center gap-3 mb-6">
            <HiOutlineCube className="text-orange-500 text-3xl" />
            <h2 className="text-2xl font-bold">Courier wala</h2>
          </div>

          <div className="w-full h-[1px] bg-white/30 mb-8"></div>

          <nav className="space-y-4">
            {links.map((link, idx) => (
              <SidebarLink key={idx} to={link.to} label={link.label} />
            ))}
          </nav>
        </div>

        <div className="mt-10">
          <div className="w-full h-[1px] bg-white/30 mb-8"></div>
          <button
            onClick={onSignOut}
            className="text-gray-400 hover:text-white flex gap-2 items-center"
          >
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

export default AdminLayout;
