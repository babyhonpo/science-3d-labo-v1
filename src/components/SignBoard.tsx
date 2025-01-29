import React from 'react';
import { Text } from '@react-three/drei';

const SignBoard: React.FC<{ position: [x: number, y: number, z: number]; text: string }> = ({
  position,
  text,
}) => {
  return (
    <group position={position}>
      {/* 看板の背景 */}
      <mesh>
        <planeGeometry args={[5, 1.5]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      {/* 看板の文字 */}
      <Text
        position={[0, 0, 0.1]} // 少し前に出す
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

export default SignBoard;
