import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import { div } from "three/src/nodes/TSL.js";

const Player = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("Key pressed:", event.key);
      // シンプルなキーボード操作の例
      if (event.key === "w") {
        console.log("Move forward");
      }
      if (event.key === "s") {
        console.log("Move backward");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};


// 迷路の設計図（0は通路、1は壁）
const MAZE_MAP = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1],
]

function MazeStructure() {
  return (
    <group>
      {/* 床 */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[3, -0.5, 3]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* 迷路の壁 */}
      {MAZE_MAP.map((row, i) =>
        row.map((cell, j) => {
          if (cell === 1) {
            return (
              <Box key={`${i}-${j}`} position={[j, 0.5, i]} args={[1, 2, 1]} castShadow receiveShadow>
                <meshStandardMaterial color="#fff" />
              </Box>
            )
          }
          return null
        }),
      )}
    </group>
  )
}

const App = () => {
  return (
    <div style={{
      width:"100vw",
      height:"100vh"
    }}>
      
    <Canvas camera={{ position: [0, 5, 5], fov: 75 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Player />
        <MazeStructure />
      </Suspense>
    </Canvas>
    </div>
  );
};

export default App;
