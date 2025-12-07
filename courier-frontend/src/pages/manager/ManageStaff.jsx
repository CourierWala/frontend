import React, { useState } from "react";
import { UserPlus, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ManagerLayout from "../../layouts/ManagerLayout";

export default function ManageStaff() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffList, setStaffList] = useState([
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
  ]);

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

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
  };

  const handleRemove = (id) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      setStaffList(staffList.filter((s) => s.id !== id));
    }
  };

  return (
    <ManagerLayout>
      <div className="space-y-6">
        {/* Staff Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staff by Location */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="mb-4">Staff Distribution by Location</h3>
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
          </div>

          {/* Staff by Role */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="mb-4">Staff by Role</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={staffByRole}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
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
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <h2 className="mb-4">Staff Management Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 px-4 md:px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <UserPlus size={20} />
              <span>Add New Staff</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Edit size={20} />
              <span>Update Staff Info</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              <Trash2 size={20} />
              <span>Remove Staff</span>
            </button>
          </div>
        </div>

        {/* Staff List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2>Current Staff Members</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {staffList.map((staff) => (
              <div
                key={staff.id}
                className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2">{staff.name}</h3>

                    <div className="space-y-2 text-gray-600 text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-orange-500" />
                        <span className="break-all">{staff.email}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-orange-500" />
                        <span>{staff.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-orange-500" />
                        <span>{staff.location}</span>
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
                      onClick={() => handleEdit(staff)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit size={20} />
                    </button>

                    <button
                      onClick={() => handleRemove(staff.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-4 md:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="mb-4">Add New Staff Member</h2>
              <form className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter phone"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Role</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>Delivery Driver</option>
                    <option>Warehouse Staff</option>
                    <option>Customer Support</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter location"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ManagerLayout>
  );
}
