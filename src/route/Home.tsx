import React from "react";
// import { OrbitControls } from "@react-three/drei";
import {PeriodicTable} from "../components/the_periodic_table/periodic-table";
import Button from "@mui/material/Button";
import { Box, Modal } from "@mui/material";
import { useSceneLogic } from "../hooks/useSceneLogic";
import { SceneCanvas } from "../components/SceneCanvas";

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

  return (
    // 画面いっぱいにCanvasが表示されるようdivでラップしている
    <div style={{ width: "100vw", height: "100vh" }}>
      <SceneCanvas
        objectRefs={objectRefs}
        selectedItems={selectedItems}
        setIsDragging={setIsDragging}
        handleCollision={handleCollision}
        isModalOpen={isModalOpen}
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
          <PeriodicTable onAddItem={handleAddItem} />
        </Box>
      </Modal>
    </div>
  );
};

// export default Home;
