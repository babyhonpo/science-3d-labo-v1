import type { Reaction } from "../types"

export const reactions: Reaction[] = [
  {
    reactants: ["H2O"],
    products: ["H2", "O2"],
    type: "electrolysis",
    description: "水の電気分解",
    note: "水を水素と酸素に分解",
  },
  {
    reactants: ["CH4", "O2"],
    products: ["CO2", "H2O"],
    type: "combustion",
    description: "メタンの完全燃焼",
    note: "天然ガスの燃焼反応",
  },
  {
    reactants: ["Fe", "O2"],
    products: ["Fe2O3"],
    type: "heating",
    description: "鉄の酸化",
    note: "さびの形成過程",
  },
  {
    reactants: ["CO2", "H2O"],
    products: ["C6H12O6", "O2"],
    type: "photosynthesis",
    description: "光合成反応",
    note: "植物による糖の生成",
  },
  {
    reactants: ["NH3"],
    products: ["N2", "H2"],
    type: "oxidation",
    description: "アンモニアの熱分解",
    note: "窒素と水素に分解",
  },
  {
    reactants: ["H2", "O2"],
    products: ["H2O"],
    type: "spark",
    description: "水素の爆発的燃焼",
    note: "激しい発熱反応",
  },
]

