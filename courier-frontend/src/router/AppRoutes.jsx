import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/login/Login'
import SignUp from '../pages/auth/signup/SignUp'
import ProtectedRoute from '../components/common/ProtectedRoute'
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
import MonitorDeliveries from '../pages/manager/MonitorDeliveries'
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


const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<LandingPage />} />

                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />


                    {/* Customer Routes */}
                    <Route
                        path="/customer/dashboard"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["customer"]}>
                            <Dashboard />
                            // </RoleBasedRoute>
                            // </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer/book"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["customer"]}>
                            <NewShipment />
                            // </RoleBasedRoute>
                            // </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer/track"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["customer"]}>
                            <TrackPackage />
                            // </RoleBasedRoute>
                            // </ProtectedRoute>
                        }
                    />

                     <Route
                        path="/customer/deliveries"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["customer"]}>
                            <ShipmentHistory />
                            // </RoleBasedRoute>
                            // </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customer/profile"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["customer"]}>
                            <ProfileSettings />
                            // </RoleBasedRoute>
                            // </ProtectedRoute>
                        }
                    />


                  
                        {/* // staff routes */}
                <Route path="/staff" element={<StaffDashboard />}>

                    <Route 
                        path="dashboard" 
                        element={<Overview />} />
                    <Route 
                        path="profile" 
                        element={<Profile />} />
                    <Route 
                        path="earnings" 
                        element={<Earnings />} />
                    <Route 
                        path="StaffShipmentHistory" 
                        element={<StaffShipmentHistory />} />
                </Route>



                    {/* Manager Routes */}
                    <Route
                        path="/manager/dashboard"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["manager"]}>
                            <ManagerDashboard />
                            /* </RoleBasedRoute> */
                            // </ProtectedRoute>
                        }
                    />

                    {/* Manager Routes */}
                    <Route
                        path="/manager/staff"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["manager"]}>
                            <ManageStaff />
                            /* </RoleBasedRoute> */
                            // </ProtectedRoute>
                        }
                    />

                    {/* Manager deliveries route */}
                    <Route
                        path="/manager/analytics"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["manager"]}>
                            <MonitorDeliveries />
                            /* </RoleBasedRoute> */
                            // </ProtectedRoute>
                        }
                    />

                    {/* Manager profile route */}
                    <Route
                        path="/manager/profile"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["manager"]}>
                            <ManagerProfileSettings />
                            /* </RoleBasedRoute> */
                            // </ProtectedRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                            // </RoleBasedRoute>
                            // </ProtectedRoute>
                        }
                    />

                    {/* Fallback */}
                    {/* <Route path="/" element={<LandingPage />}
                    /> */}
                    {/* {<div>Page Not Found</div>}  */}

                
                {/* // staff routes */}
                <Route path="/admin" element={<Admin />}>

                    <Route 
                        path="dashboard" 
                        element={<AdminDashboard />} />
                    <Route 
                        path="analytics" 
                        element={<AdminAnalytics />} />
                    <Route 
                        path="pricing" 
                        element={<AdminPricing />} />
                    <Route 
                        path="staff-management" 
                        element={<AdminStaffManagement />} />
                    <Route 
                        path="hub-management" 
                        element={<AdminHubManagement />} />
                    <Route 
                        path="investor-relations" 
                        element={<AdminInvestorRelations />} />
                    <Route 
                        path="profile" 
                        element={<AdminProfile />} />
                </Route>


                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default AppRoutes


