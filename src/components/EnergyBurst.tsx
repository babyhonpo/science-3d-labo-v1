import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Color,
  ShaderMaterial,
  AdditiveBlending,
  PointLight,
} from "three";

const particleCount = 2000;

const vertexShader = `
  uniform float uTime;
  uniform float uScale;
  
  attribute float size;
  attribute vec3 velocity;
  attribute float delay;
  attribute vec3 color;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    float time = max(0.0, uTime - delay);
    vec3 pos = position + velocity * time;
    float scale = min(1.0, time * 2.0) * (1.0 - min(1.0, time * 0.5));
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = size * uScale * scale * (300.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function EnergyBurst() {
  const points = useRef();
  const light = useRef();

  const [positions, velocities, delays, sizes, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const delays = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;

      const x = Math.sin(angle1) * Math.cos(angle2);
      const y = Math.sin(angle1) * Math.sin(angle2);
      const z = Math.cos(angle1);

      const idx = i * 3;
      positions[idx] = x * 0.1;
      positions[idx + 1] = y * 0.1;
      positions[idx + 2] = z * 0.1;

      const speed = 2 + Math.random() * 8;
      velocities[idx] = x * speed;
      velocities[idx + 1] = y * speed;
      velocities[idx + 2] = z * speed;

      delays[i] = Math.random() * 0.5;
      sizes[i] = 5 + Math.random() * 15;

      const color = new Color();
      color.setHSL(0.05 + Math.random() * 0.05, 0.9, 0.6 + Math.random() * 0.2);
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
    }

    return [positions, velocities, delays, sizes, colors];
  }, []);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 1 },
      },
      vertexShader,
      fragmentShader,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.material.uniforms.uTime.value += delta;

      const time = points.current.material.uniforms.uTime.value;
      if (time < 2) {
        light.current.intensity = Math.exp(-time * 2) * 50;
      }

      // state.camera.position.lerp(
      //   new Vector3(Math.sin(time * 0.5) * 10, 5, Math.cos(time * 0.5) * 10),
      //   0.05
      // );
      // state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-velocity'
            count={particleCount}
            array={velocities}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-delay'
            count={particleCount}
            array={delays}
            itemSize={1}
          />
          <bufferAttribute
            attach='attributes-size'
            count={particleCount}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach='attributes-color'
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={shaderMaterial} attach='material' />
      </points>
      <primitive
        object={new PointLight(0xff7700, 50, 20, 2)}
        ref={light}
        position={[0, 0, 0]}
      />
      <ambientLight intensity={0.1} />
    </>
  );
}
