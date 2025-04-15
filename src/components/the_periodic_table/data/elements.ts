import type { Element, PeriodicTableDataType } from "../types"
import { periodicTableData } from "./periodic-table-data"
import { compounds } from "./compounds"
import { reactions } from "./reactions"

// 元素ごとの追加情報
const elementDetails: Partial<Record<string, Pick<Element, "description" | "compounds" | "reactions" | "funFact" | "commonUse" >>> = {
  H: {
    description: "最も軽い元素で、宇宙で最も豊富に存在する",
    funFact: "水素は宇宙の約75%を占めています。おならの10～20%が水素で、おならを集めて火をつけると燃えます。",
    commonUse: "水素燃料電池や化学工業で使用される",
    compounds: compounds.filter((c) => c.elements.includes("H")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("H")) || 
        r.products.some((product) => product.includes("H")),
    ),
  },
  O: {
    description: "生命に不可欠な元素で、地球の大気の主成分",
    funFact: "酸素は地球の大気の約21%を占めています。太古の地球では酸素は生物にとって猛毒ガスだった！",
    commonUse: "呼吸や燃焼に必要な元素",
    compounds: compounds.filter((c) => c.elements.includes("O")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("O")) || 
        r.products.some((product) => product.includes("O")),
    ),
  },
  Fe: {
    description: "最も一般的な金属元素の一つ",
    funFact: "鉄は室温では α鉄（フェライト）、熱すると γ鉄（オーステナイト）、γ鉄をさらに熱すると δ鉄（デルタフェライト）へと変化します",
    commonUse: "建設や製造業で広く使用される",
    compounds: compounds.filter((c) => c.elements.includes("Fe")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Fe")) || 
        r.products.some((product) => product.includes("Fe")),
    ),
  },
  // 他の元素の詳細情報も同様に追加...
}

// 基本データと詳細情報を結合
export const elements: PeriodicTableDataType[] = periodicTableData.map((element) => {
  const details: Partial<Pick<Element, "description" | "compounds" | "reactions" | "funFact" | "commonUse" >> = elementDetails[element.symbol] ?? {} // undefined を防ぐ
  return {
    ...element,
    description: details.description ?? "",  // description がない場合は空文字
    compounds: details.compounds ?? [],     // undefined の場合は空配列をセット
    reactions: details.reactions ?? [],     // undefined の場合は空配列をセット
    funFact: details.funFact ?? "", // funFact がない場合は空文字
    commonUse: details.commonUse ?? "", // commonUse がない場合は空文字
  }
})
