// components/layout/MobileNav.tsx
// This is the bottom navigation bar shown on mobile and tablet.
// It replaces the sidebar on smaller screens.
// It is hidden on desktop via the CSS class mobile-bottom-nav.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, BarChart2, Wallet, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Matches", href: "/matches", icon: Trophy },
  { label: "Predictions", href: "/predictions", icon: BarChart2 },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    // Fixed to the bottom of the screen
    // Only visible on mobile via the mobile-bottom-nav CSS class
    <nav
      className="mobile-bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#111111",
        borderTop: "1px solid #222222",
        padding: "8px 0",
        zIndex: 200,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "8px 16px",
              textDecoration: "none",
              color: isActive ? "#00FF87" : "#666666",
            }}
          >
            <Icon size={20} />
            <span
              style={{
                fontSize: "10px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}