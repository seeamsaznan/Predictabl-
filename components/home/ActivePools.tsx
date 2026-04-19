// components/home/ActivePools.tsx
// Active Pools updated with responsive support.
// On desktop: 2 column grid of match cards.
// On mobile: single column so each card has more room.

import Link from "next/link";
import { Match } from "@/lib/mockData";

type ActivePoolsProps = {
  matches: Match[];
};

function getStatusColor(status: Match["status"]): string {
  switch (status) {
    case "live":
      return "#00FF87";
    case "closing":
      return "#FF8C00";
    case "open":
      return "#AAAAAA";
    default:
      return "#666666";
  }
}

function getStatusLabel(status: Match["status"]): string {
  switch (status) {
    case "live":
      return "LIVE";
    case "closing":
      return "CLOSING SOON";
    case "open":
      return "OPEN";
    default:
      return "ENDED";
  }
}

export default function ActivePools({ matches }: ActivePoolsProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Responsive style -- collapses to single column on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .active-pools-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Section header with title and view all link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <p
          style={{
            color: "#666666",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontWeight: "600",
          }}
        >
          Active Pools
        </p>
        <Link
          href="/matches"
          style={{
            color: "#00FF87",
            fontSize: "12px",
            fontWeight: "600",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          View All
        </Link>
      </div>

      {/* Grid of match cards */}
      <div
        className="active-pools-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}
      >
        {matches.map((match) => (
          <div
            key={match.id}
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "20px",
              borderLeft: `4px solid ${getStatusColor(match.status)}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  color: "#666666",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {match.sport} · {match.league}
              </span>
              <span
                style={{
                  color: getStatusColor(match.status),
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {getStatusLabel(match.status)}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontSize: "22px",
                fontWeight: "700",
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              {match.homeTeam} vs {match.awayTeam}
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#666666",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "2px",
                  }}
                >
                  Pool Size
                </p>
                <p
                  style={{
                    color: "#00FF87",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Barlow Condensed, sans-serif",
                  }}
                >
                  {match.poolSize.toLocaleString()} TKNS
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    color: "#666666",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "2px",
                  }}
                >
                  Entry Fee
                </p>
                <p
                  style={{
                    color: "#AAAAAA",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {match.entryFee} TKNS
                </p>
              </div>
            </div>

            <Link
              href={`/predict?match=${match.id}`}
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "1px solid #00FF87",
                color: "#00FF87",
                fontWeight: "700",
                fontSize: "13px",
                padding: "10px",
                borderRadius: "8px",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
              }}
            >
              PREDICT +
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}