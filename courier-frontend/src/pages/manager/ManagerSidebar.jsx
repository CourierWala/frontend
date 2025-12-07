import { Package, Users, TruckIcon, AlertCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ManagerSidebar() {
  const location = useLocation();

  const links = [
    { to: '/manager/dashboard', label: 'Dashboard', icon: Package },
    { to: '/manager/staff', label: 'Manage Staff', icon: Users },
    { to: '/manager/deliveries', label: 'Monitor Deliveries', icon: TruckIcon },
    { to: '/manager/reports', label: 'Reports', icon: AlertCircle }
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col fixed h-full z-10 md:relative hidden md:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <Package className="text-orange-500" size={32} />
        <span className="text-xl font-bold">Courier wala Manager</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
