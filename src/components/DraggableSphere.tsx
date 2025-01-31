import React from "react";
// import * as THREE from "three";
import DraggableBase from "./DraggableBase";
import { DraggableObject } from "../types/types";

type Props = {
  refData: DraggableObject;
  position: [number, number, number];
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: () => void;
  objectsRef: Map<number, DraggableObject>;
};

const DraggableSphere: React.FC<Props> = (props) => {
  return (
      <DraggableBase {...props}>
          <mesh ref={props.refData.mesh}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="red" />
          </mesh>
      </DraggableBase>
  );
};

export default DraggableSphere;