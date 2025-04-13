import React from "react"
import { useState } from "react"
import { elements } from "./data/elements"
import type { Element, ReactionType } from "./types"
import { ElementCard } from "./parts/element-card"
import { getCategoryName } from "./utils/element-helpers"
import CloseIcon from "@mui/icons-material/Close"

// === MUI Components ===
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, 
  Select, MenuItem, FormControl, InputLabel, Box, Tab, Paper, Tabs
} from "@mui/material"
import { Atom } from "lucide-react"
import { ElectricBolt, Favorite, BubbleChart, Cyclone } from "@mui/icons-material"
import { useObjInfo } from "../../hooks/useObjInfo"
import { ObjectType } from "../../types/types"

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

interface PeriodicTableProps {
  onAddItem: (obj: ObjectType) => void; // onAddItem 関数を props として受け取る
}

  export const PeriodicTable: React.FC<PeriodicTableProps> = ({ onAddItem }) => { 
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [reactionFilter, setReactionFilter] = useState<ReactionType | "all">("all")
  const [tabValue, setTabValue] = useState(0)
  const [selectedValue, setSelectedValue] = useState<ObjectType | null>(null);
  const [open, setOpen] = React.useState(false);
  const { setObjInfo } = useObjInfo();

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

  const handleClick = (obj: ObjectType) => {
    setSelectedValue(obj); // 選択された要素を状態にセット
    onAddItem(obj); // 選択された要素を onAddItem に渡す
    setObjInfo(undefined);
    setOpen(true);
  };

  return (
    <Box
      minHeight="60vh"
      sx={{
        background: "linear-gradient(to bottom right, #1f2937, #374151)",
        overflow: "auto",
      }}
    >
      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight="bold" color="#fff">
          <Atom className="inline-block mr-2 animate-spin-slow" />
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
          md: "repeat(10, 1fr)", // PC
        }}
        gap={1}
        px={2}
        sx={{
          maxHeight: "60vh", // 高さ制限（必要に応じて調整）
          overflowY: "auto", // 縦スクロールを許可
        }}
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
        <Dialog open={!!selectedElement} onClose={() => setSelectedElement(null)} maxWidth="md"
          slotProps={{
            paper: {
              sx: {
                width: "800px", // 固定幅
                height: "600px", // 固定高さ
                background: "linear-gradient(to bottom right, #1f2937, #374151)",
                overflow: "auto",
              },
            },
          }}
        >
          <DialogActions>
            <CloseIcon onClick={() => setSelectedElement(null)} style={{ cursor: "pointer", paddingTop:0 }} />
          </DialogActions>
          <DialogTitle style={{paddingTop:0, color:"#fff"}}>
            {selectedElement.name} ({selectedElement.symbol})
            <Typography variant="body1">
              原子番号: {selectedElement.atomicNumber} | 分類: {getCategoryName(selectedElement.category)}
            </Typography>
            <button style={{ display:"flex", alignItems:"center", marginTop:"10px", marginBottom:"10px" }} onClick={() => handleClick({
              symbol: selectedElement.symbol,
              name: selectedElement.name, 
              color: selectedElement.color,
            })}>
              <Cyclone sx={{ color: '#ba03fc' }} /> 元素を召喚
            </button>

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
          </DialogTitle>
          <DialogContent style={{ color: "#fff" }}>

            <Box mt={2}>

              {/* 基本情報タブ */}
              <TabPanel value={tabValue} index={0} >
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

