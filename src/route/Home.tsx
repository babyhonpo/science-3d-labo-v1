import React, { useEffect,useState,useRef } from "react";
import {PeriodicTable} from "../components/the_periodic_table/periodic-table";
import { Box, Modal } from "@mui/material";
import { useSceneLogic } from "../hooks/useSceneLogic";
import { SceneCanvas } from "../components/SceneCanvas";
import * as THREE from "three";
import Orb  from "../components/Orb";
import { ObjectType } from "../types/types";
import { getSpawnPositionFromCamera } from "../utils/getSpawnPositionFromCamera";

export default function Home(){
  const [mode, setMode] = useState<"creation" | "reaction">("reaction");

  useEffect(() => {
    console.log("現在のモード:", mode);
  }, [mode]);

  const {
    objectRefs,
    selectedItems,
    isModalOpen,
    handleOpen,
    handleClose,
    handleAddItem,
    handleCollision,
    setIsDragging,
  } = useSceneLogic(mode);


  const buttonRef = useRef<HTMLButtonElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null); // カメラ参照 → 後にhandleAddItemへ

  const handleCloseModal =() => {
    handleClose();
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.blur(); // ボタンのフォーカスを外す
      }
    }, 0);
  }

  // カメラ前方にオブジェクトを召喚するロジック
  const handleAddInFront = (type: ObjectType) => {
    if (!cameraRef.current) return;
    const pos = getSpawnPositionFromCamera(cameraRef.current);
    handleAddItem(type, pos);
  }

  return (
    // 画面いっぱいにCanvasが表示されるようdivでラップしている
    <div style={{ width: "100vw", height: "100vh" }}>
      <SceneCanvas
        objectRefs={objectRefs}
        selectedItems={selectedItems}
        setIsDragging={setIsDragging}
        handleCollision={handleCollision}
        isModalOpen={isModalOpen}
        onAddItem={handleAddItem}
        mode={mode}
        cameraRef={cameraRef}
      />
      <Box
        ref={buttonRef}
        onClick={handleOpen}
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          width: "fit-content",
          height: "fit-content",
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translate(-50%)",
          cursor: "pointer",
        }}
      >
        <div
        style={{
          width: '100%',
          height: '180px',
          position: 'relative',
        }}>
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              <p
                style={{
                  color: "#718FCD",
                }}>
                元素を召喚
              </p>
            </div>
        </div>
      </Box>

      <button
        style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        onClick={() =>
          setMode((prev) => (prev === "creation" ? "reaction" : "creation"))
        }
      >
        現在モード: {mode === "reaction" ? "元素反応" : "物質作成"}
      </button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={"70%"}
          margin={"auto"}
          sx={{
            position: "relative",
            top: "10%",
          }}
        >
          <PeriodicTable onElementSelect={handleAddInFront} />
        </Box>
      </Modal>
    </div>
  );
};

