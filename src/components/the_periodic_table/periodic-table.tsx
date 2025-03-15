import React from "react"
import { useState } from "react"
import { elements } from "./data/elements"
import type { Element, ReactionType } from "./types"
import { ElementCard } from "./parts/element-card"
import { getCategoryName } from "./utils/element-helpers"
import CloseIcon from "@mui/icons-material/Close"

// === MUI Components ===
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Tab,
  Paper,
  Tabs,
} from "@mui/material"

import { Science, ElectricBolt, Favorite, BubbleChart } from "@mui/icons-material"

// TabPanel component for MUI
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`element-tabpanel-${index}`}
      aria-labelledby={`element-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `element-tab-${index}`,
    "aria-controls": `element-tabpanel-${index}`,
  }
}

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [reactionFilter, setReactionFilter] = useState<ReactionType | "all">("all")
  const [tabValue, setTabValue] = useState(0)

  const handleElementClick = (element: Element) => {
    setSelectedElement(element)
    setTabValue(0) // Reset to first tab when selecting a new element
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const filteredElements = elements.filter(
    (element) => reactionFilter === "all" || element.reactions?.some((reaction) => reaction.type === reactionFilter),
  )

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to bottom right, #1f2937, #374151)",
        overflow: "auto",
      }}
    >
      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight="bold" color="#fff">
          <Science sx={{ mr: 1, animation: "spin 4s linear infinite" }} />
          元素の魔法世界
        </Typography>
        <Typography variant="subtitle1" color="#fff">
          クリックして元素の秘密を解き明かそう！
        </Typography>

        {/* フィルターセレクト */}
        <FormControl
          sx={{ mt: 2, width: "250px", "& .MuiOutlinedInput-root": { "&:hover fieldset": { borderColor: "#fff" } } }}
        >
          <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>
            反応タイプ
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="反応タイプ"
            sx={{ color: "#fff" }}
            value={reactionFilter}
            onChange={(e) => setReactionFilter(e.target.value as ReactionType | "all")}
          >
            {/* <MenuItem value="all">すべての反応</MenuItem> */}
            <MenuItem value="">選択してください</MenuItem>
            <MenuItem value="electrolysis">電気分解</MenuItem>
            <MenuItem value="combustion">燃焼</MenuItem>
            <MenuItem value="heating">加熱</MenuItem>
            <MenuItem value="photosynthesis">光合成</MenuItem>
            <MenuItem value="oxidation">酸化</MenuItem>
            <MenuItem value="spark">火花</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 元素一覧 */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(5, 1fr)", // スマホ
          sm: "repeat(7, 1fr)", // タブレット
          md: "repeat(9, 1fr)", // PC
        }}
        gap={1}
        px={2}
      >
        {filteredElements.map((element) =>
          element.category !== "placeholder" ? (
            <ElementCard
              key={element.symbol}
              backgroundColor={element.color}
              element={element}
              onClick={handleElementClick}
            />
          ) : (
            <Box key={`placeholder-${element.atomicNumber}`} />
          ),
        )}
      </Box>

      {/* 元素詳細ダイアログ */}
      {selectedElement && (
        <Dialog open={!!selectedElement} onClose={() => setSelectedElement(null)} maxWidth="md">
          <DialogActions>
            <CloseIcon onClick={() => setSelectedElement(null)} style={{ cursor: "pointer", paddingTop:0 }} />
          </DialogActions>
          <DialogTitle style={{paddingTop:0}}>
            {selectedElement.name} ({selectedElement.symbol})
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              原子番号: {selectedElement.atomicNumber} | 分類: {getCategoryName(selectedElement.category)}
            </Typography>

            <Box mt={2}>
              <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="基本情報" {...a11yProps(0)} />
                  <Tab label="化合物" {...a11yProps(1)} />
                  <Tab label="反応" {...a11yProps(2)} />
                </Tabs>
              </Paper>

              {/* 基本情報タブ */}
              <TabPanel value={tabValue} index={0}>
                <Box mt={2}>
                  <Typography display="flex" alignItems="center" gap={1} variant="h6">
                    <BubbleChart color="primary" /> 特徴
                  </Typography>
                  <Typography>{selectedElement.description}</Typography>
                </Box>

                <Box mt={2}>
                  <Typography display="flex" alignItems="center" gap={1} variant="h6">
                    <ElectricBolt color="warning" /> おもしろ情報
                  </Typography>
                  <Typography>{selectedElement.funFact}</Typography>
                </Box>

                <Box mt={2}>
                  <Typography display="flex" alignItems="center" gap={1} variant="h6">
                    <Favorite color="error" /> 主な用途
                  </Typography>
                  <Typography>{selectedElement.commonUse}</Typography>
                </Box>
              </TabPanel>

              {/* 化合物タブ */}
              <TabPanel value={tabValue} index={1}>
                {selectedElement.compounds?.map((compound) => (
                  <Box
                    key={compound.formula}
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.05)",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                      <BubbleChart color="success" /> {compound.name}
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          border: "1px solid",
                          borderColor: "text.secondary",
                          borderRadius: 1,
                          px: 1,
                          py: 0.5,
                          fontSize: "0.75rem",
                        }}
                      >
                        {compound.formula}
                      </Box>
                    </Typography>
                    <Typography>{compound.description}</Typography>
                  </Box>
                )) || <Typography>この元素の化合物情報はありません。</Typography>}
              </TabPanel>

              {/* 反応タブ */}
              <TabPanel value={tabValue} index={2}>
                {selectedElement.reactions?.map((reaction, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.05)",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                      <ElectricBolt color="warning" /> {reaction.type}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>{reaction.reactants?.join(" + ")}</Typography>
                      <ElectricBolt fontSize="small" />
                      <Typography>{reaction.products?.join(" + ")}</Typography>
                    </Box>
                    {reaction.note && <Typography mt={1}>{reaction.note}</Typography>}
                  </Box>
                )) || <Typography>この元素の反応情報はありません。</Typography>}
              </TabPanel>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  )
}

