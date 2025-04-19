"use client"

import React from "react"
import { Box, Typography } from "@mui/material"
import { Flame } from "lucide-react"

interface FireElementProps {
  onClick: () => void
  backgroundColor?: string
}

export const FireElementCard: React.FC<FireElementProps> = ({ onClick,backgroundColor = "#FF5722" }) => {
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
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
  )
}
