/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Sky, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const Building = ({ position, args, color }: { position: [number, number, number], args: [number, number, number], color: string }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.2} />
      {/* Windows effect */}
      <mesh position={[0, 0, args[2]/2 + 0.01]}>
        <planeGeometry args={[args[0] * 0.8, args[1] * 0.8]} />
        <meshStandardMaterial color="#333" emissive="#1a1a1a" />
      </mesh>
    </mesh>
  );
};

const CityCenter = () => {
  // Generate a grid of historical-looking buildings
  const buildings = useMemo(() => {
    const list = [];
    for (let x = -10; x <= 10; x += 3) {
      for (let z = -10; z <= 10; z += 3) {
        // Skip some spots for "streets"
        if (Math.abs(x) % 6 === 0 || Math.abs(z) % 6 === 0) continue;
        
        const height = 1 + Math.random() * 4;
        list.push({
          position: [x, height / 2, z] as [number, number, number],
          args: [1.5, height, 1.5] as [number, number, number],
          color: Math.random() > 0.5 ? "#8b7355" : "#5d4037"
        });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* Streets */}
      <gridHelper args={[100, 50, "#c5a059", "#333"]} position={[0, 0, 0]} />

      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}

      {/* Signature Building: Ferry Building-esque */}
      <group position={[15, 0, 0]}>
        <Building position={[0, 2, 0]} args={[4, 4, 2]} color="#d7ccc8" />
        <Building position={[0, 6, 0]} args={[1, 6, 1]} color="#bcaaa4" />
        <Text
          position={[0, 10, 0]}
          fontSize={1}
          color="#c5a059"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/specialelite/v18/XLYgIZb94ebmSXYPpS8TrF2LI70.woff"
        >
          FERRY BUILDING
        </Text>
      </group>

      {/* Signature Building: Palace Hotel-esque */}
      <group position={[-8, 0, 12]}>
        <Building position={[0, 3, 0]} args={[6, 6, 6]} color="#a1887f" />
        <Text
          position={[0, 7, 0]}
          fontSize={1}
          color="#c5a059"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/specialelite/v18/XLYgIZb94ebmSXYPpS8TrF2LI70.woff"
        >
          PALACE HOTEL
        </Text>
      </group>
    </group>
  );
};

export const City3D: React.FC = () => {
  return (
    <div className="w-full h-full bg-black relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={50} />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={10} 
          maxDistance={50}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} color="#c5a059" />

        <Sky sunPosition={[100, 20, 100]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <CityCenter />

        <Environment preset="city" />
      </Canvas>

      <div className="absolute top-4 left-4 p-4 bg-black/80 border border-[#c5a059] text-[#c5a059] font-mono text-xs z-50 pointer-events-none">
        <h3 className="font-bold border-b border-[#c5a059]/30 pb-2 mb-2 uppercase tracking-widest">3D Reconstruction</h3>
        <p>Market Street & Financial District</p>
        <p className="opacity-60 italic mt-2">Use mouse to navigate the ruins of the future-yet-past.</p>
      </div>
    </div>
  );
};
