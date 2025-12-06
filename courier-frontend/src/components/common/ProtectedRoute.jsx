import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
     
    const { user , loading} = useAuth();

    if (loading) return <h1 className='flex justify-center '>Loading...</h1>

    if (!user) return <Navigate to="/login" />

    // if no user authorized
    return children;
}

export default ProtectedRoute
