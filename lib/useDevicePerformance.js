import { useState, useEffect } from 'react';

// Derive tier synchronously from navigator so the initial state matches
// what the client will compute — avoids React hydration mismatch.
function detectTier() {
  if (typeof navigator === 'undefined') return { isMobile: false, dpr: 2, shadows: true };
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency || 4;
  if (isMobile || cores < 8) {
    // PRD §8: cap pixelRatio at 1 on mobile to prevent thermal throttling
    return { isMobile: true, dpr: 1, shadows: false };
  }
  // PRD §8: cap pixelRatio at 2 on desktop
  return { isMobile: false, dpr: Math.min(window.devicePixelRatio ?? 2, 2), shadows: true };
}

export const useDevicePerformance = () => {
  // Initialise with the real client value so server and client agree
  const [tier] = useState(detectTier);
  return tier;
};