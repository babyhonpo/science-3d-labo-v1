import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FreeCamera = () => {
  const { camera, gl } = useThree();
  const moveSpeed = 0.2; // 基本の移動速度
  const lookSpeed = 0.002; // 視点の感度

  const direction = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const pitch = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const isMouseDown = useRef(false);

  useEffect(() => {
    console.log("カメラ初期位置:", camera.position);
    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 5, 10));

    camera.getWorldDirection(direction.current);
    console.log("カメラの向き:", direction.current);
  }, []);

  // **キーボードイベントのリスナー**
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
      switch (event.key) {
        case "KeyW":
          velocity.current.y = moveSpeed;
          break;
        case "KeyS":
          velocity.current.y = -moveSpeed;
          break;
        case "KeyA":
          velocity.current.x = -moveSpeed;
          break;
        case "KeyD":
          velocity.current.x = moveSpeed;
          break;
      }
      console.log("キー押下:", event.code, "速度:", velocity.current);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "KeyS":
          velocity.current.y = 0;
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
    // camera.position.z = 10;

    // // カメラの方向を更新
    camera.getWorldDirection(direction.current);

    // X,Y軸の移動(Z軸は固定)
    camera.position.x += direction.current.x * moveSpeed * velocity.current.x;
    camera.position.y += direction.current.y * moveSpeed * velocity.current.y;

    // カメラの回転を更新
    camera.rotation.set(pitch.current.x, pitch.current.y, 0);
  });

  return null;
};

export default FreeCamera;
