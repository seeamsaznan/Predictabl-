// app/layout.tsx
// Root layout updated with responsive support.
// On desktop: fixed sidebar on the left, content on the right.
// On mobile/tablet: sidebar hidden, bottom navigation shown instead.

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Predictabl",
  description: "Community-driven predictive score market.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0A0A0A",
          color: "#FFFFFF",
          margin: 0,
          padding: 0,
          fontFamily: "Inter, sans-serif",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <div style={{ display: "flex", height: "100vh" }}>

          {/* Desktop sidebar -- hidden on mobile via CSS class */}
          <div
            className="desktop-sidebar"
            style={{
              flexShrink: 0,
              width: "240px",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 100,
            }}
          >
            <Sidebar />
          </div>

          {/* Main content area */}
          <div
            className="main-content-area"
            style={{
              marginLeft: "240px",
              flex: 1,
              height: "100vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            <main style={{ flex: 1, padding: "24px" }}>
              {children}
            </main>
          </div>
        </div>

        {/* Mobile bottom navigation -- only visible on mobile/tablet */}
        <MobileNav />
      </body>
    </html>
  );
}