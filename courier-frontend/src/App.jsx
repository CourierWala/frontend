import React from "react";

import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './router/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="truck-hover">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
