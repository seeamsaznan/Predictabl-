// components/home/PerformanceDashboard.tsx
// Performance Dashboard updated with responsive support.
// On desktop: 4 column grid.
// On mobile: 2 column grid so stats stay readable.

import { userStats } from "@/lib/mockData";

const stats = [
  {
    label: "Predictions Made",
    value: userStats.totalPredictions.toString(),
    color: "#FFFFFF",
  },
  {
    label: "Win Rate",
    value: `${userStats.winRate}%`,
    color: "#00FF87",
  },
  {
    label: "Total Won",
    value: userStats.totalWon.toLocaleString(),
    color: "#00FF87",
  },
  {
    label: "Best Payout",
    value: `${userStats.bestPayout}x`,
    color: "#FFFFFF",
  },
];

export default function PerformanceDashboard() {
  return (
    <div
      style={{
        backgroundColor: "#111111",
        border: "1px solid #222222",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        borderLeft: "4px solid #00FF87",
      }}
    >
      {/* Responsive style -- collapses 4 cols to 2 cols on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .performance-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      <p
        style={{
          color: "#666666",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: "16px",
          fontWeight: "600",
        }}
      >
        Performance Dashboard
      </p>

      <div
        className="performance-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          backgroundColor: "#222222",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#111111",
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                color: "#666666",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                color: stat.color,
                fontSize: "28px",
                fontWeight: "700",
                fontFamily: "Barlow Condensed, sans-serif",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}