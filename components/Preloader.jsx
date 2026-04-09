"use client";
import { useProgress, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";
import gsap from "gsap";
import * as THREE from "three";

function InkBrushModel({ progress }) {
  const { scene } = useGLTF("/models/ink_brush_stroke_primary.glb");
  const groupRef = useRef();

  // Reveal the brush stroke proportionally to load progress
  useEffect(() => {
    if (!groupRef.current) return;
    // Scale X from 0→1 as progress goes 0→100
    const t = progress / 100;
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, t, 0.15);
  }, [progress]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#E63946",
          emissive: "#E63946",
          emissiveIntensity: 0.3,
          roughness: 0.8,
        });
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} scale={[0, 1, 1]}>
      <primitive object={scene} scale={2} position={[0, 0, 0]} />
    </group>
  );
}

export default function Preloader() {
  const { progress, active } = useProgress();
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    if (!active && progress === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setIsComplete(true),
        });

        tl.to(textRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        })
          .to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "expo.inOut",
          }, "-=0.4");
      });

      return () => ctx.revert();
    }
  }, [active, progress]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div ref={textRef} className="text-center">
        <h2 className="mb-6 text-xs font-light uppercase tracking-[0.5em] text-white/50">
          Preparing the Blade
        </h2>

        {/* Ink Brush Stroke 3D progress bar */}
        <div className="mx-auto h-16 w-72">
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 4], fov: 30 }}
            gl={{ antialias: false, alpha: true }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 3, 4]} intensity={1} />
            <Suspense fallback={null}>
              <InkBrushModel progress={progress} />
            </Suspense>
          </Canvas>
        </div>

        <div className="mt-4 font-mono text-[10px] text-red-600">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Decorative Kanji in Background */}
      <div className="pointer-events-none absolute bottom-10 right-10 opacity-10">
        <span className="text-[12rem] font-black text-white">武</span>
      </div>
    </div>
  );
}