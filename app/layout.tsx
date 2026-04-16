// app/layout.tsx
// Root layout file -- the outermost shell of the entire app.
// The sidebar is fixed to the left and never scrolls.
// The main content area on the right scrolls independently.

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Predictabl",
  description: "Community-driven predictive score market. Predict game scores, join pools, win tokens.",
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
          // Prevent the body itself from scrolling
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100vh",
          }}
        >
          {/* Sidebar is fixed on the left and never moves */}
          <div
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

          {/* Main content area sits to the right of the sidebar.
              It has a left margin equal to the sidebar width so
              content does not hide behind the fixed sidebar.
              Only this area scrolls -- not the whole page. */}
          <div
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
            <main
              style={{
                flex: 1,
                padding: "24px",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}