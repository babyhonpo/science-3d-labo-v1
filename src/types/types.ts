import * as THREE from "three";
import { RefObject } from "react";

export type ObjectType = "box" | "sphere" | "cylinder";

export type DraggableObject = {
    id: number;
    type: ObjectType;
    mesh: RefObject<THREE.Mesh>;
    position: THREE.Vector3;
    radius: number;
};

export type DraggableProps = {
    refData: DraggableObject;
    onDragStateChange: (isDragging: boolean) => void;
    onCollide: (idA: number, idB: number) => void; // ✅ handleCollision に統一
    objectsRef: Map<number, DraggableObject>;
};
