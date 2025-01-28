import React, { useState, useEffect } from "react";
import { Text } from "@react-three/drei";

const InputOnMesh: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isFocused) {
      if (event.key === "Backspace") {
        setInputText((prev) => prev.slice(0, -1)); // 文字を削除
      } else if (event.key.length === 1) {
        setInputText((prev) => prev + event.key); // 入力文字を追加
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused]);

  return (
    <mesh
      position={[0, -5, 0]}
      onPointerDown={() => setIsFocused(true)} // クリックでフォーカスを取得
      onPointerMissed={() => setIsFocused(false)} // クリックを外したらフォーカスを外す
    >
      <planeGeometry args={[3, 1]} />
      <meshStandardMaterial color={isFocused ? "lightblue" : "white"} />

      {/* テキストを表示 */}
      <Text
        color="black"
        fontSize={0.3}
        anchorX="left"
        anchorY="middle"
        position={[-1.4, 0, 0.1]}
      >
        {inputText || "クリックして入力"}
      </Text>
    </mesh>
  );
};

export default InputOnMesh;