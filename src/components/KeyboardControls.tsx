import React from "react"

interface KeyRowProps {
  keyLabel: string
  description: string
  isSpace?: boolean
}

const KeyRow: React.FC<KeyRowProps> = ({ keyLabel, description, isSpace = false }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isSpace ? "64px" : "24px",
          height: "24px",
          backgroundColor: "white",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          border: "1px solid #e5e7eb",
        }}
      >
        <span
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {keyLabel}
        </span>
      </div>
      <span
        style={{
          color: "white",
          fontSize: "10px",
        }}
      >
        : {description}
      </span>
    </div>
  )
}

export default function KeyboardControls() {
  return (
    <div
      style={{
        position: "fixed",
        top: "55px",
        left: "0",
        padding: "24px",
        borderRadius: "8px",
        zIndex: 1000,
        maxWidth: "350px",
      }}
    >
      <KeyRow keyLabel="W" description="前へ移動" />
      <KeyRow keyLabel="S" description="後ろへ移動" />
      <KeyRow keyLabel="A" description="左側へ移動" />
      <KeyRow keyLabel="D" description="右側へ移動" />
      <KeyRow keyLabel="Space" description="移動の開始 / 停止" isSpace={true} />
    </div>
  )
}
