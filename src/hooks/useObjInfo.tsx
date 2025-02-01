import React from "react";

export const useObjInfo = () => {
  const [objInfo, setObjInfo] = React.useState();
  return { objInfo, setObjInfo };
};
