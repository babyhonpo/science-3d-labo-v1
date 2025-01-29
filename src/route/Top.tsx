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
        </section>
        <section className="section-content">
          <div className="box-content">
            <h2 className="title-section">分子の結合</h2>
            <p className="text-section">
              文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。
            </p>
          </div>
        </section>
        <section className="section-content">
          <div className="box-content">
            <h2 className="title-section">分子の分裂</h2>
            <p className="text-section">
              文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。
            </p>
            <a href="/Home">あああああああああ</a>
            {/* <link href="/Home">ああああああ</link> */}
          </div>
        </section>
      </div>
    </main>
  )
}
