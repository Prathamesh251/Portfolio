import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useIsTouch } from '../../hooks/useIsTouch';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function NeuralIcosahedron({ isStatic = false }) {
  const groupRef = useRef(null);

  const { geometry, vertexPositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.1, 1);
    const posAttr = geo.attributes.position;
    const positions = [];
    const seen = new Set();

    for (let i = 0; i < posAttr.count; i++) {
      const x = Number(posAttr.getX(i).toFixed(2));
      const y = Number(posAttr.getY(i).toFixed(2));
      const z = Number(posAttr.getZ(i).toFixed(2));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        positions.push([x, y, z]);
      }
    }

    return { geometry: geo, vertexPositions: positions };
  }, []);

  useFrame((state, delta) => {
    if (isStatic || !groupRef.current) return;

    // Slow continuous rotation
    groupRef.current.rotation.y += delta * 0.15;

    // Subtle tilt toward pointer when idle
    const targetRotX = (state.pointer.y * Math.PI) * 0.08;
    const targetRotZ = (-state.pointer.x * Math.PI) * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Accent-colored wireframe icosahedron */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          wireframe
          color="#7C8CFF"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Nodes at vertices to suggest a neural network */}
      {vertexPositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#EDEDED" />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();
  const isStatic = isTouch || shouldReduceMotion;

  return (
    <div
      className="w-full h-full min-h-[320px] md:min-h-[460px] flex items-center justify-center relative select-none"
      data-cursor="hover"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <NeuralIcosahedron isStatic={isStatic} />

        {/* Orbit controls only enabled on non-touch and full-motion desktops */}
        {!isStatic && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.8}
          />
        )}
      </Canvas>
    </div>
  );
}
