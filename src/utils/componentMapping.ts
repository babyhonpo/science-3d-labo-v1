import { DraggableBox } from "../components/DraggableBox";
import { DraggableSphere } from "../components/DraggableSphere";
import { DraggableCylinder } from "../components/DraggableCylinder";
import { ObjectType, DraggableProps } from "../types/types";
// import React from "react";
import { FC } from "react";

// **ObjectType とコンポーネントのマッピング**
export const componentMap: Record<ObjectType, FC<DraggableProps>> = {
  box: DraggableBox,
  sphere: DraggableSphere,
  cylinder: DraggableCylinder,
};

// **ObjectType からコンポーネントを取得**
export const getComponentFromType = (type: ObjectType): FC<DraggableProps> => {
  return componentMap[type];
};
