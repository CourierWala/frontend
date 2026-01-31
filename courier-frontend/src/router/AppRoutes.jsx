import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/login/Login'
import SignUp from '../pages/auth/signup/SignUp'
import ProtectedRoute from '../components/common/ProtectedRoute'
// import { RoleBasedRoute } from '../components/common/RoleBasedRoute'
import RoleBasedRoute from '../components/common/RoleBasedRoute'
import Dashboard from "../pages/customer/Dashboard"
import StaffDashboard from '../pages/staff/StaffDashboard'
import ManagerDashboard from '../pages/manager/ManagerDashboard'
import AdminDashboard from "../pages/admin/AdminDashboard"
import LandingPage from '../pages/landingPage/LandingPage'
import NewShipment from '../pages/customer/NewShipment'
import TrackPackage from '../pages/customer/TrackPackage'
import ShipmentHistory from '../pages/customer/ShipmentHistory'
import ProfileSettings from '../pages/customer/ProfileSettings'
import ManageStaff from '../pages/manager/ManageStaff'
import ManagerProfileSettings from '../pages/manager/ManagerProfileSettings'
import Earnings from '../pages/staff/Earnings'
import Profile from '../pages/staff/Profile'

import Overview from '../pages/staff/Overview'
import StaffShipmentHistory from '../pages/staff/StaffShipmentHistory'
import AdminPricing from '../pages/admin/AdminPricing'
import AdminProfile from './../pages/admin/AdminProfile';
import AdminAnalytics from '../pages/admin/AdminAnalytics'
import AdminStaffManagement from '../pages/admin/AdminStaffManagement'
import AdminHubManagement from './../pages/admin/AdminHubManagement';
import AdminInvestorRelations from '../pages/admin/AdminInvestorRelations'
import Admin from '../pages/admin/Admin'
import NotificationTab from '../pages/staff/NotificationTab'
import StaffSignUp from '../pages/auth/signup/Staffsignup'
import HubOrders from '../pages/staff/AcceptedOrders'
import AcceptedOrders from '../pages/staff/AcceptedOrders'
import CurrentOrders from '../pages/staff/CurrentOrders'


const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<LandingPage />} />

                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="staffsignup" element={<StaffSignUp />} />
                    <Route path="/customer/track" element={<TrackPackage />} />


                    {/* Customer Routes */}
                    <Route
                        path="/customer/dashboard"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                                    <Dashboard />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer/book"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                                    <NewShipment />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer/track"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                                    <TrackPackage />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer/deliveries"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                                    <ShipmentHistory />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer/profile"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                                    <ProfileSettings />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/staff"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_DELIVERY_STAFF"]}>
                                    <StaffDashboard />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    >
                        <Route path="dashboard" element={<Overview />} />
                        <Route path="Hub-orders" element={<HubOrders />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="earnings" element={<Earnings />} />
                        <Route path="StaffShipmentHistory" element={<StaffShipmentHistory />} />
                        <Route path="notifications" element={<NotificationTab />} />
                        <Route path='accepted-Orders' element={<AcceptedOrders />} />
                        <Route path='current-Orders' element={<CurrentOrders />} />
                    </Route>

                    <Route
                        path="/manager/dashboard"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_STAFF_MANAGER"]}>
                                    <ManagerDashboard />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/manager/staff"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_STAFF_MANAGER"]}>
                                    <ManageStaff />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/manager/profile"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_STAFF_MANAGER"]}>
                                    <ManagerProfileSettings />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRoute allowedRoles={["ROLE_ADMIN"]}>
                                    <Admin />
                                </RoleBasedRoute>
                            </ProtectedRoute>
                        }
                    >
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="analytics" element={<AdminAnalytics />} />
                        <Route path="pricing" element={<AdminPricing />} />
                        <Route path="staff-management" element={<AdminStaffManagement />} />
                        <Route path="hub-management" element={<AdminHubManagement />} />
                        <Route path="investor-relations" element={<AdminInvestorRelations />} />
                        <Route path="profile" element={<AdminProfile />} />
                    </Route>


                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default AppRoutes


