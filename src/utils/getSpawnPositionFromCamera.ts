import * as THREE from "three";

export function getSpawnPositionFromCamera(
    camera: THREE.Camera,
    distance: number = 5,
): THREE.Vector3 {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    return new THREE.Vector3()
        .copy(camera.position)
        .add(direction.multiplyScalar(distance));
}