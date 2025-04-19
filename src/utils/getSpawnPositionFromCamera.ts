import * as THREE from "three";

export const getSpawnPositionFromCamera = (camera: THREE.Camera): THREE.Vector3 => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction); // カメラの向きを取得

    const spawnDistance = 5; // カメラからの距離
    const spawnPosition = new THREE.Vector3().copy(camera.position).add(direction.multiplyScalar(spawnDistance));

    return spawnPosition;
};
