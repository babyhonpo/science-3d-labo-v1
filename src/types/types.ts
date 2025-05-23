import * as THREE from "three";
import { RefObject } from "react";
import { CollisionMode } from "../utils/collisionRules";
import { FC } from "react";

export type ObjectType = {
  symbol: string;
  color: string;
  name?: string;

  component? : FC<{ backgroundColor: string}>;
};

export type SceneCanvasProps = {
  objectRefs: React.MutableRefObject<Map<string, DraggableObject>>;
  selectedItems: string[];
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  handleCollision: (ids: string[]) => void;
  isModalOpen: boolean;
  onAddItem: (type: ObjectType, position: THREE.Vector3) => void;
  mode: CollisionMode;
  cameraRef: RefObject<THREE.PerspectiveCamera>;
};

export type DraggableObject = {
  id: string;
  objInfo: ObjectType;
  mesh: RefObject<THREE.Mesh>;
  position: THREE.Vector3;
  radius: number;
};

export type DraggableProps = {
  refData: DraggableObject;
  position: THREE.Vector3;
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: (ids: string[]) => void;
  objectsRef: Map<string, DraggableObject>;
  objInfo: ObjectType;
};
