import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

export default function Sidebar({ links, title = "Courier Wala" }) {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-6 py-2.5 text-sm font-medium rounded-xl transition
     ${isActive
      ? "bg-orange-600 text-white"
      : "text-slate-300 hover:bg-slate-800"
    }`;

  const onSignOut = () => {
    window.alert("signout successful");
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="truck-hover md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
        <span className="text-lg font-semibold">{title}</span>
        <button onClick={() => setIsOpen(true)}>
          <FiMenu className="text-2xl" />
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="truck-hover fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`truck-hover fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-100 flex flex-col z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* HEADER */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800 cursor-pointer hover:bg-slate-800 transition">
            <div className="h-9 w-9 rounded-xl bg-dark-600 flex items-center justify-center text-2xl">
              📦
            </div>
            <span className="text-lg font-semibold">{title}</span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav className="flex-1 mt-4 space-y-1 px-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setIsOpen(false)}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* signout */}
        <div className="mt-auto flex justify-center py-4 border-t border-gray-700">
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition font-semibold"
          >
            <span>⏻</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
