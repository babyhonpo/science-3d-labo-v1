import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

type Props = {
    isDragging: boolean; // ✅ ドラッグ中かどうかを判定
};

const FreeCamera: React.FC<Props> = ({ isDragging }) => {
    const { camera } = useThree();
    const moveSpeed = 0.1; // 基本の移動速度
    const shiftMultiplier = 3; // Shift キーを押したときの加速倍率
    const rotationSpeed = 0.002; // カメラの回転速度
    const direction = useRef(new THREE.Vector3());
    const keys = useRef<{ [key: string]: boolean }>({});

    // **キーボードイベントのリスナー**
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            keys.current[event.key.toLowerCase()] = true;
        };
        const handleKeyUp = (event: KeyboardEvent) => {
            keys.current[event.key.toLowerCase()] = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // **マウスドラッグでカメラの方向を変更**
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging) return;

            const sensitivity = 0.8; // **回転の感度を調整**
            const deltaX = event.movementX * rotationSpeed * sensitivity;
            const deltaY = event.movementY * rotationSpeed * sensitivity;

            // **不要なブレを防ぐ**
            if (Math.abs(deltaX) > 0.0001 || Math.abs(deltaY) > 0.0001) {
                camera.rotation.y -= deltaX;
                camera.rotation.x -= deltaY;
                camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
            }
        };

        if (!isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
        } else {
            document.removeEventListener("mousemove", handleMouseMove);
        }

        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [isDragging]);


    // **カメラ移動処理**
    useFrame(() => {
        if (isDragging) return;

        direction.current.set(0, 0, 0);
        let speed = moveSpeed;
        if (keys.current["shift"]) speed *= shiftMultiplier; // Shift を押したら加速

        if (keys.current["w"]) direction.current.z -= speed; // 前進
        if (keys.current["s"]) direction.current.z += speed; // 後退
        if (keys.current["a"]) direction.current.x -= speed; // 左移動
        if (keys.current["d"]) direction.current.x += speed; // 右移動

        // カメラの向きを考慮して移動方向を調整
        direction.current.applyEuler(camera.rotation);
        camera.position.add(direction.current);
    });


    return (
        <>
            {/* **オブジェクト操作時はオービットカメラを有効にする** */}
            {isDragging && <OrbitControls />}
        </>
    );
};

export default FreeCamera;
