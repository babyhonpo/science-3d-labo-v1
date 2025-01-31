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

const DraggableBox: React.FC<Props> = (props) => {
    return (
      <DraggableBase {...props}>
        <mesh ref={props.refData.mesh}>
            <boxGeometry args={[1, 1, 1]} />
            {/* <meshStandardMaterial color="blue" /> */}
            <meshStandardMaterial color="blue" transparent opacity={0.8} />
        </mesh>
      </DraggableBase>
    );
};

export default DraggableBox;
