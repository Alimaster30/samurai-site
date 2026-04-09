import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Rim Light / Fresnel Shader for the Helmet
//    Base surface color + additive red Fresnel rim glow
export const RimMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ff0000"),
    uBaseColor: new THREE.Color("#1a1a1a"),
    uBrightness: 1.5,
  },
  `
  varying vec3 vNormal;
  varying vec3 vEyeVector;
  varying vec3 vWorldNormal;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vEyeVector = normalize(cameraPosition - worldPosition.xyz);
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uBaseColor;
  uniform float uBrightness;
  varying vec3 vNormal;
  varying vec3 vEyeVector;
  varying vec3 vWorldNormal;
  void main() {
    // Basic directional lighting for surface visibility
    vec3 lightDir = normalize(vec3(-0.5, 0.8, 0.5));
    float diffuse = max(dot(vWorldNormal, lightDir), 0.0);
    vec3 surface = uBaseColor * (0.3 + 0.7 * diffuse);

    // Fresnel rim glow — additive on top of the base
    float fresnel = pow(1.0 - max(dot(vNormal, vEyeVector), 0.0), 3.0);
    vec3 rim = uColor * fresnel * uBrightness;

    vec3 finalColor = surface + rim;
    float alpha = 0.95 + fresnel * 0.05;
    gl_FragColor = vec4(finalColor, alpha);
  }
  `
);

// 2. Depth Fog Shader for Torii Gate
export const FogMaterial = shaderMaterial(
  { uFogColor: new THREE.Color("#0a0a0a"), uFogNear: 5.0, uFogFar: 20.0 },
  `
  varying float vDepth;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  `
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vDepth;
  void main() {
    float fogFactor = smoothstep(uFogNear, uFogFar, vDepth);
    gl_FragColor = vec4(uFogColor, fogFactor * 0.85);
  }
  `
);

// 3. Sakura Petal Translucency Shader
export const PetalMaterial = shaderMaterial(
  { uTime: 0 },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float alpha = smoothstep(0.0, 0.1, vUv.y) * (1.0 - vUv.y);
    gl_FragColor = vec4(0.9, 0.4, 0.5, alpha * 0.8);
  }
  `
);

// 4. Simplex Noise Background Shader for Silhouette ("Living Ink")
export const InkMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#4a0a0a") },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    float n = noise(vUv * 4.0 + uTime * 0.3);
    float alpha = smoothstep(0.2, 0.6, n);
    gl_FragColor = vec4(uColor, alpha * 0.85);
  }
  `
);
