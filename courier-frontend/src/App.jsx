import React from "react";
import BoxScene from "./components/Three Fiber/BoxScene";
import TruckScene from "./components/Three Fiber/truckScene";

import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './router/AppRoutes'

function App() {

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <TruckScene />

      {/* <h1>Hello</h1> */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
};

export default App;
