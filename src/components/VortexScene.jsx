// src/components/VortexScene.jsx
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// --- CONFIGURATION ---
const RADIUS = 4; // የክቡ ስፋት
const NODES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// --- MATH HELPER ---
// ቁጥሮቹን በክብ ላይ ማስቀመጫ ቀመር (Polar to Cartesian)
const getPosition = (number) => {
  // 9 is at the top (90 degrees or PI/2), but counting usually goes clockwise
  // Let's map 9 to Top, 1 to Top-Right, etc.
  // Each step is 40 degrees (2 * PI / 9)
  
  // Angle correction so 9 is at top
  const angle = ((number - 9) * (Math.PI * 2) / 9) + (Math.PI / 2);
  
  const x = RADIUS * Math.cos(angle);
  const y = RADIUS * Math.sin(angle);
  return [x, y, 0];
};

// --- COMPONENT: THE VORTEX DIAGRAM ---
const VortexDiagram = () => {
  const groupRef = useRef();

  // 1. The Physical Circuit (1 -> 2 -> 4 -> 8 -> 7 -> 5 -> 1)
  const materialPathPoints = useMemo(() => {
    const sequence = [1, 2, 4, 8, 7, 5, 1];
    return sequence.map(n => new THREE.Vector3(...getPosition(n)));
  }, []);

  // 2. The Aether Circuit (3 -> 9 -> 6 -> 3) - The Symbol of Enlightenment
  const aetherPathPoints = useMemo(() => {
    const sequence = [3, 9, 6, 3];
    return sequence.map(n => new THREE.Vector3(...getPosition(n)));
  }, []);

  // Rotate the whole system slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * 0.1; // ቀስ ብሎ መሽከርከር
    }
  });

  return (
    <group ref={groupRef}>
      {/* --- NODES (The Numbers) --- */}
      {NODES.map((num) => {
        const pos = getPosition(num);
        const isAether = [3, 6, 9].includes(num);
        
        return (
          <group key={num} position={pos}>
            {/* The Sphere/Dot */}
            <mesh>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial 
                color={isAether ? "#FFD700" : "#00F0FF"} // Gold for 3-6-9, Blue for others
                emissive={isAether ? "#FFD700" : "#00F0FF"}
                emissiveIntensity={2}
              />
            </mesh>
            
            {/* The Text Number */}
            <Text
              position={[0, 0.4, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/audiowide/v16/l7gZf_ch6Pjm05lZyoflMI4.woff" // Sci-fi font
            >
              {num}
            </Text>
          </group>
        );
      })}

      {/* --- LINES (The Flow) --- */}
      
      {/* 1. The Doubling Circuit (Blue) */}
      <Line
        points={materialPathPoints}
        color="#00F0FF"
        lineWidth={2}
        transparent
        opacity={0.8}
      />

      {/* 2. The Aether Triangle (Gold) */}
      <Line
        points={aetherPathPoints}
        color="#FFD700"
        lineWidth={3} // Thicker line for the control system
        transparent
        opacity={0.9}
        dashed={false}
      />

      {/* 3. Connection to Center (Optional - Tesla usually connects all to center/9) */}
      {/* Let's visualize the "Flow" from 9 */}
      <Line 
        points={[new THREE.Vector3(...getPosition(9)), new THREE.Vector3(0,0,0)]}
        color="#FF0000"
        lineWidth={1}
        opacity={0.3}
        transparent
      />

    </group>
  );
};

// --- MAIN EXPORT ---
export default function VortexScene() {
  return (
    <div className="w-full h-[500px] border border-gray-800 rounded-lg overflow-hidden relative bg-black">
      <div className="absolute top-2 left-2 z-10 text-xs text-tesla-blue font-mono">
        VISUALIZER_MODE: ORBITAL
      </div>
      
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Controls */}
        <OrbitControls enableZoom={false} />

        {/* The Magic Circle */}
        <VortexDiagram />
      </Canvas>
    </div>
  );
}
