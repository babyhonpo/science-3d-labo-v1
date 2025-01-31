import * as THREE from "three";
import { RefObject } from "react";

export type ObjectType = "box" | "sphere";

export type DraggableObject = {
    id: number;
    type: ObjectType;
    mesh: RefObject<THREE.Mesh>;
    position: THREE.Vector3;
    radius:number;
}