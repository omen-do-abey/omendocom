'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stars, 
  Float, 
  Text, 
  MeshTransmissionMaterial, 
  Sparkles, 
  Environment 
} from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import * as THREE from 'three';

// Footer එක Import කරගැනීම (ඔබේ Footer.tsx ෆයිල් එක app ෆෝල්ඩරයේ ඇති බව තහවුරු කරගන්න)
import Footer from './footer';

// --- 1. මැජිකල් පළිඟුව (THE MAGIC CORE) ---
function CrystalCore() {
  const mesh = useRef<THREE.Mesh>(null);
  
  // පළිඟුව හිමින් කරකැවීම
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0}
          transmission={1} 
          ior={1.5} 
          chromaticAberration={1} 
          background={new THREE.Color('#000')}
        />
      </mesh>
    </Float>
  );
}

// --- 2. පාවෙන මෙනු බොත්තම් (FLOATING MENU) ---
function MenuButton({ position, text, link, color = "white" }: any) {
  const router = useRouter();
  const [hovered, setHover] = useState(false);

  return (
    <group position={position}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          fontSize={0.3}
          color={hovered ? "#ff0080" : color}
          anchorX="center"
          anchorY="middle"
          onClick={() => router.push(link)}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
        >
          {text}
        </Text>
      </Float>
    </group>
  );
}

// --- 3. ප්‍රධාන පිටුව (MAIN SCENE) ---
export default function Home() {
  return (
    // මුළු පිටුවම ආවරණය වන Div එක (Scroll කිරීමට ඉඩ දේ)
    <div className="w-full bg-black min-h-screen">
      
      {/* 1. HERO SECTION: 3D දර්ශනය (තිරය පුරාම පවතී - 100vh) */}
      <div className="h-screen w-full relative">
        {/* UI Overlay - නම සහ තනතුර */}
        <div className="absolute top-10 left-10 z-10 pointer-events-none text-white mix-blend-difference">
          <h1 className="text-6xl font-bold tracking-tighter">OMINDU.DEV</h1>
          <p className="text-xl text-pink-400 mt-2 tracking-widest">UX ENGINEER & HISTORIAN</p>
        </div>

        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <Environment preset="city" />

          <CrystalCore />

          <MenuButton position={[-2.5, 0, 0]} text="MUSEUM" link="/museum" color="#00ffff" />
          <MenuButton position={[2.5, 0, 0]} text="PROJECTS" link="/projects" />
          <MenuButton position={[0, -2.5, 0]} text="ABOUT ME" link="/about" />
          
          <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#ff0080" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Zoom කිරීම නැවැත්වුවෙමි, එවිට පහළට Scroll කිරීම පහසු වේ */}
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </div>

      {/* 2. FOOTER SECTION: 3D එකට පහළින් පෙන්වයි */}
      <Footer />
      
    </div>
  );
}