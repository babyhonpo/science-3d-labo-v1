import React from "react";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";


export const DraggableBox: React.FC<DraggableProps> = (props) => {
    return (
      <DraggableBase {...props}>
        <mesh ref={props.refData.mesh}>
          <boxGeometry />
          <meshStandardMaterial color="blue" transparent opacity={0.8} />
        </mesh>
      </DraggableBase>
    );
};

export default DraggableBox;
