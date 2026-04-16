// components/layout/Sidebar.tsx
// Left sidebar navigation for Predictabl.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, BarChart2, Wallet, User, Zap } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Matches", href: "/matches", icon: Trophy },
  { label: "My Predictions", href: "/predictions", icon: BarChart2 },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        minWidth: "240px",
        height: "100vh",
        position: "sticky",
        top: "0",
        backgroundColor: "#111111",
        borderRight: "1px solid #222222",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px",
          borderBottom: "1px solid #222222",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#00FF87",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={16} color="#0A0A0A" />
          </div>
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "Barlow Condensed, sans-serif",
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            PREDICTABL
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav
        style={{
          flex: 1,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
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
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                backgroundColor: isActive
                  ? "rgba(0, 255, 135, 0.1)"
                  : "transparent",
                color: isActive ? "#00FF87" : "#666666",
                borderLeft: isActive
                  ? "2px solid #00FF87"
                  : "2px solid transparent",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Token balance at bottom */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #222222",
        }}
      >
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <p
            style={{
              color: "#666666",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "4px",
            }}
          >
            Token Balance
          </p>
          <p
            style={{
              color: "#00FF87",
              fontWeight: "700",
              fontSize: "20px",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            1,240 TKNS
          </p>
          <p
            style={{
              color: "#666666",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            Available to predict
          </p>
        </div>
      </div>
    </aside>
  );
}