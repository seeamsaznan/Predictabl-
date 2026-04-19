// components/ui/ResponsiveGrid.tsx
// A reusable responsive grid component.
// On desktop it shows the specified number of columns.
// On mobile it collapses to a single column automatically.
// We use this throughout the app to avoid repeating
// the same media query logic on every page.

"use client";

import { useEffect, useState } from "react";

type ResponsiveGridProps = {
  children: React.ReactNode;
  // Number of columns on desktop
  cols?: number;
  gap?: number;
};

export default function ResponsiveGrid({
  children,
  cols = 2,
  gap = 16,
}: ResponsiveGridProps) {
  // Track the window width so we can switch between
  // desktop and mobile layouts
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check the window width on mount
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkWidth();

    // Re-check whenever the window is resized
    window.addEventListener("resize", checkWidth);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        // On mobile always use 1 column
        // On desktop use the specified number of columns
        gridTemplateColumns: isMobile ? "1fr" : `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}