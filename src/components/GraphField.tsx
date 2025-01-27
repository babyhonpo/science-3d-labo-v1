import React, { useRef } from "react";
import * as THREE from "three";

type GraphFieldProps = {
  data: { x: number; y: number; z?: number }[]; // データ形式を指定
};

const GraphField: React.FC<GraphFieldProps> = ({ data }) => {
  const graphRef = useRef<THREE.Group>(null!);

  // データをThree.jsの座標形式に変換
  const points: THREE.Vector3[] = data.map((point) =>
    new THREE.Vector3(point.x, point.y, point.z || 0) // zが未指定の場合は0をデフォルト
  );
  // ライン用のジオメトリを作成
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group ref={graphRef} position={[1, 1, 0]} rotation={[-Math.PI / 1, 0, 0]}>
      {/* グラフの背景としての平面 */}
      <mesh position={[3, 0, 0]}>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color="lightblue" side={THREE.DoubleSide} />
      </mesh>

      {/* グラフのライン */}
      <line>
        <bufferGeometry attach="geometry" {...lineGeometry} />
        <lineBasicMaterial attach="material" color="blue" />
      </line>

      {/* グラフの点 */}
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </group>
  );
};

export default GraphField;