import * as THREE from "three";
import { RefObject } from "react";
import { CollisionMode } from "../utils/collisionRules";

export type ObjectType = {
  symbol: string;
  color: string;
  name?: string;
};

/**
 * SceneCanvas コンポーネントで使用する props の型定義
 */
export type SceneCanvasProps = {
  objectRefs: React.MutableRefObject<Map<string, DraggableObject>>;
  selectedItems: string[];
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  handleCollision: (ids: string[]) => void;
  isModalOpen: boolean;
  onAddItem: (type: ObjectType, position: THREE.Vector3) => void;
  onAddItemToFront: (fn: (type: ObjectType) => void) => void;
  mode: CollisionMode;
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
