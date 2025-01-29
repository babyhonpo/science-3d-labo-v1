import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 20;

// パーティクル数
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);
let explosionActive = false;

// 初期位置と速度を設定
function resetParticles() {
    for (let i = 0; i < particleCount; i++) {
        const index = i * 3;

        // 位置を中心に戻す
        positions[index] = 0;
        positions[index + 1] = 0;
        positions[index + 2] = 0;

        // ランダムな速度
        velocities[index] = (Math.random() - 0.5) * 0.4;
        velocities[index + 1] = (Math.random() - 0.5) * 0.4;
        velocities[index + 2] = (Math.random() - 0.5) * 0.4;

        // ランダムなサイズ
        sizes[i] = Math.random() * 3;
    }
}
resetParticles();

// BufferGeometryに属性を設定
particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
particles.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
particles.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

// テクスチャの読み込み
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./exload01_1.png'); // 煙や火花のテクスチャ

// マテリアル設定
const particleMaterial = new THREE.PointsMaterial({
    size: 0.2,
    map: particleTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
});

// 粒子システムを作成
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// 2つの3Dオブジェクト
const object1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(object1);

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(object2);

object1.position.set(-5, 0, 0);
object2.position.set(5, 0, 0);

// 動きの速度
const object1Speed = 0.05;
const object2Speed = -0.05;

// 爆発処理
function triggerExplosion() {
    explosionActive = true;
    resetParticles();
}

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // 2つのオブジェクトを動かす
    object1.position.x += object1Speed;
    object2.position.x += object2Speed;

    // 距離を計算
    const distance = object1.position.distanceTo(object2.position);

    // 距離が一定以下なら爆発を発動
    if (distance < 1 && !explosionActive) {
        triggerExplosion();
    }

    // 爆発のパーティクルを動かす
    if (explosionActive) {
        const positions = particles.attributes.position.array;
        const velocities = particles.attributes.velocity.array;

        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;

            // 速度に基づいて粒子を移動
            positions[index] += velocities[index];
            positions[index + 1] += velocities[index + 1];
            positions[index + 2] += velocities[index + 2];

            // 簡単な減速を追加
            velocities[index] *= 0.98;
            velocities[index + 1] *= 0.98;
            velocities[index + 2] *= 0.98;

            // 消える条件（速度が十分小さくなった場合など）を設定
            if (Math.abs(velocities[index]) < 0.001 && 
                Math.abs(velocities[index + 1]) < 0.001 && 
                Math.abs(velocities[index + 2]) < 0.001) {
                explosionActive = false; // 爆発終了
            }
        }

        particles.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}

animate();
