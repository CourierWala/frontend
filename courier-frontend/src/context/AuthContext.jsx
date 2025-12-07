import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load data when app starts
    useEffect(() => {
        // Example: restore from localStorage (optional)
        // const savedUser = localStorage.getItem("user");
        // if(savedUser) setUser(JSON.parse(savedUser));

        setLoading(false);
    }, []);

    const login = (userData, role) => {
        setUser(userData);
        setRole(role);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook (CORRECT)
export const useAuth = () => useContext(AuthContext);
