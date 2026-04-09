🏯 Project Roadmap: Samurai Cinematic Landing Page

Phase 1: Foundation & Infrastructure
[x] Next.js Initialization: Set up App Router with Tailwind CSS and standard directory structure.
[x] Dependency Setup: Install three, @react-three/fiber, @react-three/drei, gsap.
[x] Performance Hooks (/lib):
[x] useDevicePerformance.js: Tier-based detection (Mobile/Low-end vs. Desktop).
[x] useScrollAnimation.js: GSAP ScrollTrigger defaults.
[x] Asset Pipeline:
[x] Configure useGLTF.preload for all 6 core models.
[x] Draco compression: All 6 .glb files compressed with gltf-pipeline --draco.compressionLevel 7.
[x] DRACOLoader configured in Hero3DScene via useGLTF.setDecoderPath (gstatic CDN).

Phase 2: Shader Engineering (/lib/shaders.js)
[x] Rim Light (Fresnel): Custom shader for samurai_helmet_main with sharp red rim effect.
[x] Depth Fog: Fog shader for torii_gate_main atmospheric depth.
[x] Petal Translucency: Double-sided shader for sakura_petals_set.
[x] Simplex Noise Background: samurai_silhouette_bg "living ink" distortion shader.

Phase 3: 3D Scene Assembly (Hero3DScene.jsx)
[x] Canvas Configuration: R3F Canvas with dpr, shadows, frameloop="always".
[x] Lighting Rig: Key directional, red rim point light, ambient fill, soft fill.
[x] Particle System: Falling sakura petals via InstancedMesh (80 desktop / 30 mobile).
[x] Model Composition: Helmet (fg), Katana (mid), Torii + Silhouette (bg).
[x] Scroll-driven Torii Z-axis advance: Torii moves forward as user scrolls.
[x] Scroll-driven Camera FOV: FOV breathes from 35→42 and camera drifts up on scroll.

Phase 4: UI & Interaction Layer
[x] Preloader: Ink-brush progress bar hooked into useProgress.
[x] UI Overlay: Bold typography with Tailwind.
[x] Ink-brush H1 reveal: SVG clipPath (#ink-reveal) animated by GSAP — rect width 0→1 paints the headline in.
[x] Red underline draw-in after headline reveal.
[x] Parallax: Mouse coordinates drive scene group rotation.

Phase 5: Animation & Scroll Orchestration
[x] GSAP ScrollTrigger registered against the main scroll container.
[x] Below-fold sections fade + slide in (opacity 0→1, y 60→0) as they enter viewport.
[x] Torii gate advances on Z-axis driven by scrollTop progress.
[x] Camera FOV + Y position shift subtly between sections.
[x] prefers-reduced-motion respected in all GSAP animations.

Phase 6: Content Sections
[x] WorkSection.jsx: 4-project grid with scroll reveal.
[x] ProcessSection.jsx: 4-step process with red number accents.
[x] AboutSection.jsx: Bio + skills grid.
[x] ContactSection.jsx: Accessible form — labels, focus rings, keyboard nav, budget selector.

Phase 7: Optimization & Polish
[x] Adaptive Quality: Mobile gets 30 particles, dpr=1, shadows off, no antialias.
[x] Accessibility: aria-label on Canvas, prefers-reduced-motion, keyboard nav on form.
[x] WebGL Fallback: <WebGLFallback /> static kanji composition.
[x] SEO: H1, meta description, OpenGraph, Twitter card, metadataBase.

Critical Technical Specifications
Colors: Primary #000000 (Black), Accent #E63946 (Samurai Red). ✓
Typography: Bold Serifs for headings, clean Sans-serif for subtext. ✓
Shader Note: All uTime uniforms updated via useFrame. ✓
Draco: All .glb files compressed, decoder pointed at gstatic CDN. ✓
