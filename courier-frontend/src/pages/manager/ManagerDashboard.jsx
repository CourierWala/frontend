import React, { useState } from "react";
import { UserPlus, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ManagerLayout from "../../layouts/ManagerLayout";

const staffByLocation = [
  { location: "New York", count: 25 },
  { location: "Los Angeles", count: 20 },
  { location: "Chicago", count: 18 },
  { location: "Houston", count: 15 },
  { location: "Phoenix", count: 12 },
  { location: "Others", count: 10 },
];

const staffByRole = [
  { name: "Delivery Drivers", value: 45, color: "#f97316" },
  { name: "Warehouse Staff", value: 30, color: "#3b82f6" },
  { name: "Customer Support", value: 15, color: "#8b5cf6" },
  { name: "Management", value: 10, color: "#10b981" },
];

const initialStaffList = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@Courier-wala.com",
    phone: "+1 (555) 123-4567",
    role: "Delivery Driver",
    location: "New York Hub",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@Courier-wala.com",
    phone: "+1 (555) 234-5678",
    role: "Warehouse Staff",
    location: "Los Angeles Hub",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@Courier-wala.com",
    phone: "+1 (555) 345-6789",
    role: "Delivery Driver",
    location: "Chicago Hub",
  },
];

export default function ManagerDashboard() {
  const [staffList, setStaffList] = useState(initialStaffList);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleEdit = (staff) => setSelectedStaff(staff);
  const handleRemove = (id) =>
    setStaffList(staffList.filter((s) => s.id !== id));

  return (
    <ManagerLayout>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Manager!</h1>
        <p className="mt-2 text-orange-100">
          You have 3 new actions to take
        </p>
        <button className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-50">
          See the actions 
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Staff Distribution by Location">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={staffByLocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="location"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Staff by Role">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={staffByRole}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                dataKey="value"
              >
                {staffByRole.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {staffByRole.map((item, index) => (
              <LegendItem key={index} color={item.color} label={item.name} />
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ActionButton
          icon={<UserPlus size={20} />}
          label="Add New Staff"
          onClick={() => setShowAddModal(true)}
          color="orange"
        />
        <ActionButton
          icon={<Edit size={20} />}
          label="Update Staff Info"
          color="blue"
        />
        <ActionButton
          icon={<Trash2 size={20} />}
          label="Remove Staff"
          color="red"
        />
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h2>Current Staff Members</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {staffList.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onEdit={() => handleEdit(staff)}
              onRemove={() => handleRemove(staff.id)}
            />
          ))}
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <Modal
          title="Add New Staff Member"
          onClose={() => setShowAddModal(false)}
        >
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select className="w-full px-4 py-2 border rounded-lg">
              <option>Delivery Driver</option>
              <option>Warehouse Staff</option>
              <option>Customer Support</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                className="flex-1 px-4 py-2 border rounded-lg"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Add Staff
              </button>
            </div>
          </form>
        </Modal>
      )}
    </ManagerLayout>
  );
}

// ---------------------- Reusable Components ----------------------

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
    <h3 className="mb-4">{title}</h3>
    {children}
  </div>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: color }}
    ></div>
    <span className="text-gray-600">{label}</span>
  </div>
);

const ActionButton = ({ icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-4 md:px-6 py-4 bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 transition-colors`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const StaffCard = ({ staff, onEdit, onRemove }) => (
  <div className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4">
    <div className="flex-1">
      <h3 className="mb-2">{staff.name}</h3>
      <div className="space-y-2 text-gray-600 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-orange-500" />
          {staff.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-orange-500" />
          {staff.phone}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-orange-500" />
          {staff.location}
        </div>
      </div>
      <div className="mt-3">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {staff.role}
        </span>
      </div>
    </div>
    <div className="flex gap-2 md:flex-col">
      <button
        onClick={onEdit}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        <Edit size={20} />
      </button>
      <button
        onClick={onRemove}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl p-4 md:p-6 max-w-md w-full">
      <h2 className="mb-4">{title}</h2>
      {children}
    </div>
  </div>
);
