import React, { useEffect, useRef } from "react";
// import ChemistryScene from "../components/top/chemistry-scene";
import ChemistryScene from "../components/top/chemistry-scene"
import "../css/top.css"

export default function Top() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]); // 各セクションの参照を保存
  const sectionIndex = useRef(0); // 現在のセクションのインデックス
  
  useEffect(() => {
    let isScrolling = false;
  
    const handleScroll = (event) => {
      event.preventDefault(); // デフォルトのスクロール動作を無効化
  
      if (isScrolling) return; // 連続スクロールを防ぐ
  
      const scrollThreshold = 10; // 10px 以上のスクロール量で移動
      if (Math.abs(event.deltaY) < scrollThreshold) return; // 小さいスクロールを無視
  
      isScrolling = true; // スクロール中フラグをON
  
      if (event.deltaY > 0) {
        // 下スクロール（次のセクションへ）
        sectionIndex.current = Math.min(
          sectionIndex.current + 1,
          sectionsRef.current.length - 1
        );
      } else {
        // 上スクロール（前のセクションへ）
        sectionIndex.current = Math.max(sectionIndex.current - 1, 0);
      }
  
      sectionsRef.current[sectionIndex.current]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  
      setTimeout(() => {
        isScrolling = false; // 一定時間経過後にスクロールを許可
      }, 500); // 500ms クールダウン
    };
  
    window.addEventListener("wheel", handleScroll, { passive: false });
  
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);
  
  return (
    <main className="w-full">
      {/* 3Dシーンの背景 */}
      <div className="scene-container">
        <ChemistryScene />
      </div>

      {/* コンテンツエリア */}
      <div className="content-wrapper">
      <section ref={(el) => (sectionsRef.current[0] = el)} className="section-hero">
        <div className="center-container">
          <div>
              <h1 className="title-main">Science3DLabo</h1>
              <div>
                <a href="/Home" className="move-Home"><img src="../public/Labo.png" alt="実験室へ" /></a>
              </div>
            </div>
        </div>
        </section>
        <section ref={(el) => (sectionsRef.current[1] = el)} className="section-content">
          <div className="center-container">
            <div>
              <h2 className="title-section">🌟 元素をくっつけると爆発</h2>
              <p className="text-section">
              最先端の3D技術で、化学実験をより身近に、<br></br>
              よりリアルに安全に体験できるバーチャルラボ。<br></br>
              危険な実験も、ここなら安全にシミュレーション可能！<br></br>
              さあ、科学の世界へ飛び込もう！
              </p>
            </div>
          </div>
        </section>
        <section ref={(el) => (sectionsRef.current[2] = el)} className="section-content">
          <div className="center-container">
            <div>
              <h2 className="title-section">💨 気体の発生、目に見える化学反応</h2>
              <p className="text-section">
                有毒ガスや爆発...やろうと思ってできるようなことじゃないですよね
              </p>
            </div>
          </div>
        </section>
        <section ref={(el) => (sectionsRef.current[3] = el)} className="section-content">
          <div className="center-container">
            <div>
              <h2 className="title-section">⚡ 電気を発生させる実験</h2>
              <p className="text-section">
              電気分解、バッテリーの仕組み、<br></br>
              導電性の実験など…電気を利用した科学の不思議を探求しよう！<br></br>
              目に見えないエネルギーの世界が広がる。
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
