import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stats } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";

// ---------- TruckModel component ----------
// You can optionally pass `truckRef` from parent to read the truck position from outside.
function TruckModel({ url, onReady, entryCompleteRef, truckRef }) {
  // Load FBX
  const fbx = useLoader(FBXLoader, url);

  // allow external ref or create internal one
  const internalGroup = useRef();
  const group = truckRef ?? internalGroup;

  const wheels = useRef([]);

  // find candidate wheel meshes by name (best-effort)
  useEffect(() => {
    if (!fbx) return;
    const found = [];
    fbx.traverse((c) => {
      if (c.isMesh && /wheel|tyre|tire/i.test(c.name)) found.push(c);
    });
    wheels.current = found;
  }, [fbx]);

  // entry animation (2 seconds) using smoothstep easing
  const [entryDone, setEntryDone] = useState(false);
  const positionRef = useRef([-52, 0, 0]);
  const startTimeRef = useRef(null);

  useFrame((state, delta) => {
    if (!startTimeRef.current) startTimeRef.current = state.clock.elapsedTime;
    if (!entryDone) {
      const elapsed = state.clock.elapsedTime - startTimeRef.current;
      const duration = 3.0; // seconds
      const tRaw = Math.min(Math.max(elapsed / duration, 0), 1);
      const t = tRaw * tRaw * (3 - 2 * tRaw); // smoothstep ease-in-out
      const x = -12 + (0 - -12) * t;
      positionRef.current = [x, 0, 0];
      if (group.current) group.current.position.set(x, 0, 0);
      if (tRaw >= 1) {
        setEntryDone(true);
        entryCompleteRef.current = true;
        if (onReady) onReady();
      }
    }
  });

  // wheel rotation – ALWAYS rotating
  useFrame((state, delta) => {
    const speed = 8;
    wheels.current.forEach((w) => {
      w.rotation.z -= delta * speed;
    });

    // subtle suspension bobbing only AFTER entry completes
    if (entryCompleteRef.current && group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={group} position={[-12, 0, 0]} dispose={null}>
      {/* scale tuned to your model; change [0.02,0.02,0.02] if needed */}
      <primitive object={fbx} scale={[0.02, 0.02, 0.02]} />
    </group>
  );
}

// ---------- Simple cloud component ----------
function Cloud({ startX = 10, z = -150, speed = 0.6 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.x -= delta * speed;
    if (ref.current.position.x < -12) ref.current.position.x = startX;
  });
  return (
    <group ref={ref} position={[startX, 18 + Math.random() * 0.8, z]}>
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 22, 22]} />
        <meshStandardMaterial metalness={0} roughness={1} />
      </mesh>
      <mesh position={[0.7, 0.15, 0]}>
        <sphereGeometry args={[0.45, 22, 22]} />
        <meshStandardMaterial metalness={0} roughness={1} />
      </mesh>
    </group>
  );
}

// ---------- Small bird (simple) ----------
function Bird({ start = [-30, 18.5, -10], speed = 2 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.x += delta * speed;
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 6) * 0.002;
    if (ref.current.position.x > 18) ref.current.position.x = -18;
  });
  return (
    <group ref={ref} position={start} rotation={[0, 0.2, 0]}>
      <mesh>
        <coneGeometry args={[0.06, 0.25, 6]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
}

// function CameraLookAtTruck({ truckRef }) {
//   const { camera } = useThree();

//   useFrame(() => {
//     if (truckRef.current) {
//       const target = truckRef.current.position;
//       camera.lookAt(target.x, target.y + 4, target.z);
//     }
//   });

//   return null;
// }
function CameraLookAtTruck({ truckRef }) {
  const { camera } = useThree();
  const startTimeRef = useRef(null);
  const animationDone = useRef(false);

  // camera starting position (from your Canvas)
  const startPos = useRef([0, 1.6, 5]);
  const endPos = [-4, 1, 10]; // <--- final camera position you asked for
  const duration = 4.0; // seconds for camera movement (adjust if needed)

  useEffect(() => {
    // set camera to initial position at mount
    camera.position.set(...startPos.current);
  }, [camera]);

  useFrame((state) => {
    const target = truckRef.current?.position;

    if (!target) return;

    // ---------- CAMERA POSITION ANIMATION ----------
    if (!animationDone.current) {
      if (!startTimeRef.current) startTimeRef.current = state.clock.elapsedTime;

      const elapsed = state.clock.elapsedTime - startTimeRef.current;
      const tRaw = Math.min(elapsed / duration, 1);

      // smoothstep easing
      const t = tRaw * tRaw * (3 - 2 * tRaw);

      // interpolate camera position
      camera.position.x =
        startPos.current[0] + (endPos[0] - startPos.current[0]) * t;
      camera.position.y =
        startPos.current[1] + (endPos[1] - startPos.current[1]) * t;
      camera.position.z =
        startPos.current[2] + (endPos[2] - startPos.current[2]) * t;

      if (tRaw >= 1) animationDone.current = true;
    }

    // ---------- ALWAYS LOOK AT TRUCK ----------
    camera.lookAt(target.x - 4, target.y + 2, target.z);
  });

  return null;
}

// ---------- Main Scene ----------
export default function TruckScene({ modelPath = "/models/orangeTruck.fbx" }) {
  const entryCompleteRef = useRef(false);
  // optional truckRef for later camera logic (pass to TruckModel if you want)
  const truckRef = useRef();

  return (
    <Canvas
      style={{ width: "100%", height: "100vh" }}
      shadows
      camera={{ position: [0, 1.6, 5], fov: 60 }}
    >
      <Suspense fallback={<Html>Loading model...</Html>}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />

        {/* Ground */}
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial roughness={1} metalness={0} />
        </mesh>

        {/* Truck */}
        <TruckModel
          url={modelPath}
          entryCompleteRef={entryCompleteRef}
          truckRef={truckRef}
        />

        <CameraLookAtTruck truckRef={truckRef} />
        {/* Clouds and bird - small number to create illusion of movement */}
        <Cloud startX={8} z={-15} speed={0.2} />
        <Cloud startX={20} z={-16} speed={0.55} />
        <Cloud startX={0} z={-18} speed={1} />
        <Bird start={[-19, 8.5, -2]} speed={2.6} />
        {/* <Bird start={[-20, 9, -3]} speed={2.6} />
        <Bird start={[-21, 9, -2]} speed={2.6} /> */}

        <OrbitControls enabled={false} />
      </Suspense>
      {/* <Stats position="top-left" /> */}
    </Canvas>
  );
}
