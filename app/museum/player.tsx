'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';

export default function Player() {
  const { camera } = useThree();
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  // 1. Listen for Key Presses
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(true);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(true);
          break;
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(true);
          break;
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(true);
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(false);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(false);
          break;
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(false);
          break;
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(false);
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // 2. The Movement Logic Loop (Runs 60 times a second)
  useFrame((state, delta) => {
    // Friction (Slows you down when you stop pressing keys)
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;

    // Calculate direction based on keys
    direction.current.z = Number(moveForward) - Number(moveBackward);
    direction.current.x = Number(moveRight) - Number(moveLeft);
    direction.current.normalize(); // Ensures diagonal movement isn't faster

    // Apply movement force
    if (moveForward || moveBackward) velocity.current.z -= direction.current.z * 40.0 * delta;
    if (moveLeft || moveRight) velocity.current.x -= direction.current.x * 40.0 * delta;

    // Apply the movement to the camera
    // We use moveRight() and moveForward() so movement is relative to where you are looking
    state.camera.translateX(-velocity.current.x * delta);
    state.camera.translateZ(velocity.current.z * delta);
    
    // 🔒 Lock Height (prevent flying)
    // Adjust '1.8' to change your eye level height
    state.camera.position.y = 1.8; 
  });

  return <PointerLockControls />;
}