import React, { useEffect, useState } from "react";
import * as THREE from "three";

const FormOnMesh: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas"); // DOMに直接作成する
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 背景を描画
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // テキストを描画
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("名前:", 10, 30);
    ctx.fillText("メール:", 10, 70);

    // ボックスを描画
    ctx.strokeStyle = "black";
    ctx.strokeRect(70, 10, 200, 30); // 名前入力エリア
    ctx.strokeRect(70, 50, 200, 30); // メール入力エリア

    // CanvasTextureを作成して状態に設定
    setTexture(new THREE.CanvasTexture(canvas));
  }, []);

  if (!texture) return null; // テクスチャが準備できるまで何も描画しない

  return (
    <mesh position={[0, 2, 0]}>
      {/* 平面にCanvasTextureを適用 */}
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default FormOnMesh;
