import React from "react";
import BoxScene from "./components/Three Fiber/BoxScene";

const App = () => {
  return (
    <div>
      {/* <h1 className='flex justify-center items-center font-bold text-3xl h-screen'>COURIER MANAGEMENT SYSTEM</h1> */}
      <BoxScene fbxUrl={"/models/orangeTruck.fbx"} />
    </div>
  );
};

export default App;
