'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

export default function Home() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} />
        <Box args={[2, 2, 2]}>
          <meshStandardMaterial color="hotpink" />
        </Box>
        <OrbitControls />
      </Canvas>
      <div className="absolute top-10 left-10 text-white font-mono text-2xl">
        <h1>PORTFOLIO_SYSTEM_INIT // </h1>
      </div>
    </div>
  );
}
