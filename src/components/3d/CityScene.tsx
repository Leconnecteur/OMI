import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';

const Building = ({ position, height, color }: any) => {
  return (
    <Box
      position={[position[0], height / 2, position[2]]}
      args={[1, height, 1]}
    >
      <meshStandardMaterial color={color} />
    </Box>
  );
};

const Chart = ({ position }: any) => {
  const bars = [2, 3, 1.5, 4, 2.5];
  return (
    <group position={position}>
      {bars.map((height, i) => (
        <Cylinder
          key={i}
          position={[i * 1.2 - 2, height / 2, 0]}
          args={[0.2, 0.2, height, 8]}
        >
          <meshStandardMaterial color="#8C7E6D" />
        </Cylinder>
      ))}
    </group>
  );
};

export default function CityScene() {
  const groupRef = useRef<any>();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Buildings */}
      <Building position={[-3, 0, -2]} height={5} color="#4A4238" />
      <Building position={[-1, 0, -3]} height={7} color="#8C7E6D" />
      <Building position={[1, 0, -2]} height={4} color="#B4A99A" />
      <Building position={[3, 0, -3]} height={6} color="#4A4238" />
      
      {/* Charts */}
      <Chart position={[0, 0, 2]} />
    </group>
  );
}
