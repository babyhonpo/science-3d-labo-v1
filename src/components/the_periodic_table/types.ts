import { ReactNode } from "react"

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

export type ReactionType = "electrolysis" | "combustion" | "heating" | "photosynthesis" | "oxidation" | "spark" | "carbon-dioxide"

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

export type PeriodicTableDataType = {
  symbol: string
  name: string
  atomicNumber: number
  category: ElementCategory
  group: number
  color: string
  boilingPoint: number
  meltingPoint: number
  emoji: string
  commonUse: ReactNode
  funFact: ReactNode
  reactions?: Reaction[]
}

export type Reaction = {
  reactants: string[]
  products: string[]
  type: ReactionType
  description: string
  note: string
}

export type Compound = {
  formula: string
  name: string
  elements: string[]
  description: string
}