import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FreeCamera = () => {
  const { camera, gl } = useThree();
  const moveSpeed = 5; // 基本の移動速度
  const lookSpeed = 0.002; // 視点の感度

  const direction = useRef(new THREE.Vector3()); // 前方ベクトル
  const right = useRef(new THREE.Vector3()); // 右方向ベクトル
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const pitch = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const isMouseDown = useRef(false);

  useEffect(() => {
    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 5, 10));
  }, []);

  // キーボードイベントのリスナー
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current) return;
      pitch.current.y -= event.movementX * lookSpeed; // 左右の回転のみ
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
      gl.domElement.requestPointerLock(); // マウスをロック
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      document.exitPointerLock(); // マウスロックを解除
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          velocity.current.z = moveSpeed;
          break;
        case "KeyS":
          velocity.current.z = -moveSpeed;
          break;
        case "KeyA":
          velocity.current.x = -moveSpeed;
          break;
        case "KeyD":
          velocity.current.x = moveSpeed;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "KeyS":
          velocity.current.z = 0;
          break;
        case "KeyA":
        case "KeyD":
          velocity.current.x = 0;
          break;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl]);

  useFrame(() => {
    // z 軸の回転はしない

    // カメラの前方ベクトルを更新
    camera.getWorldDirection(direction.current);

    // カメラの右方向ベクトルを取得（前方ベクトルと Y軸の外積）
    right.current
      .crossVectors(direction.current, new THREE.Vector3(0, 1, 0))
      .normalize();

    // X,Y軸の移動(Z軸は固定)
    camera.position.addScaledVector(direction.current, velocity.current.z); // 前後の移動
    camera.position.addScaledVector(right.current, velocity.current.x); // 左右の移動

    // カメラの回転を更新
    camera.quaternion.setFromEuler(pitch.current);
  });

  return null;
};

export default FreeCamera;
