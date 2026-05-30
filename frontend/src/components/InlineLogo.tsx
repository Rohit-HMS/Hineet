"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  slug: string;
  size?: number;
  className?: string;
  ariaLabel?: string;
  preserveColor?: boolean;
};

export default function InlineLogo({ slug, size = 48, className = "", ariaLabel, preserveColor = false }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchSvg = async () => {
      try {
        const res = await fetch(`/assets/logos/${slug}.svg`);
        if (!res.ok) return;
        let svg = await res.text();

        // Optionally normalize fills/strokes to currentColor for theming.
        if (!preserveColor) {
          svg = svg.replace(/fill="#[^"]+"/gi, 'fill="currentColor"');
          svg = svg.replace(/stroke="#[^"]+"/gi, 'stroke="currentColor"');
        }

        // Remove any width/height attributes so we can size via props
        svg = svg.replace(/width="[^"]+"/gi, "");
        svg = svg.replace(/height="[^"]+"/gi, "");

        if (!mounted) return;
        if (ref.current) {
          ref.current.innerHTML = svg;
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.setAttribute("width", String(size));
            svgEl.setAttribute("height", String(size));
            svgEl.setAttribute("aria-hidden", ariaLabel ? "false" : "true");
            if (ariaLabel) svgEl.setAttribute("aria-label", ariaLabel);
          }
          setLoaded(true);
        }
      } catch (e) {
        // ignore
      }
    };

    fetchSvg();
    return () => {
      mounted = false;
    };
  }, [slug, size, ariaLabel, preserveColor]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", lineHeight: 0, color: "inherit" }}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
}
