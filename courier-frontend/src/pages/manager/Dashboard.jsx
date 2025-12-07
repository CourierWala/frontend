import { Package, Users, TruckIcon, AlertCircle } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import Sidebar from './ManagerSidebar';

export default function Dashboard() {
  const staffByDepartment = [
    { name: 'Delivery Drivers', value: 45, color: '#f97316' },
    { name: 'Warehouse', value: 30, color: '#3b82f6' },
    { name: 'Customer Support', value: 15, color: '#8b5cf6' },
    { name: 'Management', value: 10, color: '#10b981' }
  ];

  const deliveryStatus = [
    { status: 'Delivered', count: 145, color: '#10b981' },
    { status: 'In Transit', count: 67, color: '#f97316' },
    { status: 'Pending', count: 23, color: '#eab308' },
    { status: 'Delayed', count: 12, color: '#ef4444' }
  ];

  // ... (rest of your data)

  const totalStaff = staffByDepartment.reduce((sum, item) => sum + item.value, 0);
  const totalDeliveries = deliveryStatus.reduce((sum, item) => sum + item.count, 0);

  const activeDeliveriesData = deliveryStatus.find(d => d.status === 'In Transit');
  const delayedDeliveriesData = deliveryStatus.find(d => d.status === 'Delayed');

  const activeDeliveries = activeDeliveriesData ? activeDeliveriesData.count : 0;
  const delayedDeliveries = delayedDeliveriesData ? delayedDeliveriesData.count : 0;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Key Metrics */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Staff */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="text-blue-500" size={24} />
                </div>
              </div>
              <div className="text-gray-600 mb-1 text-sm md:text-base">Total Staff</div>
              <div className="text-2xl md:text-3xl">{totalStaff}</div>
            </div>

            {/* Total Deliveries */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="text-orange-500" size={24} />
                </div>
              </div>
              <div className="text-gray-600 mb-1 text-sm md:text-base">Total Deliveries</div>
              <div className="text-2xl md:text-3xl">{totalDeliveries}</div>
            </div>

            {/* Active Deliveries */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TruckIcon className="text-green-500" size={24} />
                </div>
              </div>
              <div className="text-gray-600 mb-1 text-sm md:text-base">Active Deliveries</div>
              <div className="text-2xl md:text-3xl">{activeDeliveries}</div>
            </div>

            {/* Delayed Deliveries */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="text-red-500" size={24} />
                </div>
              </div>
              <div className="text-gray-600 mb-1 text-sm md:text-base">Delayed</div>
              <div className="text-2xl md:text-3xl">{delayedDeliveries}</div>
            </div>
          </div>

          {/* ... rest of your charts and tables */}
        </div>
      </main>
    </div>
  );
}
