"use client"

import React, { useEffect } from "react"

import { useState } from "react"
import { Box, Typography, Dialog, DialogContent } from "@mui/material"
import { Droplet } from "lucide-react"
import WaterSphere from "./WaterSphere"

interface WaterElementProps {
  onClick?: () => void
  backgroundColor?: string
}

export const WaterElementCard: React.FC<WaterElementProps> = ({ backgroundColor = "#1E88E5" }) => {
  const [showWaterModal, setShowWaterModal] = useState(false)

  useEffect(() => {
    const sound = new Audio("/water.mp3")
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
    setShowWaterModal(true)
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
            boxShadow: "0px 0px 15px rgba(30, 136, 229, 0.6)",
          },
        }}
      >
        <Typography variant="h4" component="div" color="white" fontWeight="bold">
          Wa
        </Typography>
        <Typography variant="caption" color="white">
          Water
        </Typography>
        <Droplet color="white" size={20} style={{ marginTop: "5px" }} />
      </Box>

      <Dialog
        open={showWaterModal}
        onClose={() => setShowWaterModal(false)}
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
          <WaterSphere />
        </DialogContent>
      </Dialog>
    </>
  )
}
