import { useRef } from "react"
import { useThree } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"
import * as THREE from "three"

export function useDraggable<T extends THREE.Object3D>() {
  const ref = useRef<T>(null)
  const { camera } = useThree()

  const bind = useDrag(({ offset: [dx, dy] }) => {
    if (!ref.current) return

    // カメラから見た「右方向」と「上方向」
    const right = new THREE.Vector3()
    const up = new THREE.Vector3()

    camera.getWorldDirection(right)          // 前方向を取得
    right.cross(camera.up).normalize()       // 前 × 上 = 右方向
    up.copy(camera.up).normalize()           // 上方向（世界）

    // スケーリング係数（速度調整）
    const factor = 0.005

    // ドラッグ量を方向ベクトルに反映
    const moveX = right.multiplyScalar(dx * factor)
    const moveY = up.multiplyScalar(-dy * factor) // 上方向にドラッグで上へ

    const movement = new THREE.Vector3()
    movement.addVectors(moveX, moveY)

    // オブジェクトを新しい位置へ移動
    ref.current.position.copy(movement)
  })

  return { ref, bind }
}
