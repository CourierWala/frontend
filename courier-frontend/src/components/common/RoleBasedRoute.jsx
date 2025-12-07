import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({children, allowedRoles}) => {

    const { role, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    
    if (!(allowedRoles._includes(role))) return <Navigate to="/unauthorized" />

    return children;
     
}

export default RoleBasedRoute
