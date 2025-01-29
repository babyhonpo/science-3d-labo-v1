"use client"

import dynamic from "next/dynamic"
import { Loader } from "@/components/loader"

// 3Dコンポーネントを動的にインポートして、SSRの問題を回避
const ChemistryScene = dynamic(() => import("@/components/chemistry-scene"), {
  loading: () => <Loader />,
  ssr: false,
})

export default function Home() {
  return (
    <main className="w-full">
      <div className="fixed top-0 left-0 w-full h-screen">
        <ChemistryScene />
      </div>
      <div className="relative">
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">Science3DLabo</h1>
        </section>
        <section className="h-screen flex items-center justify-center">
          <div className="max-w-2xl text-center text-white">
            <h2 className="text-4xl font-bold mb-4">分子の結合</h2>
            <p className="text-xl">
              文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。
            </p>
          </div>
        </section>
        <section className="h-screen flex items-center justify-center">
          <div className="max-w-2xl text-center text-white">
            <h2 className="text-4xl font-bold mb-4">分子の分裂</h2>
            <p className="text-xl">
              文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。文字が入ります。
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

