import type { Reaction } from "../types"

export const reactions: Reaction[] = [
  {
    reactants: ["H2とO"],
    products: ["H2O", "電気"],
    type: "electrolysis",
    description: "水の電気分解",
    note: "水を水素と酸素に分解",
  },
  {
    reactants: ["CO2"],
    products: ["C", "O", "O"],
    type: "carbon-dioxide",
    description: "二酸化炭素",
    note: "植物は光合成によってCO2（二酸化炭素）を吸収し、酸素とグルコースに変換します。",
  },
  {
    reactants: ["Cu", "Cl", "Cl"],
    products: ["CuCl2"],
    type: "electrolysis",
    description: "電気分解",
    note: "さびの形成過程",
  },
  // {
  //   reactants: ["CO2", "H2O"],
  //   products: ["C6H12O6", "O2"],
  //   type: "photosynthesis",
  //   description: "光合成反応",
  //   note: "植物による糖の生成",
  // },
  // {
  //   reactants: ["NH3"],
  //   products: ["N2", "H2"],
  //   type: "oxidation",
  //   description: "アンモニアの熱分解",
  //   note: "窒素と水素に分解",
  // },
  // {
  //   reactants: ["H2", "O2"],
  //   products: ["H2O"],
  //   type: "spark",
  //   description: "水素の爆発的燃焼",
  //   note: "激しい発熱反応",
  // },
]

