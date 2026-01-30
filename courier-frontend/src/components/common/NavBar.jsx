import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineCube, HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="truck-hover max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO + ICON */}
        <Link to="/" className="flex items-center gap-2">
          <HiOutlineCube className="text-orange-500 text-3xl" />
          <span className="text-2xl font-extrabold text-gray-900">
            Courier Wala
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link className="hover:text-orange-600 transition" to="/">
            Home
          </Link>
          {/* <Link className="hover:text-orange-600 transition" to="/staff/dashboard">Staff</Link> */}
          <Link
            className="hover:text-orange-600 transition"
            to="/manager/dashboard"
          >
            Manager
          </Link>
          <Link
            className="hover:text-orange-600 transition"
            to="/admin/dashboard"
          >
            Admin
          </Link>

          <Link className="hover:text-orange-600 transition" to="/login">
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Sign Up
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="block px-4 py-2 bg-orange-600 text-white rounded-lg text-center hover:bg-orange-700"
            to="/staffsignup"
          >
            Apply For JOb
          </Link>
        </nav>
        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
          {/* <Link
            onClick={() => setOpen(false)}
            className="block text-gray-700 text-lg hover:text-orange-600"
            to="/"
          >
            Home
          </Link> */}

          <Link
            onClick={() => setOpen(false)}
            className="block text-gray-700 text-lg hover:text-orange-600"
            to="/login"
          >
            Login
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="block text-gray-700 text-lg hover:text-orange-600"
            to="/staff/dashboard"
          >
            Staff
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="block text-gray-700 text-lg hover:text-orange-600"
            to="/manager/dashboard"
          >
            Manager
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="block px-4 py-2 bg-orange-600 text-white rounded-lg text-center hover:bg-orange-700"
            to="/signup"
          >
            Sign Up
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="block px-4 py-2 bg-orange-600 text-white rounded-lg text-center hover:bg-orange-700"
            to="/staffsignup"
          >
            Apply For JOb
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
