import React, { useEffect, useState, useRef, useCallback } from "react";
import { PeriodicTable } from "../components/the_periodic_table/PeriodicTable";
import { Box, Modal } from "@mui/material";
import { useSceneLogic } from "../hooks/useSceneLogic";
import { SceneCanvas } from "../components/SceneCanvas";
import { ObjectType } from "../types/types";
import Orb from "../components/Orb";
import CosmicToggle from "../components/Cosmic-toggle";
import * as THREE from "three";
import { getSpawnPositionFromCamera } from "../utils/getSpawnPositionFromCamera";
import { Toaster } from 'react-hot-toast'
import KeyboardControls from "../components/KeyboardControls";


export default function Home() {
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

  const handleCloseModal = () => {
    handleClose();
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.blur(); // ボタンのフォーカスを外す
      }
    }, 0);
  };

  // カメラ前方にオブジェクトを召喚するロジック
  const handleAddInFront = useCallback((type: ObjectType) => {
    if (!cameraRef.current) {
      console.warn("cameraRef is not ready");
      return;
    }
    const pos = getSpawnPositionFromCamera(cameraRef.current);
    handleAddItem(type, pos);
  }, [cameraRef, handleAddItem]);

  return (
    // 画面いっぱいにCanvasが表示されるようdivでラップしている
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <KeyboardControls />
      </div>
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
            width: "100%",
            height: "180px",
            position: "relative",
          }}
        >
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
              }}
            >
              元素を召喚
            </p>
          </div>
        </div>
      </Box>

      {/* 元のボタンをCosmicToggleコンポーネントに置き換え */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <CosmicToggle mode={mode} setMode={setMode} />
      </div>

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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}