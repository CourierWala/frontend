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


                    {/* Delivery Staff Routes */}
                    <Route
                        path="/staff/dashboard"
                        element={
                            // <ProtectedRoute>
                            // <RoleBasedRoute allowedRoles={["delivery_staff"]}>
                            <StaffDashboard />
                            // </RoleBasedRoute>
                            // </ProtectedRoute>
                        }
                    />

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

                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default AppRoutes


