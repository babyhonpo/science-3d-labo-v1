import { useSceneLogic } from "../hooks/useSceneLogic";
import { SceneCanvas } from "../components/SceneCanvas";
import React, { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import PeriodicTable from "../components/PeriodicTable";
import { ObjectType } from "../types/types";


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
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          position: "absolute",
          top: "90%",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            fontSize: "1.4rem",
          }}
        >
          周期表を開く
        </Button>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
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

