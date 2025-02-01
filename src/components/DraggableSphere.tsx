import React from "react";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";

export const DraggableSphere: React.FC<DraggableProps> = (props) => {
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