import * as THREE from "three"; // Three.jsをインポート
import { useEffect, useState } from "react";

const MouseControls = () => {
  const [selectedObject, setSelectedObject] = useState<THREE.Mesh | null>(null);

  // カメラ、Raycaster、マウスベクトルを初期化
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // マウスクリック時の処理
  const handleMouseDown = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([
      /* シーン内のオブジェクトを指定 */
    ]);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object as THREE.Mesh;
      clickedObject.material.color.set(0xff0000); // 色を変更
      setSelectedObject(clickedObject);
    }
  };

  // マウスアップ時の処理
  const handleMouseUp = () => {
    if (selectedObject) {
      selectedObject.material.color.set(0x0000ff); // 元の色に戻す
      setSelectedObject(null);
    }
  };

  // マウス移動時の処理
  const handleMouseMove = (event: MouseEvent) => {
    if (selectedObject) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(
        new THREE.Vector3(0, 0, 1),
        -camera.position.z
      );
      const intersectPoint = raycaster.ray.intersectPlane(plane);
      if (intersectPoint) {
        selectedObject.position.set(
          intersectPoint.x,
          intersectPoint.y,
          selectedObject.position.z
        );
      }
    }
  };

  // イベントリスナーの登録と解除
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [selectedObject]);

  return null; // 描画は必要ないのでコンポーネントは何も返さない
};

export default MouseControls;
