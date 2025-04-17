import React, { useState,useRef } from "react";
import {PeriodicTable} from "../components/the_periodic_table/periodic-table";
import { Box, Modal } from "@mui/material";
import { useSceneLogic } from "../hooks/useSceneLogic";
import { SceneCanvas } from "../components/SceneCanvas";
import { ObjectType } from "../types/types";
import Orb  from "../components/Orb";

export default function Home(){
  const {
    objectRefs,
    selectedItems,
    isModalOpen,
    handleOpen,
    handleClose,
    handleAddItem,
    handleCollision,
    setIsDragging,
  } = useSceneLogic();


  const [addItemFront, setAddItemFront] = useState<
    ((type: ObjectType ) => void) | null
  >(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCloseModal =() => {
    handleClose();
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.blur(); // ボタンのフォーカスを外す
      }
    }, 0);
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
        onAddItemToFront={( fn ) => setAddItemFront(() => fn)}
      />
      <Box
        ref={buttonRef}
        // variant="contained"
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
          <PeriodicTable
            onAddItem={(type) => {
              if (addItemFront) {
                addItemFront(type)
              }
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

