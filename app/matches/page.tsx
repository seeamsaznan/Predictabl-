// app/matches/page.tsx
// This is the Matches page of Predictabl.
// Updated with responsive support -- the match cards grid
// collapses from 2 columns to 1 column on mobile screens.

"use client";

import { useState } from "react";
import { matches, Match, Sport } from "@/lib/mockData";
import MatchCard from "@/components/matches/MatchCard";
import { Search } from "lucide-react";

const sportFilters: (Sport | "ALL")[] = ["ALL", "NBA", "NFL", "Soccer", "UFC", "MLB"];

type StatusFilter = "ALL" | "open" | "closing" | "live" | "ended";
const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "All Games", value: "ALL" },
  { label: "Open", value: "open" },
  { label: "Closing Soon", value: "closing" },
  { label: "Live", value: "live" },
  { label: "Ended", value: "ended" },
];

export default function MatchesPage() {
  const [selectedSport, setSelectedSport] = useState<Sport | "ALL">("ALL");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = matches.filter((match) => {
    const sportMatch =
      selectedSport === "ALL" || match.sport === selectedSport;
    const statusMatch =
      selectedStatus === "ALL" || match.status === selectedStatus;
    const searchMatch =
      searchQuery === "" ||
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.league.toLowerCase().includes(searchQuery.toLowerCase());
    return sportMatch && statusMatch && searchMatch;
  });

  return (
    <div>
      {/* Responsive style tag -- tells the grid below to collapse
          from 2 columns to 1 column when screen width is under 768px */}
      <style>{`
        @media (max-width: 768px) {
          .matches-grid {
            grid-template-columns: 1fr !important;
          }
          .status-tabs {
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>

      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#666666",
          }}
        />
        <input
          type="text"
          placeholder="Search matches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "8px",
            padding: "14px 16px 14px 44px",
            color: "#FFFFFF",
            fontSize: "14px",
            outline: "none",
            fontFamily: "Inter, sans-serif",
          }}
        />
      </div>

      {/* Sport filter pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {sportFilters.map((sport) => {
          const isActive = selectedSport === sport;
          return (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              style={{
                backgroundColor: isActive ? "#00FF87" : "transparent",
                color: isActive ? "#0A0A0A" : "#666666",
                border: isActive ? "1px solid #00FF87" : "1px solid #333333",
                borderRadius: "6px",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
              }}
            >
              {sport}
            </button>
          );
        })}
      </div>

      {/* Status filter tabs */}
      <div
        className="status-tabs"
        style={{
          display: "flex",
          gap: "0",
          marginBottom: "24px",
          borderBottom: "1px solid #222222",
        }}
      >
        {statusFilters.map((filter) => {
          const isActive = selectedStatus === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              style={{
                backgroundColor: "transparent",
                color: isActive ? "#00FF87" : "#666666",
                border: "none",
                borderBottom: isActive
                  ? "2px solid #00FF87"
                  : "2px solid transparent",
                padding: "12px 20px",
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
                marginBottom: "-1px",
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p
        style={{
          color: "#666666",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "16px",
        }}
      >
        {filteredMatches.length} {filteredMatches.length === 1 ? "Match" : "Matches"} Found
      </p>

      {/* Match cards grid */}
      {filteredMatches.length > 0 ? (
        <div
          className="matches-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#666666", fontSize: "14px", marginBottom: "8px" }}>
            No matches found
          </p>
          <p style={{ color: "#444444", fontSize: "12px" }}>
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
}