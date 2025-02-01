import { useState } from "react";
import { ObjectType } from "../types/types";
export const useObjInfo = () => {
  const [objInfo, setObjInfo] = useState<ObjectType>();
  return { objInfo, setObjInfo };
};
