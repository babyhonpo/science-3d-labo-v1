import React from "react"
import ChemistryScene from "../components/top/chemistry-scene"
import "../css/top.css"

export default function Top() {
  return (
    <main className="w-full">
      {/* 3Dシーンの背景 */}
      <div className="scene-container">
        <ChemistryScene />
      </div>

      {/* コンテンツエリア */}
      <div className="content-wrapper">
        <section className="section-hero">
          <h1 className="title-main">Science3DLabo</h1>
          <a href="/Home" className="move-Home"><img src="../public/Labo.png" alt="" /></a>
        </section>
        <section className="section-content">
          <div className="box-content">
            <h2 className="title-section">元素をくっつけると爆発</h2>
            <p className="text-section">
              爆発実験...怖いけど一度は見てみたくないですか？
            </p>
          </div>
        </section>
        <section className="section-content">
          <div className="box-content">
            <h2 className="title-section">元素をくっつけると毒ガス</h2>
            <p className="text-section">
              有毒ガスや爆発...やろうと思ってできるようなことじゃないですよね
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
