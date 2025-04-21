"use client"

import React, { useEffect } from "react"

import { useState } from "react"
import { Box, Typography, Dialog, DialogContent } from "@mui/material"
import { Droplet } from "lucide-react"
import { LightningEffect } from "./LightningEffect"
import { Vector3, Mesh } from "three"
import { DraggableObject } from "../types/types"

interface LightningEffectProps {
  onClick?: () => void
  backgroundColor?: string
}

export const LightningElementCard: React.FC<LightningEffectProps> = ({ backgroundColor = "rgb(255, 208, 0)" }) => {
  const [showLightningModal, setShowLightningModal] = useState(false)

  useEffect(() => {
    const sound = new Audio("/public/lightning.mp3") 
    sound.volume = 0.5
    sound.loop = true // 永続的に再生
    sound.play().catch((error) => console.error("音声再生エラー:", error))
  
    return () => {
      sound.pause() // コンポーネントがアンマウントされたときに停止
      sound.currentTime = 0 // 毎回最初から再生
    }
  }, []);

  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowLightningModal(true)
  }

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          backgroundColor,
          borderRadius: 1,
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 0px 15px rgb(255, 208, 0)",
          },
        }}
      >
        <Typography variant="h4" component="div" color="white" fontWeight="bold">
          Lig
        </Typography>
        <Typography variant="caption" color="white">
          Lightning
        </Typography>
        <Droplet color="white" size={20} style={{ marginTop: "5px" }} />
      </Box>

      <Dialog
        open={showLightningModal}
        onClose={() => setShowLightningModal(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              width: "800px",
              height: "600px",
              background: "#111827",
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0, height: "100%" }}>
          <LightningEffect position={new Vector3} refData={{
                      id: "",
                      objInfo: {
                          symbol: "",
                          color: "",
                          name: undefined
                      },
                      mesh: React.createRef<Mesh>(),
                      position: new Vector3,
                      radius: 0
                  }} onDragStateChange={function (): void {
                      throw new Error("Function not implemented.")
                  } } onCollide={function (): void {
                      throw new Error("Function not implemented.")
                  } } objectsRef={new Map<string, DraggableObject>()} />
        </DialogContent>
      </Dialog>
    </>
  )
}
