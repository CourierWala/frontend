import React from "react";

import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './router/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/Store";

function App() {
  return (
    <div className="truck-hover">
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Provider>
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default App;
