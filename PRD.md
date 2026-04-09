# Project Requirements Document (PRD): Samurai 3D Interactive Landing Page

## 1. Project Overview
**Project Name:** Samurai 3D Interactive Landing Page  
**Objective:** Build a high-impact, cinematic landing page that combines immersive 3D visuals with a minimal UI to attract premium clients.  
**Visual Tone:** Cinematic, Minimal, High-Contrast, Premium.

---

## 2. Target Audience & Goals
### Target Audience
* Startup founders, Creative agencies, and SaaS companies.
* High-ticket clients seeking custom, "bleeding-edge" web design.

### Core Goals
* **The 3-Second Hook:** Immediate visual impact via WebGL.
* **Technical Authority:** Showcase mastery of Three.js and motion design.
* **Lead Generation:** Convert visitors into high-value inquiries.

---

## 3. Page Structure & User Flow
### 3.1 Navigation & Journey
* **Preloader:** A branded loading screen (using the `ink_brush_stroke_primary.glb` as a progress bar) to ensure assets are ready before the reveal.
* **Single Page Scroll:** Smooth-scroll experience (Lenis or GSAP ScrollSmoother) transitioning through:
    1. **Hero:** Interactive 3D Composition.
    2. **Selected Work:** Minimalist grid.
    3. **Process:** Steps to collaboration.
    4. **About:** Technical background.
    5. **Contact:** Conversion-focused form.

### 3.2 Hero Section Detail
* **Left Side:** Headline with an "Ink Reveal" effect + Primary CTA.
* **Right Side:** 3D Scene containing:
    * **Foreground:** `samurai_helmet_main.glb` (40-60% right-side coverage).
    * **Midground:** `katana_sword_main.glb` (Angled).
    * **Background:** `torii_gate_main.glb` (Foggy depth) + `samurai_silhouette_bg.glb`.
    * **Particles:** `sakura_petals_set.glb` (Constant ambient motion).

---

## 4. Technical Specifications & Stack
* **3D Engine:** Three.js or React Three Fiber (R3F).
* **Motion & Physics:** GSAP (GreenSock) for UI and camera paths.
* **Lighting:** Key light (Top-Left), Red rim light (Back), Soft ambient fill.
* **Interactions:** Mouse-parallax, idle helmet rotation, and scroll-triggered scene transitions.

---

## 5. Performance & Optimization (The "Premium" Standard)
### 5.1 Asset Management
* **Constraint:** Total 3D payload **< 5MB**.
* **Compression:** Use **Draco Compression** for all `.glb` files.
* **Textures:** Use Basis Universal (KTX2) or optimized WebP for textures to reduce GPU memory pressure.

### 5.2 Performance Metrics
* **Frame Rate:** Target 60 FPS on mid-range desktops.
* **Lazy Loading:** Initialize 3D scene first; lazy load "Selected Work" images only as they approach the viewport.

---

## 6. Compatibility & Fallbacks
### 6.1 Device Support
* **Tier 1 (High-End):** Full 3D interactions, post-processing (Bloom, Grain).
* **Tier 2 (Mobile/Low-Power):** Reduced particle count, disabled post-processing, simplified shaders.
* **Tier 3 (No WebGL):** Fallback to a high-quality static hero image of the 3D render.

### 6.2 Browser Support
* Support latest 2 versions of Chrome, Firefox, Edge, and Safari (iOS/macOS).

---

## 7. SEO & Accessibility
* **SEO:** Semantic HTML structure (`<h1>` tags, meta descriptions). OpenGraph image must be a high-res render of the Samurai scene.
* **A11y:** * `aria-label` descriptions for the 3D canvas (e.g., "Interactive 3D Samurai Helmet").
    * Keyboard navigation support for the Contact form.
    * Reduced Motion preference (`prefers-reduced-motion`) to disable heavy parallax for sensitive users.

---

## 8. Risks & Mitigation
| Risk | Mitigation |
| :--- | :--- |
| **Asset Load Time** | Implement a "percentage-based" preloader to keep users engaged. |
| **Mobile Thermal Throttling** | Detect mobile user agents and cap the Three.js `pixelRatio` at 2. |
| **Dark Mode Readability** | Use strict contrast ratios (WCAG 2.1) for all subtext and form labels. |

---

## 9. Deployment & Delivery
* **Hosting:** Vercel or Netlify (for edge-side asset delivery).
* **Final Deliverable:** Optimized production build, source files, and a brief documentation on how to update project images.