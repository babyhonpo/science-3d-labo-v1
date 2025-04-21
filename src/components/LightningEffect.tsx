import { useRef, useMemo, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import React from 'react';
import { DraggableObject } from '../types/types';
import DraggableBase from './DraggableBase';

interface LightningEffectProps {
  position: THREE.Vector3;
  refData: DraggableObject;
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: (ids: string[]) => void;
  objectsRef: Map<string, DraggableObject>;
}

const lightningVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lightningFragmentShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
  }
  
  void main() {
    vec2 st = vUv * 10.0;
    float n = noise(st + time * 2.0);
    
    // Create electric effect
    float electric = smoothstep(0.4, 0.6, n);
    
    // Add flickering
    float flicker = sin(time * 30.0) * 0.5 + 0.5;
    
    // Create core and outer glow
    float core = smoothstep(0.1, 0.0, abs(vUv.x - 0.5)) * 0.8;
    float glow = smoothstep(0.5, 0.0, abs(vUv.x - 0.5)) * 0.4;
    
    vec3 color = vec3(1.0, 1.0, 0.7); // Base yellow color
    float alpha = (electric * 0.7 + core + glow) * flicker;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export function   LightningEffect({
  position,
  refData,
  onDragStateChange,
  onCollide,
  objectsRef,
}: LightningEffectProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const sound = new Audio('/electonic.mp3');
    sound.volume = 0.5;
    sound.loop = true; // 永続的に再生
    sound.play().catch((error) => console.error('音声再生エラー:', error));

    return () => {
      sound.pause(); // コンポーネントがアンマウントされたときに停止
      sound.currentTime = 0;
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const createLightningBranch = useCallback((
    startPoint: THREE.Vector3,
    direction: THREE.Vector3,
    length: number,
    branchProbability: number = 0.6,
    depth: number = 0
  ): THREE.BufferGeometry[] => {
    const geometries: THREE.BufferGeometry[] = [];
    const segments = 8;
    const points: THREE.Vector3[] = [];
  
    let currentPoint = startPoint.clone();
    const segmentLength = length / segments;
  
    for (let i = 0; i <= segments; i++) {
      points.push(currentPoint.clone());
  
      if (i < segments) {
        const randomOffset = new THREE.Vector3(
          (Math.random() - 0.5) * 0.2 * length,
          (Math.random() - 0.5) * 0.2 * length,
          (Math.random() - 0.5) * 0.2 * length
        );
  
        const nextPoint = currentPoint.clone()
          .add(direction.clone().multiplyScalar(segmentLength))
          .add(randomOffset);
  
        // Create branches
        if (depth < 2 && Math.random() < branchProbability) {
          const branchDirection = direction.clone()
            .applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.random() - 0.5) * Math.PI * 0.5)
            .applyAxisAngle(new THREE.Vector3(1, 0, 0), (Math.random() - 0.5) * Math.PI * 0.5);
  
          const branchGeometries = createLightningBranch(
            currentPoint,
            branchDirection,
            length * 0.6,
            branchProbability * 0.5,
            depth + 1
          );
          geometries.push(...branchGeometries);
        }
  
        currentPoint = nextPoint;
      }
    }
  
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, 0.02 * (1 - depth * 0.3), 8, false);
    geometries.push(geometry);
  
    return geometries;
  }, []);
  
  const branches = useMemo(() => {
    const allGeometries: THREE.BufferGeometry[] = [];
    const numMainBranches = 12;
  
    for (let i = 0; i < numMainBranches; i++) {
      const angle = (i / numMainBranches) * Math.PI * 2;
      const direction = new THREE.Vector3(
        Math.cos(angle),
        (Math.random() - 0.5) * 2,
        Math.sin(angle)
      ).normalize();
  
      const length = 2 + Math.random() * 2;
      const branchGeometries = createLightningBranch(
        new THREE.Vector3(0, 0, 0),
        direction,
        length
      );
      allGeometries.push(...branchGeometries);
    }
  
    return allGeometries;
  }, [createLightningBranch]);

  return (
    <DraggableBase
    refData={refData}
    position={position}
    onDragStateChange={onDragStateChange}
    onCollide={onCollide}
    objectsRef={objectsRef}
    >
      <group>
        {branches.map((geometry, index) => (
          <mesh key={index} geometry={geometry}>
            <shaderMaterial
              ref={materialRef}
              vertexShader={lightningVertexShader}
              fragmentShader={lightningFragmentShader}
              uniforms={uniforms}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      <pointLight color="#ffff80" intensity={8} distance={6} decay={2} />
      <pointLight color="#ffffff" intensity={4} distance={3} decay={2} />
    </group>
    </DraggableBase>
  );
}