"use client";

import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.22, duration: 0.45, smoothWheel: true, wheelMultiplier: 1.2, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
