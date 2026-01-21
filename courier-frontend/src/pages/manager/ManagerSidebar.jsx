import React from 'react';
import { Package, Users, TruckIcon, AlertCircle, Import } from 'lucide-react';
import Sidebar from '../../components/common/sidebar';

const managerLinks = [
  { to: '/manager/dashboard', label: 'Dashboard', icon: Package },
  { to: '/manager/staff', label: 'Manage Staff', icon: Users },
  { to: '/manager/deliveries', label: 'Monitor Deliveries', icon: TruckIcon },
  { to: '/manager/reports', label: 'Reports', icon: AlertCircle },
];

export default function ManagerLayout(){
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0">
        <Sidebar links={managerLinks} />
      </aside>

      <main className="flex-1 p-6 bg-gray-50 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

