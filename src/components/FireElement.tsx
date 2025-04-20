"use client"

import React from "react"

import { useState } from "react"
import { Box, Typography, Dialog, DialogContent } from "@mui/material"
import { Flame } from "lucide-react"

interface FireElementProps {
  onClick?: () => void
  backgroundColor?: string
}

export const FireElementCard: React.FC<FireElementProps> = ({ backgroundColor = "#FF5722" }) => {
  const [showFireModal, setShowFireModal] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFireModal(true)
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
            boxShadow: "0px 0px 15px rgba(255, 87, 34, 0.6)",
          },
        }}
      >
        <Typography variant="h4" component="div" color="white" fontWeight="bold">
          Fi
        </Typography>
        <Typography variant="caption" color="white">
          Fire
        </Typography>
        <Flame color="white" size={20} style={{ marginTop: "5px" }} />
      </Box>

      <Dialog
        open={showFireModal}
        onClose={() => setShowFireModal(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              width: "800px",
              height: "600px",
              background: "#000",
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0, height: "100%" }}>
          
        </DialogContent>
      </Dialog>
    </>
  )
}
