"use client";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useDevicePerformance } from "@/lib/useDevicePerformance";
import { RimMaterial, InkMaterial, FogMaterial, PetalMaterial } from "@/lib/shaders";
import WebGLFallback from "@/components/WebGLFallback";

extend({ RimMaterial, InkMaterial, FogMaterial, PetalMaterial });

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

useGLTF.preload("/models/samurai_helmet_main.glb");
useGLTF.preload("/models/katana_sword_main.glb");
useGLTF.preload("/models/torii_gate_main.glb");
useGLTF.preload("/models/samurai_silhouette_bg.glb");
useGLTF.preload("/models/sakura_petals_set.glb");

function SakuraParticles({ count }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        Math.random() * 15,
        (Math.random() - 0.5) * 10
      ),
      speed: 0.005 + Math.random() * 0.01,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      rot: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.003,
    })), [count]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.pos.y -= p.speed;
      p.pos.x += p.drift;
      p.rot += p.rotSpeed;
      if (p.pos.y < -5) p.pos.y = 15;

      dummy.position.copy(p.pos);
      dummy.rotation.set(p.rot, p.rot * 0.5, p.rot * 0.3);
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <planeGeometry args={[1, 1]} />
      <petalMaterial
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function ScrollCamera({ scrollRef }) {
  const { camera } = useThree();

  useFrame(() => {
    if (!scrollRef?.current) return;
    const el = scrollRef.current;
    const progress = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
    camera.fov = THREE.MathUtils.lerp(camera.fov, 35 + progress * 15, 0.05);
    camera.updateProjectionMatrix();
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, progress * 2.5, 0.05);
  });

  return null;
}

function SamuraiScene({ tier, scrollRef }) {
  const { scene: helmetScene } = useGLTF("/models/samurai_helmet_main.glb");
  const { scene: katanaScene } = useGLTF("/models/katana_sword_main.glb");
  const { scene: toriiScene } = useGLTF("/models/torii_gate_main.glb");
  const { scene: silhouetteScene } = useGLTF("/models/samurai_silhouette_bg.glb");

  const helmet = useMemo(() => helmetScene.clone(true), [helmetScene]);
  const katana = useMemo(() => katanaScene.clone(true), [katanaScene]);
  const torii = useMemo(() => toriiScene.clone(true), [toriiScene]);
  const silhouette = useMemo(() => silhouetteScene.clone(true), [silhouetteScene]);

  const group = useRef();
  const toriiGroupRef = useRef();
  const rimMatRef = useRef();
  const inkMatRef = useRef();
  const fogMatRef = useRef();

  useEffect(() => {
    // Apply rim material to helmet meshes
    const rim = new RimMaterial();
    rim.transparent = true;
    helmet.traverse((child) => {
      if (child.isMesh) {
        child.material = rim;
        child.castShadow = true;
      }
    });
    rimMatRef.current = rim;

    // Apply ink material to silhouette meshes
    const ink = new InkMaterial();
    ink.transparent = true;
    ink.depthWrite = false;
    silhouette.traverse((child) => {
      if (child.isMesh) child.material = ink;
    });
    inkMatRef.current = ink;

    // Apply fog material to torii gate meshes for atmospheric depth
    const fog = new FogMaterial();
    fog.transparent = true;
    fog.depthWrite = false;
    torii.traverse((child) => {
      if (child.isMesh) child.material = fog;
    });
    fogMatRef.current = fog;

    return () => {
      rim.dispose();
      ink.dispose();
      fog.dispose();
    };
  }, [helmet, silhouette, torii]);

  useFrame((state) => {
    const { x, y } = state.mouse;
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.2, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.1, 0.05);
    }

    if (toriiGroupRef.current && scrollRef?.current) {
      const el = scrollRef.current;
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
      toriiGroupRef.current.position.z = THREE.MathUtils.lerp(
        toriiGroupRef.current.position.z,
        progress * 6,
        0.05
      );
    }

    if (rimMatRef.current) rimMatRef.current.uTime = t;
    if (inkMatRef.current) inkMatRef.current.uTime = t;
  });

  return (
    <group ref={group}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 8, 5]} intensity={1.5} color="#ffffff" castShadow={tier.shadows} />
      <pointLight position={[-5, 2, -2]} intensity={4} color="#E63946" />
      <pointLight position={[5, -2, 5]} intensity={0.8} color="#330000" />

      <Environment preset="night" />

      {/* Silhouette bg — centered behind everything */}
      <primitive object={silhouette} position={[0, -0.5, -14]} scale={7} />

      {/* Torii — scroll-driven Z via wrapper group, raised and centered-right */}
      <group ref={toriiGroupRef}>
        <primitive object={torii} position={[2, -1.5, -8]} scale={4} rotation={[0, Math.PI / 8, 0]} />
      </group>

      {/* Katana midground — angled between helmet and torii */}
      <primitive object={katana} position={[1, -0.5, -2]} scale={1.8} rotation={[0.3, -0.6, Math.PI / 5]} />

      {/* Helmet foreground — right side, ~50% coverage per PRD */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <primitive object={helmet} scale={2.5} position={[2.5, -0.3, 0]} />
      </Float>

      {/* Sakura particles */}
      <SakuraParticles count={tier.isMobile ? 30 : 80} />
    </group>
  );
}

function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export default function Hero3DScene({ scrollRef }) {
  const tier = useDevicePerformance();
  const webglSupported = useWebGLSupport();

  if (!webglSupported) return <WebGLFallback />;

  return (
    <div
      className="absolute inset-0 z-0"
      aria-label="Interactive 3D Samurai scene"
      role="img"
    >
      <Canvas
        dpr={[1, tier.dpr]}
        shadows={tier.shadows}
        frameloop="always"
        camera={{ position: [0, 0, 8], fov: 35, near: 0.1, far: 100 }}
        gl={{
          antialias: !tier.isMobile,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#000000"), 1);
        }}
      >
        <SamuraiScene tier={tier} scrollRef={scrollRef} />
        <ScrollCamera scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
