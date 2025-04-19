import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Lucideアイコンがない場合は、代替のアイコンを使用するか、インストールしてください
// npm install lucide-react
import { Atom, FlaskRound as Flask, X, Star } from 'lucide-react';

// propsの型定義
interface CosmicToggleProps {
  mode: "creation" | "reaction";
  setMode: React.Dispatch<React.SetStateAction<"creation" | "reaction">>;
}

// スタイル定義
const styles = {
  container: {
    position: "relative" as const,
  },
  toggleContainer: {
    display: "flex" as const,
    alignItems: "center" as const,
    backgroundColor: "rgba(10, 11, 26, 0.8)",
    backdropFilter: "blur(4px)",
    borderRadius: "4px",
    overflow: "hidden" as const,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  button: {
    outline: "none",
    display: "flex" as const,
    alignItems: "center" as const,
    position: "relative" as const,
    overflow: "hidden" as const,
    cursor: "pointer" as const,
    border: "none",
    background: "none",
    padding: 0,
  },
  iconContainer: {
    width: "40px",
    height: "40px",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  textContainer: {
    padding: "4px 8px",
    fontSize: "12px",
    display: "flex" as const,
    alignItems: "center" as const,
    gap: "4px",
  },
  modeButton: {
    outline: "1px solid rgba(51, , 255, 0.3)",
    padding: "4px 12px",
    fontSize: "12px",
    borderRadius: "2px",
    display: "flex" as const,
    alignItems: "center" as const,
    gap: "4px",
    position: "relative" as const,
    overflow: "hidden" as const,
    border: "none",
    cursor: "pointer",
  },
  closeButton: {
    width: "24px",
    height: "24px",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: "2px",
    border: "none",
    cursor: "pointer",
  },
  star: {
    position: "absolute" as const,
    top: "-4px",
    right: "-4px",
  },
};

export default function CosmicToggle({ mode, setMode }: CosmicToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  // 外部クリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const toggleMode = (newMode: "creation" | "reaction") => {
    setMode(newMode);
  };

  // モードに基づく色の設定
  const getColors = () => {
    return {
      primary: mode === "reaction" ? "#4466ff" : "#ff6644",
      text: mode === "reaction" ? "#aabbff" : "#ffbbaa",
      bg: mode === "reaction" ? "rgba(68, 102, 255, 0.2)" : "rgba(255, 102, 68, 0.2)",
      border: mode === "reaction" ? "rgba(68, 102, 255, 0.5)" : "rgba(255, 102, 68, 0.5)",
    };
  };

  const colors = getColors();

  return (
    <div ref={toggleRef} style={styles.container}>
      <motion.div
        style={{
          ...styles.toggleContainer,
          border: `1px solid ${colors.border}`,
        }}
        animate={{
          boxShadow: isExpanded
            ? [
                `0 0 10px 1px ${colors.primary}30`,
                `0 0 15px 2px ${colors.primary}20`,
              ]
            : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          style={styles.button}
          onClick={() => !isExpanded && setIsExpanded(true)}
          whileHover={{ scale: isExpanded ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* アイコン部分 */}
          <div style={styles.iconContainer}>
            {/* グロー効果のある背景 */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
              }}
              animate={{
                background: [
                  `radial-gradient(circle at 50% 50%, ${colors.primary}22 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 50%, ${colors.primary}44 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 50%, ${colors.primary}22 0%, transparent 70%)`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* アイコン */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {mode === "reaction" ? (
                <Atom size={20} color={colors.primary} />
              ) : (
                <Flask size={20} color={colors.primary} />
              )}
            </motion.div>

            {/* 下部の光るライン */}
            <motion.div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: colors.primary,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* 現在のモードテキスト */}
          <div
            style={{
              ...styles.textContainer,
              color: colors.primary,
            }}
          >
            <span>現在モード: {mode === "reaction" ? "元素反応" : "物質作成"}</span>
          </div>
        </motion.button>

        {/* 展開時のみ表示される部分 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                flexShrink: 1,
              }}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0 8px",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => toggleMode("reaction")}
                  style={{
                    ...styles.modeButton,
                    backgroundColor: mode === "reaction" ? colors.bg : "rgba(10, 11, 26, 1)",
                    color: mode === "reaction" ? "white" : colors.text,
                    border: `none`,
                  }}
                >
                  {mode === "reaction" && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: 0,
                      }}
                      animate={{
                        background: [
                          "radial-gradient(circle at 50% 50%, #4466ff22 0%, transparent 70%)",
                          "radial-gradient(circle at 50% 50%, #4466ff44 0%, transparent 70%)",
                          "radial-gradient(circle at 50% 50%, #4466ff22 0%, transparent 70%)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Atom size={12} />
                    <span>元素反応</span>
                  </div>
                </button>
                <button
                  onClick={() => toggleMode("creation")}
                  style={{
                    ...styles.modeButton,
                    backgroundColor: mode === "creation" ? colors.bg : "rgba(10, 11, 26, 1)",
                    color: mode === "creation" ? "white" : colors.text,
                    border: `1px solid ${mode === "creation" ? colors.border : "rgba(51, 68, 102, 0.3)"}`,
                  }}
                >
                  {mode === "creation" && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: 0,
                      }}
                      animate={{
                        background: [
                          "radial-gradient(circle at 50% 50%, #ff664422 0%, transparent 70%)",
                          "radial-gradient(circle at 50% 50%, #ff664444 0%, transparent 70%)",
                          "radial-gradient(circle at 50% 50%, #ff664422 0%, transparent 70%)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Flask size={12} />
                    <span>物質作成</span>
                  </div>
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  style={{
                    ...styles.closeButton,
                    padding: "0",
                    backgroundColor: "rgba(10, 11, 26, 1)",
                    color: "primary",
                    border: "1px solid rgba(51, 68, 102, 0.3)",
                  }}
                >
                  <X size={20} color={colors.primary} fill={colors.primary} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 小さな星のアクセント */}
      <motion.div
        style={styles.star}
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star size={12} color={colors.primary} fill={colors.primary} />
      </motion.div>
    </div>
  );
}