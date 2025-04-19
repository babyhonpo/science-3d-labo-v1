import type { Element, PeriodicTableDataType } from "../types"
import { compounds } from "./compounds"
import { reactions } from "./reactions"
import { periodicTableData } from "./periodic-table-data" 

// 元素ごとの追加情報
const elementDetails: Partial<Record<string, Pick<Element, "description" | "compounds" | "reactions" | "funFact" | "commonUse" >>> = {
  H: {
    description: "最も軽い元素で、宇宙で最も豊富に存在する",
    funFact: "おならの10〜20%が水素で、火を近づけると燃えるって知ってた？（やらないでね）",
    commonUse: "水素燃料電池（エコカー）やアンモニア製造、気球のガスにも使われる",
    compounds: compounds.filter((c) => c.elements.includes("H")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("H")) || 
        r.products.some((product) => product.includes("H")),
    ),
  },
  He: {
    description: "非常に軽く、反応しにくい希ガス元素",
    funFact: "ヘリウムを吸うと声が高くなるのは、空気より音速が速いから！",
    commonUse: "パーティー用の風船や、MRI装置の冷却材に使われてる",
    compounds: compounds.filter((c) => c.elements.includes("He")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("He")) || 
        r.products.some((product) => product.includes("He")),
    ),
  },
  Li: {
    description: "最も軽い金属で、電池の材料として注目される元素",
    funFact: "スマホやノートPCに入ってる「リチウムイオン電池」はこの元素のおかげ！",
    commonUse: "充電式バッテリーや、軽量合金、自転車・EVにも使われる",
    compounds: compounds.filter((c) => c.elements.includes("Li")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Li")) || 
        r.products.some((product) => product.includes("Li")),
    ),
  },
  Be: {
    description: "軽くて強く、毒性のある金属元素",
    funFact: "X線をよく通すから、病院のX線検査機の窓に使われてるよ！",
    commonUse: "航空機部品、X線装置、ミサイルや高性能電子部品など",
    compounds: compounds.filter((c) => c.elements.includes("Be")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Be")) || 
        r.products.some((product) => product.includes("Be")),
    ),
  },
  B: {
    description: "硬くて壊れやすい半金属、熱にも強い",
    funFact: "ホウ砂として洗濯や掃除に使われてるし、防虫剤としても登場！",
    commonUse: "ガラス（ホウケイ酸ガラス＝耐熱ガラス）、洗剤、防炎素材に使われる",
    compounds: compounds.filter((c) => c.elements.includes("B")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("B")) || 
        r.products.some((product) => product.includes("B")),
    ),
  },
  C: {
    description: "全ての生物の基本構造を作る元素",
    funFact: "ダイヤモンドも鉛筆の芯（グラファイト）も、どっちも炭素の形違い！",
    commonUse: "食品、プラスチック、化粧品、化学繊維、電池などめちゃ広い",
    compounds: compounds.filter((c) => c.elements.includes("C")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("C")) || 
        r.products.some((product) => product.includes("C")),
    ),
  },
  N: {
    description: "地球の空気の大部分を占める元素（約78%）",
    funFact: "ポテチの袋がパンパンなのは窒素ガスで守られてるから！",
    commonUse: "肥料、冷却用の液体窒素、食料パッケージングに使われる",
    compounds: compounds.filter((c) => c.elements.includes("N")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("N")) || 
        r.products.some((product) => product.includes("N")),
    ),
  },
  O: {
    description: "呼吸や燃焼に不可欠な、超重要元素",
    funFact: "酸素は猛毒だった！？昔の微生物は酸素で大量死した“酸素大災害”があった！",
    commonUse: "呼吸（当然！）、溶接、酸素ボンベ、病院の医療用酸素など",
    compounds: compounds.filter((c) => c.elements.includes("O")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("O")) || 
        r.products.some((product) => product.includes("O")),
    ),
  },
  F: {
    description: "最も反応性の高い元素で、猛毒でもある",
    funFact: "歯磨き粉の“フッ素配合”は虫歯予防に超重要（でもフッ素単体は危険！）",
    commonUse: "歯磨き粉、テフロン加工（フライパン！）、冷媒などに使われる",
    compounds: compounds.filter((c) => c.elements.includes("F")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("F")) || 
        r.products.some((product) => product.includes("F")),
    ),
  },
  Ne: {
    description: "化学反応しにくく、安定な希ガス元素",
    funFact: "「ネオン管」は赤い光を出すけど、実は色ごとにガスが違うんだよ！",
    commonUse: "ネオンサイン（看板！）、レーザー、冷却材などに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Ne")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ne")) || 
        r.products.some((product) => product.includes("Ne")),
    ),
  },
  Na: {
    description: "反応性が高い金属で、単体では水と激しく反応する",
    funFact: "塩＝塩化ナトリウム（NaCl）！ナトリウムがなきゃ味気ないご飯に…",
    commonUse: "食塩、洗剤、医薬品、融雪剤に使われている",
    compounds: compounds.filter((c) => c.elements.includes("Na")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Na")) || 
        r.products.some((product) => product.includes("Na")),
    ),
  },
  Mg: {
    description: "軽くて強い金属、人体にも必要不可欠",
    funFact: "サプリや栄養ドリンクに“マグネシウム”って書いてあるの見たことない？",
    commonUse: "自転車のフレーム、花火（白い光）、胃薬、サプリメントに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Mg")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Mg")) || 
        r.products.some((product) => product.includes("Mg")),
    ),
  },
  Al: {
    description: "軽くてサビにくい金属で、身近な製品に大活躍",
    funFact: "アルミホイルもアルミ缶も、ぜ〜んぶこのアルミニウム！",
    commonUse: "飲料缶、窓枠、自転車、スマホのボディなどに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Al")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Al")) || 
        r.products.some((product) => product.includes("Al")),
    ),
  },
  Si: {
    description: "半導体の主役で、現代社会を支える元素",
    funFact: "ガラスや半導体、シリカゲル、珪藻土など、身の回りに身近な様々な素材に含まれています！",
    commonUse: "ガラス、コンピュータのCPU、建材、化粧品など",
    compounds: compounds.filter((c) => c.elements.includes("Si")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Si")) || 
        r.products.some((product) => product.includes("Si")),
    ),
  },
  P: {
    description: "DNAや骨に含まれる重要元素",
    funFact: "マッチの先端にリンが使われてるんだよ〜（昔はめっちゃ危険だった）",
    commonUse: "肥料、洗剤、マッチ、加工食品（リン酸塩）など",
    compounds: compounds.filter((c) => c.elements.includes("P")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("P")) || 
        r.products.some((product) => product.includes("P")),
    ),
  },
  S: {
    description: "独特なにおいを持つ元素。温泉の香りの正体！",
    funFact: "温泉の“卵が腐ったようなにおい”＝硫黄（H₂S）なんだよね",
    commonUse: "火薬、肥料、温泉、タイヤの原料などに使われる",
    compounds: compounds.filter((c) => c.elements.includes("S")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("S")) || 
        r.products.some((product) => product.includes("S")),
    ),
  },
  Cl: {
    description: "毒にも薬にもなるハロゲン元素",
    funFact: "プールのにおいは塩素系消毒剤！だけど本当のにおいは汗との反応物質😅",
    commonUse: "水道水の消毒、塩化ビニル（PVC）、漂白剤に使われる",
    compounds: compounds.filter((c) => c.elements.includes("Cl")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cl")) || 
        r.products.some((product) => product.includes("Cl")),
    ),
  },
  Ar: {
    description: "化学的にほとんど反応しない希ガス元素",
    funFact: "電球の中に入ってるガスはアルゴン！酸化を防いでくれるんだって",
    commonUse: "電球、溶接、レーザー、パッケージングのガスに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Ar")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ar")) || 
        r.products.some((product) => product.includes("Ar")),
    ),
  },
  K: {
    description: "体にとって必要不可欠なミネラルの一つ",
    funFact: "バナナ＝カリウムたっぷり！筋肉の収縮や心臓の働きを支えてくれる",
    commonUse: "肥料、バナナなどの食品、心臓治療薬にも",
    compounds: compounds.filter((c) => c.elements.includes("K")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("K")) || 
        r.products.some((product) => product.includes("K")),
    ),
  },
  Ca: {
    description: "骨や歯の主成分で、体の構造を支える元素",
    funFact: "「カルシウム＝牛乳」は超有名だけど、実は小魚の方が多かったりも！",
    commonUse: "牛乳やヨーグルト、小魚、肥料、チョークに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Ca")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ca")) || 
        r.products.some((product) => product.includes("Ca")),
    ),
  },
  Sc: {
    description: "レアメタルの一つで、軽くて強い合金材料",
    funFact: "スカンジウムは自転車や野球バットの高級素材にも使われてる！",
    commonUse: "高性能合金、航空機、スポーツ用品に使用される",
    compounds: compounds.filter((c) => c.elements.includes("Sc")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Sc")) || 
        r.products.some((product) => product.includes("Sc")),
    ),
  },
  Ti: {
    description: "軽くてサビにくい、体にもやさしい金属",
    funFact: "チタン製のメガネや腕時計、アクセサリーは軽くてアレルギーも少ない！",
    commonUse: "メガネ、ゴルフクラブ、航空機、人工関節、歯のインプラントなど",
    compounds: compounds.filter((c) => c.elements.includes("Ti")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ti")) || 
        r.products.some((product) => product.includes("Ti")),
    ),
  },
  V: {
    description: "強度の高い合金に使われる金属元素",
    funFact: "バナジウム入りの包丁は切れ味抜群で長持ちするんだよ！",
    commonUse: "工具鋼、バナジウム鋼の包丁、航空機エンジンなど",
    compounds: compounds.filter((c) => c.elements.includes("V")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("V")) || 
        r.products.some((product) => product.includes("V")),
    ),
  },
  Cr: {
    description: "サビに強く、光沢があり、美しい金属",
    funFact: "ピカピカの水道の蛇口や車のバンパー＝クロムメッキ！",
    commonUse: "ステンレス鋼、メッキ、自動車部品、皮なめしに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Cr")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cr")) || 
        r.products.some((product) => product.includes("Cr")),
    ),
  },
  Mn: {
    description: "鉄の補強に使われる重要な金属",
    funFact: "マンガン乾電池って聞いたことある？名前の由来はこの元素！",
    commonUse: "乾電池（マンガン電池）、鉄鋼、ガラスの着色に使われる",
    compounds: compounds.filter((c) => c.elements.includes("Mn")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Mn")) || 
        r.products.some((product) => product.includes("Mn")),
    ),
  },
  Fe: {
    description: "最も身近で多用途な金属。建物も家電もこれでできてる！",
    funFact: "鉄分不足＝貧血の元！レバーやほうれん草で摂れるよ！",
    commonUse: "自転車、フライパン、マンホール、鉄筋コンクリートなど",
    compounds: compounds.filter((c) => c.elements.includes("Fe")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Fe")) || 
        r.products.some((product) => product.includes("Fe")),
    ),
  },
  Co: {
    description: "強力な磁石の材料になる金属元素",
    funFact: "「ネオジム磁石」にコバルトも入ってて、イヤホンやPCファンにも活躍中！",
    commonUse: "リチウムイオン電池、磁石、塗料、青いガラスなどに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Co")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Co")) || 
        r.products.some((product) => product.includes("Co")),
    ),
  },
  Ni: {
    description: "銀白色でサビに強い、電池やコインに使われる金属",
    funFact: "日本の100円玉にはニッケルが含まれてる！",
    commonUse: "電池（ニッケル水素電池）、硬貨、メッキ、自動車部品など",
    compounds: compounds.filter((c) => c.elements.includes("Ni")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ni")) || 
        r.products.some((product) => product.includes("Ni")),
    ),
  },
  Cu: {
    description: "電気をよく通し、古代から使われている金属",
    funFact: "電線の中身やエアコンのパイプ、実は銅だらけ！",
    commonUse: "電線、水道管、銅鍋、硬貨（10円玉）などに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Cu")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cu")) || 
        r.products.some((product) => product.includes("Cu")),
    ),
  },
  Zn: {
    description: "人体に必要なミネラルで、サビ止めにも使われる",
    funFact: "風邪薬に“亜鉛”って書いてあるの見たことない？それこの元素！",
    commonUse: "トタン屋根、サプリメント、電池（亜鉛電池）に使われる",
    compounds: compounds.filter((c) => c.elements.includes("Zn")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Zn")) || 
        r.products.some((product) => product.includes("Zn")),
    ),
  },
  Ga: {
    description: "体温で溶ける不思議な金属",
    funFact: "手に乗せると溶けちゃう！？インテルの半導体にも登場する重要金属！",
    commonUse: "半導体（GaAs）、LED、医療用放射線検出器などに使われる",
    compounds: compounds.filter((c) => c.elements.includes("Ga")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ga")) || 
        r.products.some((product) => product.includes("Ga")),
    ),
  },
  Ge: {
    description: "半導体材料として注目された金属",
    funFact: "昔のラジオ（ゲルマラジオ）に使われてた！今も光ファイバーなどに活躍中！",
    commonUse: "赤外線センサー、光ファイバー、太陽電池、健康グッズ（？）にも",
    compounds: compounds.filter((c) => c.elements.includes("Ge")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ge")) || 
        r.products.some((product) => product.includes("Ge")),
    ),
  },
  As: {
    description: "毒として有名だけど、実は産業にも使われる元素",
    funFact: "ヒ素カレー事件で有名だけど、電子材料や農薬にも利用されてる",
    commonUse: "半導体（GaAs）、農薬、木材防腐剤、古くは顔料にも",
    compounds: compounds.filter((c) => c.elements.includes("As")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("As")) || 
        r.products.some((product) => product.includes("As")),
    ),
  },
  Se: {
    description: "光に反応する性質を持つ元素",
    funFact: "コピー機やプリンターの“感光ドラム”に使われてる！",
    commonUse: "コピー機、サプリメント（抗酸化作用）、ガラスの着色など",
    compounds: compounds.filter((c) => c.elements.includes("Se")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Se")) || 
        r.products.some((product) => product.includes("Se")),
    ),
  },
  Br: {
    description: "液体のハロゲン元素で、においが強烈",
    funFact: "臭素はフィルム写真や消火器、昔の防腐剤などに使われてた！",
    commonUse: "写真フィルム、難燃剤、医薬品、プール消毒剤など",
    compounds: compounds.filter((c) => c.elements.includes("Br")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Br")) || 
        r.products.some((product) => product.includes("Br")),
    ),
  },
  Kr: {
    description: "希ガスの一つで、反応性が非常に低い",
    funFact: "映画『スーパーマン』の星の名前“クリプトン”の元ネタ！",
    commonUse: "蛍光灯、撮影用フラッシュ、レーザー、断熱窓など",
    compounds: compounds.filter((c) => c.elements.includes("Kr")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Kr")) || 
        r.products.some((product) => product.includes("Kr")),
    ),
  },
  Rb: {
    description: "非常に反応性の高いアルカリ金属",
    funFact: "ルビジウムはGPSや通信の“原子時計”に使われている精密の世界の主役！",
    commonUse: "原子時計、研究用、光電子機器など",
    compounds: compounds.filter((c) => c.elements.includes("Rb")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Rb")) || 
        r.products.some((product) => product.includes("Rb")),
    ),
  },
  Sr: {
    description: "赤い炎色反応で有名な元素",
    funFact: "花火で赤色を出してるのはストロンチウム！しかも骨に似た性質もある",
    commonUse: "花火、歯の治療材、発光塗料、放射線治療にも",
    compounds: compounds.filter((c) => c.elements.includes("Sr")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Sr")) || 
        r.products.some((product) => product.includes("Sr")),
    ),
  },
  Y: {
    description: "白色LEDや蛍光体に使われる金属",
    funFact: "ヨウ素と間違われがちだけど、これは“イットリウム”！白い光の中にひっそり活躍中",
    commonUse: "LED、テレビ、レーザー、セラミック材料など",
    compounds: compounds.filter((c) => c.elements.includes("Y")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Y")) || 
        r.products.some((product) => product.includes("Y")),
    ),
  },
  Zr: {
    description: "耐熱性が高く、原子炉の材料に使われる金属",
    funFact: "ジルコニウム＝人工ダイヤのキラキラ素材“キュービックジルコニア”の正体！",
    commonUse: "宝飾品（人工ダイヤ）、原子炉、セラミックナイフ、歯科材料など",
    compounds: compounds.filter((c) => c.elements.includes("Zr")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Zr")) || 
        r.products.some((product) => product.includes("Zr")),
    ),
  },
  Nb: {
    description: "耐熱・耐腐食性に優れた金属",
    funFact: "航空機のジェットエンジンや、MRIの超伝導磁石にも使われる！",
    commonUse: "超合金、医療用インプラント、電子機器など",
    compounds: compounds.filter((c) => c.elements.includes("Nb")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Nb")) || 
        r.products.some((product) => product.includes("Nb")),
    ),
  },
  Mo: {
    description: "高温でもへこたれない金属",
    funFact: "モリブデン入りのフライパンは熱に強くて長持ち！",
    commonUse: "調理器具、電球フィラメント、金属加工工具、潤滑油添加剤など",
    compounds: compounds.filter((c) => c.elements.includes("Mo")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Mo")) || 
        r.products.some((product) => product.includes("Mo")),
    ),
  },
  Tc: {
    description: "人工的に作られる放射性元素",
    funFact: "世界初の“人工元素”。医療の診断用（アイソトープ）に使われてる！",
    commonUse: "核医学診断（テクネシウムスキャン）、研究用途",
    compounds: compounds.filter((c) => c.elements.includes("Tc")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Tc")) || 
        r.products.some((product) => product.includes("Tc")),
    ),
  },
  Ru: {
    description: "貴金属の仲間で、耐食性に優れた金属",
    funFact: "高級腕時計のコーティングやペン先に使われる“通好み”の金属！",
    commonUse: "電極、触媒、電子機器、高級時計など",
    compounds: compounds.filter((c) => c.elements.includes("Ru")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ru")) || 
        r.products.some((product) => product.includes("Ru")),
    ),
  },
  Rh: {
    description: "プラチナに似た超高価な金属",
    funFact: "ロジウムはレアメタル中のレア！自動車の排ガス浄化に超重要！",
    commonUse: "自動車触媒、ジュエリーコーティング、ミラー反射材など",
    compounds: compounds.filter((c) => c.elements.includes("Rh")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Rh")) || 
        r.products.some((product) => product.includes("Rh")),
    ),
  },
  Pd: {
    description: "プラチナと似た性質のレアメタル",
    funFact: "電気自動車やハイブリッド車の“排ガス処理”に大活躍中！",
    commonUse: "触媒、電子部品、歯科材料、電気接点など",
    compounds: compounds.filter((c) => c.elements.includes("Pd")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Pd")) || 
        r.products.some((product) => product.includes("Pd")),
    ),
  },
  Ag: {
    description: "高い導電性と美しい輝きをもつ金属",
    funFact: "銀は電気を通す力が最強！スマホのタッチパネルにも活躍中",
    commonUse: "アクセサリー、電気接点、写真フィルム、抗菌製品など",
    compounds: compounds.filter((c) => c.elements.includes("Ag")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ag")) || 
        r.products.some((product) => product.includes("Ag")),
    ),
  },
  Cd: {
    description: "毒性があるが、一部の工業製品に使われる金属",
    funFact: "ニカド電池の“カド”＝カドミウム！今は環境配慮で減ってきてるよ",
    commonUse: "ニカド電池、顔料、半導体材料（CdTeソーラー）など",
    compounds: compounds.filter((c) => c.elements.includes("Cd")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cd")) || 
        r.products.some((product) => product.includes("Cd")),
    ),
  },
  In: {
    description: "柔らかくて伸びる、珍しい金属",
    funFact: "スマホの液晶画面（タッチパネル）に使われてる“縁の下の力持ち”！",
    commonUse: "液晶ディスプレイ（ITO）、はんだ、半導体、太陽電池など",
    compounds: compounds.filter((c) => c.elements.includes("In")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("In")) || 
        r.products.some((product) => product.includes("In")),
    ),
  },
  Sn: {
    description: "ブリキの“すず”。昔から使われる金属",
    funFact: "缶詰の内側、金属のつなぎ“はんだ”にも使われてる！",
    commonUse: "はんだ、食品缶、ブロンズ像、金属メッキなど",
    compounds: compounds.filter((c) => c.elements.includes("Sn")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Sn")) || 
        r.products.some((product) => product.includes("Sn")),
    ),
  },
  Sb: {
    description: "硬くて脆い金属で、昔から合金に使われる",
    funFact: "昔の印刷活字やハンダに含まれてた！火を吹く魔術師が使う“アンチモン”🔥",
    commonUse: "ハンダ、難燃剤、合金（鉛バッテリーの強化）など",
    compounds: compounds.filter((c) => c.elements.includes("Sb")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Sb")) || 
        r.products.some((product) => product.includes("Sb")),
    ),
  },
  Te: {
    description: "セレンに似た性質を持つ半金属",
    funFact: "とってもくさい！でも太陽電池や放射線検出器に貢献してる裏方元素",
    commonUse: "CdTe太陽電池、放射線検出器、合金など",
    compounds: compounds.filter((c) => c.elements.includes("Te")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Te")) || 
        r.products.some((product) => product.includes("Te")),
    ),
  },
  I: {
    description: "紫黒色の結晶で、消毒などに使われるハロゲン",
    funFact: "ヨウ素はのどスプレーやうがい薬に使われる超身近な元素！",
    commonUse: "消毒薬、うがい薬、写真フィルム、甲状腺治療",
    compounds: compounds.filter((c) => c.elements.includes("I")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("I")) || 
        r.products.some((product) => product.includes("I")),
    ),
  },
  Xe: {
    description: "希ガスの一種で、反応性は極めて低い",
    funFact: "車のヘッドライト（キセノンランプ）で活躍！宇宙探査機の燃料にも！？",
    commonUse: "キセノンランプ、イオン推進、麻酔、蛍光灯など",
    compounds: compounds.filter((c) => c.elements.includes("Xe")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Xe")) || 
        r.products.some((product) => product.includes("Xe")),
    ),
  },
  Cs: {
    description: "非常に反応性が高いアルカリ金属",
    funFact: "セシウムは原子時計に使われる“時の基準”！超正確な時間のために貢献中",
    commonUse: "原子時計、石油探査、放射線治療、真空管など",
    compounds: compounds.filter((c) => c.elements.includes("Cs")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cs")) || 
        r.products.some((product) => product.includes("Cs")),
    ),
  },
  Ba: {
    description: "重いアルカリ土類金属で、緑色の炎色反応が有名",
    funFact: "バリウム検査で飲むアレ！胃の中を白く映すために必要な粉！",
    commonUse: "医療用造影剤、花火、セラミックス、ガラス添加剤など",
    compounds: compounds.filter((c) => c.elements.includes("Ba")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ba")) || 
        r.products.some((product) => product.includes("Ba")),
    ),
  },
  La: {
    description: "レアアース元素の先頭を飾る金属",
    funFact: "電気自動車のバッテリーに必須！ハイブリッド車の心臓部！",
    commonUse: "ニッケル水素電池、光学レンズ、ガラス添加剤など",
    compounds: compounds.filter((c) => c.elements.includes("La")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("La")) || 
        r.products.some((product) => product.includes("La")),
    ),
  },
  Ce: {
    description: "レアアースで最も豊富な元素",
    funFact: "研磨剤やガラスの色補正に活躍！レンズ磨くときの“セリウムパウダー”！",
    commonUse: "ガラス研磨剤、触媒、光学機器、ガラスの紫外線カット",
    compounds: compounds.filter((c) => c.elements.includes("Ce")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ce")) || 
        r.products.some((product) => product.includes("Ce")),
    ),
  },
  Pr: {
    description: "黄緑色の酸化物が特徴のレアアース",
    funFact: "メガネのレンズやセラミックに使われる、実は“見える”元素！",
    commonUse: "着色ガラス、磁石、セラミック、航空部品など",
    compounds: compounds.filter((c) => c.elements.includes("Pr")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Pr")) || 
        r.products.some((product) => product.includes("Pr")),
    ),
  },
  Nd: {
    description: "強力な永久磁石を作るレアアース",
    funFact: "ネオジム磁石は世界最強クラスの磁力！イヤホン・ハードディスク・ドローンに欠かせない！",
    commonUse: "ネオジム磁石、モーター、スピーカー、風力発電機など",
    compounds: compounds.filter((c) => c.elements.includes("Nd")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Nd")) || 
        r.products.some((product) => product.includes("Nd")),
    ),
  },
  Pm: {
    description: "放射性を持つ非常に稀な金属元素",
    funFact: "プルートニウムよりもレア！放射線治療や電池に使われることも",
    commonUse: "放射線治療、宇宙探査機、核電池など",
    compounds: compounds.filter((c) => c.elements.includes("Pm")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Pm")) || 
        r.products.some((product) => product.includes("Pm")),
    ),
  },
  Sm: {
    description: "強力な永久磁石を作るレアアース",
    funFact: "サマリウムは非常に強い磁石を作れる！硬い磁石はハードディスクに使われてる",
    commonUse: "永久磁石、レーザー、キャパシタ、照明用材料など",
    compounds: compounds.filter((c) => c.elements.includes("Sm")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Sm")) || 
        r.products.some((product) => product.includes("Sm")),
    ),
  },
  Eu: {
    description: "酸化物が赤色を発色する、非常にレアな元素",
    funFact: "イウリウムは、テレビの赤い色素に使われる！未来のディスプレイに登場予定",
    commonUse: "テレビやLEDの赤色発光体、核の制御棒など",
    compounds: compounds.filter((c) => c.elements.includes("Eu")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Eu")) || 
        r.products.some((product) => product.includes("Eu")),
    ),
  },
  Gd: {
    description: "超強力な磁性を持つレアアース元素",
    funFact: "ガドリニウムはMRIで使われる超重要な元素！体内の細かい部分まで撮影できる",
    commonUse: "MRI造影剤、冷却システム、強力な磁石など",
    compounds: compounds.filter((c) => c.elements.includes("Gd")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Gd")) || 
        r.products.some((product) => product.includes("Gd")),
    ),
  },
  Tb: {
    description: "強い光を放つ蛍光物質として利用される元素",
    funFact: "テルビウムは高効率な蛍光灯に使われる！",
    commonUse: "高効率蛍光灯、医療機器、合金など",
    compounds: compounds.filter((c) => c.elements.includes("Tb")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Tb")) || 
        r.products.some((product) => product.includes("Tb")),
    ),
  },
  Dy: {
    description: "非常に強い磁性を持つレアアース",
    funFact: "ディスプレイや電気自動車のモーターの心臓部！ディスプレイや発電機にも登場する！",
    commonUse: "強力な永久磁石、ハイブリッド車のモーター、電子機器など",
    compounds: compounds.filter((c) => c.elements.includes("Dy")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Dy")) || 
        r.products.some((product) => product.includes("Dy")),
    ),
  },
  Ho: {
    description: "非常に高い磁性を持つレアアース金属",
    funFact: "ホルミウムはMRIや心臓モニタリングに使われる特殊な金属！",
    commonUse: "医学機器、強力な永久磁石、核融合実験など",
    compounds: compounds.filter((c) => c.elements.includes("Ho")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ho")) || 
        r.products.some((product) => product.includes("Ho")),
    ),
  },
  Er: {
    description: "非常に強い赤色のレーザーを放つ元素",
    funFact: "エルビウムレーザーは、手術で非常に精密な切開ができる！",
    commonUse: "レーザー治療、光ファイバー通信、永久磁石など",
    compounds: compounds.filter((c) => c.elements.includes("Er")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Er")) || 
        r.products.some((product) => product.includes("Er")),
    ),
  },
  Tm: {
    description: "非常に強力な赤色レーザーを発する元素",
    funFact: "サージカルレーザーや光学機器で活躍中。非常に少ない存在！",
    commonUse: "医療レーザー、光ファイバー、発光装置など",
    compounds: compounds.filter((c) => c.elements.includes("Tm")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Tm")) || 
        r.products.some((product) => product.includes("Tm")),
    ),
  },
  Yb: {
    description: "レアアース金属で、強力なレーザーを発する",
    funFact: "イッテルビウムは、超精密な光ファイバー通信に使用！情報伝送速度が向上！",
    commonUse: "レーザー、光ファイバー、医療機器、合金など",
    compounds: compounds.filter((c) => c.elements.includes("Yb")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Yb")) || 
        r.products.some((product) => product.includes("Yb")),
    ),
  },
  Lu: {
    description: "非常に高い融点を持つレアアース元素",
    funFact: "ルテニウムは高温耐性を持つ！エレクトロニクスや高温環境で活躍する元素！",
    commonUse: "高温材料、光学機器、合金など",
    compounds: compounds.filter((c) => c.elements.includes("Lu")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Lu")) || 
        r.products.some((product) => product.includes("Lu")),
    ),
  },
  Hf: {
    description: "超高温で安定した金属",
    funFact: "ハフニウムは原子炉やロケットエンジンにも使われる、超耐熱性金属！",
    commonUse: "原子炉、ロケットエンジン、高温セラミックなど",
    compounds: compounds.filter((c) => c.elements.includes("Hf")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Hf")) || 
        r.products.some((product) => product.includes("Hf")),
    ),
  },
  Ta: {
    description: "非常に高い耐久性を持つ金属",
    funFact: "タングステンと並ぶほどの硬さ！タングステンより耐食性に優れています",
    commonUse: "航空宇宙、電子機器、軍事、合金など",
    compounds: compounds.filter((c) => c.elements.includes("Ta")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ta")) || 
        r.products.some((product) => product.includes("Ta")),
    ),
  },
  W: {
    description: "非常に高い融点を持つ金属",
    funFact: "タングステンは超高温に耐えるため、電球のフィラメントや切削工具に使われる！",
    commonUse: "電球フィラメント、切削工具、合金、宇宙技術など",
    compounds: compounds.filter((c) => c.elements.includes("W")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("W")) || 
        r.products.some((product) => product.includes("W")),
    ),
  },
  Re: {
    description: "非常に高温で安定し、化学的に耐性が強い金属",
    funFact: "レニウムはジェットエンジンや宇宙技術に使用される",
    commonUse: "ジェットエンジン、触媒、電気機器など",
    compounds: compounds.filter((c) => c.elements.includes("Re")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Re")) || 
        r.products.some((product) => product.includes("Re")),
    ),
  },
  Os: {
    description: "非常に重くて硬い金属",
    funFact: "オスミウムは金属の中でも最も密度が高い！",
    commonUse: "触媒、時計、宝石など",
    compounds: compounds.filter((c) => c.elements.includes("Os")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Os")) || 
        r.products.some((product) => product.includes("Os")),
    ),
  },
  Ir: {
    description: "耐久性が非常に高い貴金属",
    funFact: "イリジウムは非常に腐食に強い！耐腐食性の金属として使用される",
    commonUse: "電子機器、ジュエリー、触媒など",
    compounds: compounds.filter((c) => c.elements.includes("Ir")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ir")) || 
        r.products.some((product) => product.includes("Ir")),
    ),
  },
  Pt: {
    description: "高い耐久性と触媒作用を持つ貴金属",
    funFact: "プラチナは自動車の触媒やジュエリーに欠かせない金属！",
    commonUse: "自動車触媒、ジュエリー、化学反応の触媒など",
    compounds: compounds.filter((c) => c.elements.includes("Pt")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Pt")) || 
        r.products.some((product) => product.includes("Pt")),
    ),
  },
  Au: {
    description: "最も知られる貴金属のひとつ",
    funFact: "黄金の色はその化学的な安定性から！電気伝導性も良いから電子機器にも使われる！",
    commonUse: "ジュエリー、電子機器、通貨など",
    compounds: compounds.filter((c) => c.elements.includes("Au")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Au")) || 
        r.products.some((product) => product.includes("Au")),
    ),
  },
  Hg: {
    description: "唯一常温で液体の金属",
    funFact: "水銀は昔、温度計や蛍光灯に使われたけど、今は取り扱い注意！",
    commonUse: "温度計、蛍光灯、電池、製薬など",
    compounds: compounds.filter((c) => c.elements.includes("Hg")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Hg")) || 
        r.products.some((product) => product.includes("Hg")),
    ),
  },
   Tl: {
    description: "化学的に非常に安定しているが、毒性がある金属",
    funFact: "タリウムは昔、殺鼠剤や毒薬に使われていたことも！",
    commonUse: "電子機器、ガラス、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Tl")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Tl")) || 
        r.products.some((product) => product.includes("Tl")),
    ),
  },
  Pb: {
    description: "鉛は非常に重く、かつ有毒な金属",
    funFact: "鉛はかつて塗料やガソリンに含まれていたけれど、今では規制されている",
    commonUse: "鉛蓄電池、遮蔽材、はんだなど",
    compounds: compounds.filter((c) => c.elements.includes("Pb")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Pb")) || 
        r.products.some((product) => product.includes("Pb")),
    ),
  },
  Bi: {
    description: "非常に低い毒性を持つ重金属",
    funFact: "ビスマスは鉛の代替として使われることが増えてきている",
    commonUse: "化粧品、薬剤、合金など",
    compounds: compounds.filter((c) => c.elements.includes("Bi")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Bi")) || 
        r.products.some((product) => product.includes("Bi")),
    ),
  },
  Po: {
    description: "非常に高い放射能を持つ元素",
    funFact: "ポロニウムは、強力な放射線源であり、かつては暗殺に使われたことも！",
    commonUse: "放射線源、治療用放射線など",
    compounds: compounds.filter((c) => c.elements.includes("Po")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Po")) || 
        r.products.some((product) => product.includes("Po")),
    ),
  },
  At: {
    description: "放射性を持つ希少な元素",
    funFact: "アスタチウムは非常に珍しく、実験室でしか得られない！",
    commonUse: "放射線治療、研究用途など",
    compounds: compounds.filter((c) => c.elements.includes("At")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("At")) || 
        r.products.some((product) => product.includes("At")),
    ),
  },
  Rn: {
    description: "無色、無味の放射性気体",
    funFact: "ラドンは地下のガスとしても存在し、吸入することで健康に害を及ぼす可能性がある！",
    commonUse: "放射線治療、環境調査など",
    compounds: compounds.filter((c) => c.elements.includes("Rn")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Rn")) || 
        r.products.some((product) => product.includes("Rn")),
    ),
  },
  Fr: {
    description: "非常に短い半減期を持つ放射性元素",
    funFact: "フランシウムは自然界ではほとんど存在せず、人工的にしか作れない！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Fr")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Fr")) || 
        r.products.some((product) => product.includes("Fr")),
    ),
  },
  Ra: {
    description: "強い放射線を放つ元素",
    funFact: "ラジウムは過去に放射線治療や時計の蛍光塗料に使われていた",
    commonUse: "放射線治療、放射線源、蛍光塗料など",
    compounds: compounds.filter((c) => c.elements.includes("Ra")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ra")) || 
        r.products.some((product) => product.includes("Ra")),
    ),
  },
  Ac: {
    description: "放射能を持つ元素",
    funFact: "アクチニウムはラジウムよりも早く発見された放射性元素のひとつ！",
    commonUse: "放射線治療、研究用途など",
    compounds: compounds.filter((c) => c.elements.includes("Ac")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ac")) || 
        r.products.some((product) => product.includes("Ac")),
    ),
  },
  Th: {
    description: "ウランと似た性質を持つ元素",
    funFact: "トリウムは原子力技術において注目を集めており、次世代の核燃料として研究されている",
    commonUse: "核燃料、原子力発電、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Th")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Th")) || 
        r.products.some((product) => product.includes("Th")),
    ),
  },
  Pa: {
    description: "放射能を持つ元素で、核兵器や原子力に関連",
    funFact: "パラジウムは非常に希少で、初めて発見された元素の一つ！",
    commonUse: "原子力、核兵器、研究用途",
    compounds: compounds.filter((c) => c.elements.includes("Pa")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Pa")) || 
        r.products.some((product) => product.includes("Pa")),
    ),
  },
  U: {
    description: "最も広く使用されている核燃料の一つ",
    funFact: "ウランは核分裂を利用したエネルギー生成に使われる！",
    commonUse: "核燃料、原子力発電、核兵器など",
    compounds: compounds.filter((c) => c.elements.includes("U")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("U")) || 
        r.products.some((product) => product.includes("U")),
    ),
  },
  Np: {
    description: "人工的に作られる放射性元素",
    funFact: "ネプツニウムは初めて人工的に合成された元素！",
    commonUse: "原子力、研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Np")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Np")) || 
        r.products.some((product) => product.includes("Np")),
    ),
  },
  Pu: {
    description: "非常に高い放射能を持つ元素で、核兵器の材料にもなる",
    funFact: "プルトニウムは、原子力発電所や核兵器に使われる非常に強力な放射能源！",
    commonUse: "核燃料、核兵器、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Pu")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Pu")) || 
        r.products.some((product) => product.includes("Pu")),
    ),
  },
  Am: {
    description: "放射線治療や研究用途に利用される元素",
    funFact: "アメリシウムは非常に強い放射線源で、煙探知機にも使用されることがある",
    commonUse: "放射線治療、研究用途、煙探知機など",
    compounds: compounds.filter((c) => c.elements.includes("Am")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Am")) || 
        r.products.some((product) => product.includes("Am")),
    ),
  },
  Cm: {
    description: "人工的に合成された元素",
    funFact: "キュリウムは、原子力研究で重要な役割を果たしている！",
    commonUse: "原子力、放射線治療、研究用途など",
    compounds: compounds.filter((c) => c.elements.includes("Cm")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cm")) || 
        r.products.some((product) => product.includes("Cm")),
    ),
  },
  Bk: {
    description: "人工的に合成される放射性元素",
    funFact: "バークリウムは核物理学で重要な役割を果たしている！",
    commonUse: "原子力、放射線治療、研究用途など",
    compounds: compounds.filter((c) => c.elements.includes("Bk")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Bk")) || 
        r.products.some((product) => product.includes("Bk")),
    ),
  },
  Cf: {
    description: "非常に高い放射能を持つ人工元素",
    funFact: "カリホルニウムは非常に希少で、原子力研究で重要な役割を果たす！",
    commonUse: "原子力、研究用途など",
    compounds: compounds.filter((c) => c.elements.includes("Cf")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cf")) || 
        r.products.some((product) => product.includes("Cf")),
    ),
  },
  Es: {
    description: "非常に高い放射能を持つ元素",
    funFact: "アインスタイニウムは名前の由来がアルベルト・アインシュタイン！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Es")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Es")) || 
        r.products.some((product) => product.includes("Es")),
    ),
  },
  Fm: {
    description: "非常に高い放射能を持つ元素",
    funFact: "フェルミウムは、核兵器や放射線研究で使われることがある！",
    commonUse: "放射線治療、原子力研究、核兵器など",
    compounds: compounds.filter((c) => c.elements.includes("Fm")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Fm")) || 
        r.products.some((product) => product.includes("Fm")),
    ),
  },
  Md: {
    description: "人工的に合成された元素で、非常に高い放射能を持つ",
    funFact: "メンデレビウムは、ロシアの化学者ドミトリ・メンデレーエフにちなんで名付けられた！",
    commonUse: "原子力研究、放射線治療、学術研究など",
    compounds: compounds.filter((c) => c.elements.includes("Md")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Md")) || 
        r.products.some((product) => product.includes("Md")),
    ),
  },
  No: {
    description: "人工的に合成された放射性元素",
    funFact: "ノーベリウムはノーベル賞の創設者アルフレッド・ノーベルにちなんで名付けられた！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("No")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("No")) || 
        r.products.some((product) => product.includes("No")),
    ),
  },
  Lr: {
    description: "非常に高い放射能を持つ元素で、人工的に合成される",
    funFact: "ローレンシウムは、アメリカの化学者エーヴァ・ローレンスにちなんで名付けられた！",
    commonUse: "放射線治療、研究用途など",
    compounds: compounds.filter((c) => c.elements.includes("Lr")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Lr")) || 
        r.products.some((product) => product.includes("Lr")),
    ),
  },
  Db: {
    description: "人工的に合成された超重元素で、非常に高い放射能を持つ",
    funFact: "ドブニウムは、ロシアのダブナ研究所にちなんで名付けられた！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Db")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Db")) || 
        r.products.some((product) => product.includes("Db")),
    ),
  },
  Rf: {
    description: "非常に高い放射能を持つ元素で、人工的に合成される",
    funFact: "ラザフォードiumは、ニュージーランドの科学者アーネスト・ラザフォードにちなんで名付けられた！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Rf")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Rf")) || 
        r.products.some((product) => product.includes("Rf")),
    ),
  },
  Sg: {
    description: "非常に高い放射能を持つ元素で、人工的に合成される",
    funFact: "シーボーギウムは、アメリカの科学者グレン・シーボーギウムにちなんで名付けられた！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Sg")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Sg")) || 
        r.products.some((product) => product.includes("Sg")),
    ),
  },
  Bh: {
    description: "非常に高い放射能を持つ人工元素",
    funFact: "ボーリウムは、デンマークの物理学者ニールス・ボーアにちなんで名付けられた！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Bh")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Bh")) || 
        r.products.some((product) => product.includes("Bh")),
    ),
  },
  Hs: {
    description: "人工的に合成される超重元素で、非常に高い放射能を持つ",
    funFact: "ハッセリウムは、ドイツの研究所にちなんで名付けられた！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Hs")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Hs")) || 
        r.products.some((product) => product.includes("Hs")),
    ),
  },
  Mt: {
    description: "非常に高い放射能を持つ人工元素で、非常に短命",
    funFact: "マイトネリウムは、ドイツの研究所にちなんで名付けられた！",
    commonUse: "研究用途、放射線治療など",
    compounds: compounds.filter((c) => c.elements.includes("Mt")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Mt")) || 
        r.products.some((product) => product.includes("Mt")),
    ),
  },
  Ds: {
    description: "非常に高い放射能を持つ人工元素",
    funFact: "ダームシュタチウムは、ドイツのダームシュタット研究所にちなんで名付けられた！",
    commonUse: "原子力研究、放射線研究など",
    compounds: compounds.filter((c) => c.elements.includes("Ds")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ds")) || 
        r.products.some((product) => product.includes("Ds")),
    ),
  },
  Rg: {
    description: "人工的に合成された超重元素で、非常に不安定",
    funFact: "レントゲニウムはX線の発見者ヴィルヘルム・レントゲンにちなんで名付けられた！",
    commonUse: "研究用途のみで、日常では使われない",
    compounds: compounds.filter((c) => c.elements.includes("Rg")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Rg")) || 
        r.products.some((product) => product.includes("Rg")),
    ),
  },
  Cn: {
    description: "非常に高い放射能を持つ合成元素で、極めて短命",
    funFact: "コペルニシウムは地動説を提唱した天文学者コペルニクスにちなんで名付けられた！",
    commonUse: "研究用途のみ",
    compounds: compounds.filter((c) => c.elements.includes("Cn")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Cn")) || 
        r.products.some((product) => product.includes("Cn")),
    ),
  },
  Nh: {
    description: "日本の研究チームが発見に貢献した元素！",
    funFact: "ニホニウムは日本にちなんで名付けられた、初の日本発の元素名！",
    commonUse: "研究用途のみ",
    compounds: compounds.filter((c) => c.elements.includes("Nh")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Nh")) || 
        r.products.some((product) => product.includes("Nh")),
    ),
  },
  Fl: {
    description: "ロシアのドゥブナ研究所とアメリカの共同研究で発見された元素",
    funFact: "フレロビウムはロシアの物理学者ゲオルギー・フレロフにちなんで名付けられた！",
    commonUse: "研究用途",
    compounds: compounds.filter((c) => c.elements.includes("Fl")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Fl")) || 
        r.products.some((product) => product.includes("Fl")),
    ),
  },
  Mc: {
    description: "2015年に命名された超重元素",
    funFact: "モスコビウムはロシアのモスクワ州にちなんで命名！",
    commonUse: "研究用途",
    compounds: compounds.filter((c) => c.elements.includes("Mc")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Mc")) || 
        r.products.some((product) => product.includes("Mc")),
    ),
  },
  Lv: {
    description: "非常に重い合成元素で、理論上は金属の性質を持つとされる",
    funFact: "リバモリウムは、アメリカのローレンス・リバモア国立研究所に由来！",
    commonUse: "研究用途",
    compounds: compounds.filter((c) => c.elements.includes("Lv")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Lv")) || 
        r.products.some((product) => product.includes("Lv")),
    ),
  },
  Ts: {
    description: "ハロゲン元素の一つで、非常に不安定",
    funFact: "テネシンは、アメリカのテネシー州にちなんで名付けられた！",
    commonUse: "研究用途",
    compounds: compounds.filter((c) => c.elements.includes("Ts")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Ts")) || 
        r.products.some((product) => product.includes("Ts")),
    ),
  },
  Og: {
    description: "周期表の最後に位置する貴ガス元素。安定性は極めて低い",
    funFact: "オガネソンはロシアの科学者ユーリ・オガネシアンにちなんで名付けられた！",
    commonUse: "理論研究対象のみ",
    compounds: compounds.filter((c) => c.elements.includes("Og")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Og")) || 
        r.products.some((product) => product.includes("Og")),
    ),
  }
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
