// components/layout/Header.tsx
// Top header bar with full responsive support.
// On desktop: shows page title + welcome message on the left,
// full token pill + notification bell + user dropdown on the right.
// On mobile: shows logo + PREDICTABL branding on the left,
// compact token count + bell + avatar only on the right.

"use client";

import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Zap } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/matches": "Matches",
  "/predictions": "My Predictions",
  "/wallet": "Wallet",
  "/profile": "Profile",
  "/predict": "Predict Score",
};

export default function Header() {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] ?? "Predictabl";

  return (
    <>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .header-welcome {
            display: none !important;
          }
          .header-username {
            display: none !important;
          }
          .header-chevron {
            display: none !important;
          }
          .header-token-label {
            display: none !important;
          }
          .mobile-logo {
            display: flex !important;
          }
          .header-title-desktop {
            display: none !important;
          }
          .header-title-mobile {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .header-title-mobile {
            font-size: 16px !important;
          }
          .header-token-pill {
            padding: 6px 10px !important;
          }
        }
      `}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#111111",
          borderBottom: "1px solid #222222",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* LEFT SIDE -- logo + title */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            {/* Mobile logo -- only shows on mobile/tablet */}
            <div
              className="mobile-logo"
              style={{
                display: "none",
                width: "32px",
                height: "32px",
                backgroundColor: "#00FF87",
                borderRadius: "6px",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Zap size={16} color="#0A0A0A" />
            </div>

            <div style={{ minWidth: 0 }}>
              {/* Desktop shows the current page title */}
              <h1
                className="header-title-desktop"
                style={{
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {pageTitle}
              </h1>

              {/* Mobile shows PREDICTABL branding instead */}
              <h1
                className="header-title-mobile"
                style={{
                  display: "none",
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#FFFFFF",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                PREDICTABL
              </h1>

              <p
                className="header-welcome"
                style={{
                  color: "#666666",
                  fontSize: "11px",
                  marginTop: "2px",
                }}
              >
                Welcome back, Jordan_Dev
              </p>
            </div>
          </div>

          {/* RIGHT SIDE -- token balance, bell, avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {/* Token balance pill */}
            <div
              className="header-token-pill"
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #222222",
                borderRadius: "8px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#00FF87",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: "#00FF87",
                  fontWeight: "700",
                  fontSize: "12px",
                  fontFamily: "Barlow Condensed, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                1,240
                <span className="header-token-label" style={{ marginLeft: "4px" }}>
                  TKNS
                </span>
              </span>
            </div>

            {/* Notification bell */}
            <button
              style={{
                position: "relative",
                width: "36px",
                height: "36px",
                backgroundColor: "#1A1A1A",
                border: "1px solid #222222",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Bell size={14} color="#666666" />
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "5px",
                  height: "5px",
                  backgroundColor: "#FF3B3B",
                  borderRadius: "50%",
                }}
              />
            </button>

            {/* User avatar button */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#1A1A1A",
                border: "1px solid #222222",
                borderRadius: "8px",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#00FF87",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#0A0A0A", fontWeight: "700", fontSize: "10px" }}>
                  JD
                </span>
              </div>
              <span
                className="header-username"
                style={{
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Jordan_Dev
              </span>
              <ChevronDown
                className="header-chevron"
                size={12}
                color="#666666"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}