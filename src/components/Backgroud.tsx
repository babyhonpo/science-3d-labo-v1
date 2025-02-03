import React from "react";
import * as THREE from "three";

const Background: React.FC = () => {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec2 vUv;

    void main() {
      float h = normalize(vUv.y + offset) * exponent;
      gl_FragColor = vec4(mix(bottomColor, topColor, h), 1.0);
    }
  `;

  return (
    <mesh>
      <sphereGeometry args={[10000, 32, 32]} />
      <shaderMaterial
        attach='material'
        vertexShader={vertexShader} // シェーダーコードを省略
        fragmentShader={fragmentShader}
        uniforms={{
          topColor: { value: new THREE.Color(0x87ceeb) },
          bottomColor: { value: new THREE.Color(0xffffff) },
          offset: { value: 0.0 },
          exponent: { value: 0.6 },
        }}
        // uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default Background;
