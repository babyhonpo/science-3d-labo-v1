import React from "react";
// import * as THREE from "three";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";

export const DraggableSphere: React.FC<DraggableProps> = (props) => {
  return (
      <DraggableBase {...props} position={[props.refData.position.x, props.refData.position.y, props.refData.position.z]}>
          <mesh ref={props.refData.mesh}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="red" />
          </mesh>
      </DraggableBase>
  );
};

export default DraggableSphere;