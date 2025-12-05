import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Html, useProgress } from "@react-three/drei";

// Loader fallback that shows loading progress
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "#6da330ff" }}>{Math.round(progress)}% loading</div>
    </Html>
  );
}

// The actual 3D scene which loads the FBX model
function BoxModel({ url = "/models/orangeTruck.fbx", scale = 0.001 }) {
  // useFBX comes from @react-three/drei (it internally uses three's FBXLoader)
  const fbx = useFBX(url);
  const ref = useRef();

  // a simple rotation so the box is not completely static
  // move from left to center on load
  const speed = 1.5;
  useFrame((_, delta) => {
    if (ref.current) {
      if (ref.current.position.x < 0) {
        ref.current.position.x += delta * speed;
        if (ref.current.position.x > 0) ref.current.position.x = 0;
      }
    }
  });
  //    => {
  //     if (ref.current) ref.current.rotation.y += delta * 0.5
  //   })

  return (
    <group ref={ref} dispose={null} scale={scale} position={[0, 0.5, 0]}>
      <primitive object={fbx} />
    </group>
  );
}

export default function BoxScene({ fbxUrl = "/models/orangeTruck.fbx" }) {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas shadows camera={{ position: [3, 3, 6], fov: 50 }}>
        {/* Sky color */}
        <color attach="background" args={["#87CEEB"]} />

        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          intensity={1.8}
          position={[5, 10, 5]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Ground (green) */}
        {/* <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial metalness={0} roughness={1} color="#2e8b57" />
        </mesh> */}

        {/* Suspense for model loading */}
        <Suspense fallback={<Loader />}>
          <BoxModel url={fbxUrl} scale={0.02} position={[0, 0, 0]} />
        </Suspense>

        {/* Controls */}
        <OrbitControls enablePan enableRotate enableZoom />
      </Canvas>
    </div>
  );
}

/*
Usage:

1) Install dependencies (run in your React project):
   npm install three @react-three/fiber @react-three/drei
   # or with yarn:
   yarn add three @react-three/fiber @react-three/drei

2) Place your FBX file at: public/models/box.fbx
   (or change the `fbxUrl` prop when using the component)

3) In App.jsx import and use the component:

// App.jsx
import React from 'react'
import BoxScene from './BoxScene'

function App() {
  return (
    <div>
      <BoxScene fbxUrl={'/models/box.fbx'} />
    </div>
  )
}

export default App

Notes & tips:
- If your FBX model appears tiny or huge, tweak the `scale` prop in <BoxModel /> or pass a different `scale` value when calling <BoxScene />.
- If you prefer GLTF/GLB models they load faster and often have better PBR support: use useGLTF from drei instead of useFBX.
- Make sure to enable "public" folder serving in your build (Create React App does this by default).
- If you get CORS errors when loading from a remote URL, host the model on the same origin or enable proper CORS headers.
*/
