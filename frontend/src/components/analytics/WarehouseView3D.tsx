import React, { useRef } from 'react';
import { Canvas, useFrame, extend, ThreeElements } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Extend Three.js elements
extend(THREE);

interface WarehouseView3DProps {
  layout: {
    shelves: Array<{
      position: [number, number, number];
      size: [number, number, number];
      utilization: number;
    }>;
  };
}

interface BoxProps {
  position: [number, number, number];
  color?: string;
  scale?: [number, number, number];
}

const Box: React.FC<BoxProps> = ({ position, color = '#4CAF50', scale = [1, 1, 1] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Floor: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
};

const Scene: React.FC<{ layout: WarehouseView3DProps['layout'] }> = ({ layout }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Floor />
      {layout.shelves.map((shelf, index) => (
        <Box key={index} position={shelf.position} color={shelf.utilization > 0.5 ? '#E91E63' : '#1E88E5'} scale={shelf.size} />
      ))}
    </>
  );
};

const WarehouseView3D: React.FC<WarehouseView3DProps> = ({ layout }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">3D仓库布局</h3>
      <div className="w-full h-[500px] rounded-lg overflow-hidden">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[10, 10, 10]} />
          <OrbitControls enableDamping dampingFactor={0.05} />
          <Scene layout={layout} />
        </Canvas>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>使用鼠标拖动旋转视角</span>
          <span>滚轮缩放</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-300"></div>
          <span>低使用率</span>
          <div className="w-3 h-3 rounded-full bg-blue-500 ml-2"></div>
          <span>高使用率</span>
        </div>
      </div>
    </div>
  );
};

export default WarehouseView3D; 