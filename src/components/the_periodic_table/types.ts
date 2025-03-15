import { ReactNode } from "react"
import { ColorType } from "./data/colorType.ts"

export type ElementCategory =
  | "nonmetal"
  | "noble-gas"
  | "alkali-metal"
  | "alkaline-earth"
  | "metalloid"
  | "post-transition-metal"
  | "transition-metal"
  | "halogen"
  | "lanthanide"
  | "actinide"
  | "unknown"
  | "placeholder"

export type ReactionType = "electrolysis" | "combustion" | "heating" | "photosynthesis" | "oxidation" | "spark"

export type Element = {
  emoji: string
  commonUse: ReactNode
  funFact: ReactNode
  boilingPoint: number
  meltingPoint: number
  symbol: string
  name: string
  atomicNumber: number
  category: ElementCategory
  color: string
  description?: string
  compounds?: Compound[]
  reactions?: Reaction[]
}

export type Compound = {
  formula: string
  name: string
  elements: string[]
  description: string
}

export type Reaction = {
  reactants: string[]
  products: string[]
  type: ReactionType
  description: string
  note: string
}

export type PeriodicTableDataType = {
  symbol: string
  name: string
  atomicNumber: number
  category: ElementCategory
  group: number
  color: ColorType
}
