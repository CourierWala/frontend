import React from 'react'
import Overview from './Overview'

import { FiBell } from "react-icons/fi";


import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../../components/common/sidebar';


const StaffDashboard = () => {
  const staffLinks = [
    { to: '/staff/dashboard', label: 'Overview' },
    { to: '/staff/profile', label: 'Profile' },
    { to: '/staff/earnings', label: 'Current Earnings' },
    { to: '/staff/StaffShipmentHistory', label: 'Shipment History' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* sidebar     */}
      <Sidebar links={staffLinks}/>

      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-6 bg-white border-b shadow-sm">
          <h1 className="text-sm font-semibold text-slate-700">
            Delivery Staff Dashboard
          </h1>
          <div className='text-lg'>
           
           <Link to="/staff/notifications"> <FiBell  className="text-gray-700 cursor-pointer text-black text-2xl" /></Link>
          </div>
        </header>
        <main className="flex-1 w-full overflow-x-hidden">
          {/* childpages */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;



