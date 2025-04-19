import * as THREE from "three"

/**
 * 太陽のテクスチャを生成する関数
 * @param size テクスチャのサイズ（ピクセル）
 * @returns 生成されたテクスチャ
 */
export function generateSunTexture(size: number): THREE.Texture {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")

    if (!context) {
        throw new Error("Canvas 2D context could not be created")
    }

    // グラデーション背景
    const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, "#fff9c4") // 中心は明るい黄色
    gradient.addColorStop(0.5, "#ffb74d") // 中間はオレンジ
    gradient.addColorStop(1, "#e65100") // 外側は濃いオレンジ

    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)

    // ノイズパターンを追加
    addNoisePattern(context, size, 0.15)

    // 太陽の表面の細かい模様を追加
    addSunSurfaceDetails(context, size)

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    return texture
}

/**
 * 太陽の法線マップを生成する関数
 * @param size テクスチャのサイズ（ピクセル）
 * @returns 生成された法線マップ
 */
export function generateSunNormalMap(size: number): THREE.Texture {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")

    if (!context) {
        throw new Error("Canvas 2D context could not be created")
    }

    // 基本的な灰色の背景（法線マップの中立色）
    context.fillStyle = "#8080ff" // 法線マップの中立色（RGB: 128, 128, 255）
    context.fillRect(0, 0, size, size)

    // 太陽表面の凹凸を表現
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const radius = 10 + Math.random() * 40

        const gradient = context.createRadialGradient(x, y, 0, x, y, radius)

        // ランダムな法線の方向を生成
        const r = Math.floor(Math.random() * 40 + 100)
        const g = Math.floor(Math.random() * 40 + 100)
        const b = 255 // 青は常に最大（上向き）

        gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`)
        gradient.addColorStop(1, "#8080ff") // 外側は中立色に戻る

        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    return texture
}

/**
 * キャンバスにノイズパターンを追加する関数
 * @param context キャンバスコンテキスト
 * @param size キャンバスサイズ
 * @param intensity ノイズの強度（0-1）
 */
function addNoisePattern(context: CanvasRenderingContext2D, size: number, intensity = 0.1) {
    const imageData = context.getImageData(0, 0, size, size)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * intensity * 255

        data[i] = Math.min(255, Math.max(0, data[i] + noise)) // R
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)) // G
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)) // B
    }

    context.putImageData(imageData, 0, 0)
}

/**
 * 太陽表面の細かい模様を追加する関数
 * @param context キャンバスコンテキスト
 * @param size キャンバスサイズ
 */
function addSunSurfaceDetails(context: CanvasRenderingContext2D, size: number) {
    // 太陽の黒点
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const radius = 5 + Math.random() * 15

        const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.7)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
    }

    // 太陽の明るい部分（フレア）
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        const radius = 5 + Math.random() * 20

        const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
    }
}
