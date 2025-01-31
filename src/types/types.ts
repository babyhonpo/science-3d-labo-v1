import * as THREE from "three";
import { RefObject } from "react";

export type ObjectType = "box" | "sphere" | "cylinder";

export type DraggableObject = {
    id: string;
    type: ObjectType;
    mesh: RefObject<THREE.Mesh>;
    position: THREE.Vector3;
    radius: number;
};

export type DraggableProps = {
    refData: DraggableObject;
    position: THREE.Vector3;
    onDragStateChange: (isDragging: boolean) => void;
    onCollide: (idA: string, idB: string) => void; // ✅ handleCollision に統一
    objectsRef: Map<string, DraggableObject>;
    cameraRef: React.RefObject<THREE.PerspectiveCamera>;
    children: React.ReactNode;
};
