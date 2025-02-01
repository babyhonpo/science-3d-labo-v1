import React from "react";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";

export const DraggablePyramid: React.FC<DraggableProps> = (props) => {
    return (
      <DraggableBase {...props}>
        <mesh ref={props.refData.mesh}>
          <coneGeometry args={[0.7, 1, 4]} />
          <meshStandardMaterial color="yellow" transparent opacity={0.8} />
        </mesh>
      </DraggableBase>
    );
};

export default DraggablePyramid;
