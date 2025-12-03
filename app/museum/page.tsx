'use client';

import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Stars, Float, Text, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import Player from './player'; 
// Import the file you just made

// --- COMPONENT: DOCUMENT / ARTIFACT ---
// This represents your collected papers/documents inside the case
function DocumentDisplay({ position, color = "white" }: { position: [number, number, number], color?: string }) {
  return (
    <group position={position} rotation={[-0.2, 0, 0]}> {/* Tilted slightly back like a display */}
      {/* The Paper Sheet */}
      <mesh>
        <planeGeometry args={[0.5, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Some fake text lines */}
      <mesh position={[0, 0.1, 0.01]}>
        <planeGeometry args={[0.3, 0.02]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      

      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.3, 0.02]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      <mesh position={[0, -0.1, 0.01]}>
        <planeGeometry args={[0.3, 0.02]} />
        <meshBasicMaterial color="#333" />
      </mesh>
    </group>
  );
}

// --- COMPONENT: THE GLASS CABINET (VITRINE) ---
function GlassCabinet({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  // Cabinet Dimensions
  const width = 2;
  const height = 3.5;
  const depth = 1;

  return (
    <group position={position} rotation={rotation}>
      
      {/* 1. INTERNAL LIGHTING (The key to your photo's look) */}
      {/* A warm yellow point light inside the box */}
      <pointLight position={[0, 1.5, 0.2]} intensity={1.5} distance={5} color="#ffcc77" decay={2} />
      
      {/* 2. THE FRAME (Dark Wood) */}
      {/* Top Frame */}
      <mesh position={[0, height/2, 0]}>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
        <meshStandardMaterial color="#1a110d" roughness={0.8} />
      </mesh>
      {/* Bottom Frame/Base */}
      <mesh position={[0, -height/2, 0]}>
        <boxGeometry args={[width + 0.1, 0.5, depth + 0.1]} />
        <meshStandardMaterial color="#1a110d" roughness={0.8} />
      </mesh>
      {/* Vertical Posts (Corners) */}
      {[-width/2, width/2].map((x) => (
        [-depth/2, depth/2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]}>
            <boxGeometry args={[0.08, height, 0.08]} />
            <meshStandardMaterial color="#1a110d" roughness={0.8} />
          </mesh>
        ))
      ))}

      {/* 3. THE BACKBOARD (Yellowish Cream from photo) */}
      <mesh position={[0, 0, -depth/2 + 0.05]}>
        <boxGeometry args={[width - 0.1, height - 0.1, 0.05]} />
        <meshStandardMaterial color="#f2e6c2" roughness={1} />
      </mesh>

      {/* 4. THE GLASS (Physical Material) */}
      {/* Front Glass */}
      <mesh position={[0, 0, depth/2]}>
        <planeGeometry args={[width, height]} />
        <meshPhysicalMaterial 
          transmission={0.95} // Glass transparency
          roughness={0.05}    // Smooth surface
          thickness={0.1}     // Refraction thickness
          ior={1.5}           // Index of refraction for glass
          transparent
          opacity={0.3}
          color="white"
        />
      </mesh>
      {/* Side Glass (Left/Right) */}
      {[-1, 1].map((dir) => (
        <mesh key={dir} position={[dir * (width/2), 0, 0]} rotation={[0, Math.PI/2, 0]}>
          <planeGeometry args={[depth, height]} />
          <meshPhysicalMaterial transmission={0.95} roughness={0.05} thickness={0.1} ior={1.5} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* 5. CONTENTS (Documents) */}
      {/* Top Shelf Document */}
      <DocumentDisplay position={[0, 1, 0]} color="#f0f0f0" />
      {/* Middle Shelf Document */}
      <DocumentDisplay position={[-0.5, 0, 0]} color="#ffffee" />
      <DocumentDisplay position={[0.5, 0, 0]} color="#fff8e1" />
      
      {/* Shelf geometry */}
      <mesh position={[0, 0.2, 0]}>
         <boxGeometry args={[width-0.2, 0.05, depth-0.2]} />
         <meshStandardMaterial color="#1a110d" />
      </mesh>

    </group>
  );

}

// --- COMPONENT: CEILING RAFTERS (Dark Beams) ---
function CeilingBeams() {
  const beams = [];
  for (let z = -15; z < 15; z += 2.5) {
    beams.push(
      <mesh key={z} position={[0, 4.5, z]}>
        <boxGeometry args={[20, 0.3, 0.3]} />
        <meshStandardMaterial color="#1a0f0a" roughness={1} />
      </mesh>
    );
  }
  return <group>{beams}</group>;
}

// --- MAIN SCENE ---
export default function MuseumPage() {
  return (
    <div className="h-screen w-full bg-[#111]">
      <div className="absolute top-10 left-10 z-10 pointer-events-none text-[#d4af37]">
        <h1 className="text-3xl font-serif tracking-widest uppercase">The Archive</h1>
        <p className="text-sm opacity-70">Heritage Collection</p>
      </div>

      <Canvas shadows camera={{ position: [0, 1.8, 6], fov: 60 }}>
        {/* Environment Base Lighting */}
        <color attach="background" args={['#222']} /> 
        <ambientLight intensity={0.2} />

        <Suspense fallback={null}>
          
          {/* THE ROOM */}
          {/* 1. Floor (Dark Wood/Tile) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[30, 40]} />
            <meshStandardMaterial color="#2b1d16" roughness={0.6} />
          </mesh>

          {/* 2. Walls (White Plaster) */}
          {/* Left Wall */}
          <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI/2, 0]}>
            <planeGeometry args={[40, 6]} />
            <meshStandardMaterial color="#e6e1d8" roughness={1} />
          </mesh>
          {/* Right Wall */}
          <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI/2, 0]}>
            <planeGeometry args={[40, 6]} />
            <meshStandardMaterial color="#e6e1d8" roughness={1} />
          </mesh>
          {/* Back Wall */}
          <mesh position={[0, 2.5, -10]}>
            <planeGeometry args={[12, 6]} />
            <meshStandardMaterial color="#e6e1d8" roughness={1} />
          </mesh>

          {/* 3. Ceiling Beams */}
          <CeilingBeams />

          {/* THE EXHIBITS (Glass Cabinets) */}
          {/* Left Row */}
          <GlassCabinet position={[-4, 1.75, -2]} rotation={[0, 0.4, 0]} />
          <GlassCabinet position={[-4, 1.75, -6]} rotation={[0, 0.2, 0]} />
          
          {/* Right Row */}
          <GlassCabinet position={[4, 1.75, -2]} rotation={[0, -0.4, 0]} />
          <GlassCabinet position={[4, 1.75, -6]} rotation={[0, -0.2, 0]} />

          {/* Controls */}
          <Player />
        </Suspense>
      </Canvas>
    </div>
  );
}