import React from "react";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";


export const DraggableCylinder: React.FC<DraggableProps> = (props) => {
  return (
    <DraggableBase {...props} position={[props.refData.position.x, props.refData.position.y, props.refData.position.z]}>
          <mesh ref={props.refData.mesh}>
              <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
              <meshStandardMaterial color="green" />
          </mesh>
      </DraggableBase>
  );
};

export default DraggableCylinder;
