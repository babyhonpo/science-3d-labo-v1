"use client"

import React, { useRef, useMemo } from "react"
import { Center, PerspectiveCamera, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"
import { useDraggable } from "../hooks/useDraggable"

// 水面のシェーダー
const WaterShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0x0080ff) },
    uWaveHeight: { value: 0.06  },
    uWaveFrequency: { value: 3.0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uWaveHeight;
    uniform float uWaveFrequency;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    float calculateWave(vec2 position) {
      float wave1 = sin(position.x * uWaveFrequency + uTime) * 
                   sin(position.y * uWaveFrequency + uTime) * uWaveHeight;
      float wave2 = sin(position.x * uWaveFrequency * 2.0 + uTime * 1.5) * 
                   sin(position.y * uWaveFrequency * 2.0 + uTime * 1.5) * uWaveHeight * 0.4;
      return wave1 + wave2;
    }
    
    void main() {
      vPosition = position;
      
      // 水面の波を計算（Y軸が上向き）
      vec3 newPosition = position;
      if (position.y < 0.01) { // 水面付近の頂点のみ動かす
        newPosition.y += calculateWave(position.xz);
      }
      
      vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
      
      // 法線の計算（波の動きに合わせて更新）
      vec3 tangent = vec3(1.0, calculateWave(vec2(position.x + 0.01, position.z)) - 
                          calculateWave(vec2(position.x - 0.01, position.z)), 0.0);
      vec3 bitangent = vec3(0.0, calculateWave(vec2(position.x, position.z + 0.01)) - 
                           calculateWave(vec2(position.x, position.z - 0.01)), 1.0);
      vNormal = normalize(cross(normalize(tangent), normalize(bitangent)));
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      // 水の色と光沢を表現
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(0.0, dot(normal, lightDir));
      float specular = pow(max(0.0, dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0))), 32.0);
      
      vec3 color = uColor * (0.5 + diffuse * 0.5) + vec3(specular * 0.5);
      
      // 水の透明度（深さに応じて変化）
      float alpha = 0.9;
      
      gl_FragColor = vec4(color, alpha);
    }
  `,
}

// 環境キューブマップを作成（単色のみ）
function createSolidColorCubeMap(color) {
  const size = 16
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")
  if (context) {
    context.fillStyle = color
    context.fillRect(0, 0, size, size)
  } else {
    console.error("Failed to get 2D context for canvas.")
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.mapping = THREE.CubeUVReflectionMapping

  return texture
}

function Water() {
  const waterRef = useRef<THREE.Mesh | null>(null)
  const waterMaterialRef = useRef<THREE.ShaderMaterial | null>(null)

  // 水面のジオメトリを作成（球体の内側に収まるように）
  const waterGeometry = useMemo(() => {
    // 半径0.9の半球を作成（球体の内側に収まるように少し小さく）
    const geometry = new THREE.SphereGeometry(0.9, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2)
    // Y軸を中心に回転して水平にする
    geometry.rotateX(Math.PI)
    // 球体の中心に配置
    geometry.translate(0, 0, 0)
    return geometry
  }, [])

  return (
    <mesh ref={waterRef} geometry={waterGeometry}>
      <shaderMaterial ref={waterMaterialRef} args={[WaterShader]} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Scene() {
  // 単色の環境マップを作成
  const envMap = useMemo(() => createSolidColorCubeMap("#111827"), [])

  const { ref, bind } = useDraggable<THREE.Group>()

  return (
    <group ref={ref} {...(bind() as JSX.IntrinsicElements['group'])}>
      {/* 透明な球体 */}
      <Center>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            samples={16}
            resolution={256}
            thickness={0.5}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.06}
            envMap={envMap}
            reflectivity={0.2}
            background={new THREE.Color("#111827")}
          />
        </mesh>

        {/* 球体内の水 */}
        <Water />
      </Center>
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight position={[5, 5, 5]} intensity={1} castShadow />
      <spotLight position={[-5, 5, -5]} intensity={0.8} />
      <spotLight position={[0, -5, 0]} intensity={0.5} />
    </>
  )
}

export default function WaterSphere() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
      <color attach="background" args={["#111827"]} />

      <Lights />
      <Scene />

      {/* OrbitControlsを削除して回転機能を無効化 */}
    </>
  )
}
