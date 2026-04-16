// app/predict/page.tsx
// This is the Match Detail and Predict page.
// Users arrive here by clicking "Predict Score" on any match card.
// The match ID is passed in the URL as a query parameter.
// For example: /predict?match=match-001
//
// This page has several interactive sections:
// 1. Match header with team names and stats bar
// 2. Global sentiment showing crowd prediction split
// 3. Pot capacity progress bar
// 4. Score picker with live payout calculation
// 5. Lock Score button that shows a confirmation modal

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMatchById, Match } from "@/lib/mockData";
import ScorePicker from "@/components/predict/ScorePicker";
import Link from "next/link";
import { Suspense } from "react";

// This is the main content of the predict page.
// It is separated into its own component because useSearchParams()
// requires a Suspense boundary in Next.js app router.
function PredictContent() {
  // useSearchParams reads the URL query parameters.
  // For /predict?match=match-001, searchParams.get("match") returns "match-001"
  const searchParams = useSearchParams();
  const matchId = searchParams.get("match") || "match-001";

  // Find the match from our mock data using the ID from the URL
  const match = getMatchById(matchId);

  // Score state -- starts at realistic default values based on sport
  const [homeScore, setHomeScore] = useState(108);
  const [awayScore, setAwayScore] = useState(104);

  // Controls whether the prediction locked modal is visible
  const [showModal, setShowModal] = useState(false);

  // Controls whether the lock button is in loading state
  const [isLocking, setIsLocking] = useState(false);

  // Calculate confidence score based on how close the scores are
  // to the crowd sentiment. This is a simplified version of the
  // real algorithm we will build in Phase 9.
  function calculateConfidence(): number {
    const scoreDiff = Math.abs(homeScore - awayScore);
    if (scoreDiff === 0) return 50;
    if (scoreDiff <= 3) return 85;
    if (scoreDiff <= 7) return 75;
    if (scoreDiff <= 15) return 65;
    return 55;
  }

  // Calculate estimated payout based on pool size and confidence.
  // Again this is simplified -- the real algorithm comes in Phase 9.
  function calculatePayout(): number {
    if (!match) return 0;
    const confidence = calculateConfidence();
    const multiplier = confidence / 100 * 3;
    return Math.round(match.entryFee * multiplier * 10);
  }

  // Handle the lock prediction button click.
  // We simulate a loading state for 1 second then show the modal.
  function handleLockPrediction() {
    setIsLocking(true);
    setTimeout(() => {
      setIsLocking(false);
      setShowModal(true);
    }, 1000);
  }

  // If no match is found for the given ID show an error state
  if (!match) {
    return (
      <div style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ color: "#666666", fontSize: "16px" }}>
          Match not found.
        </p>
        <Link
          href="/matches"
          style={{ color: "#00FF87", fontSize: "14px", textDecoration: "none" }}
        >
          Browse all matches
        </Link>
      </div>
    );
  }

  const confidence = calculateConfidence();
  const estimatedPayout = calculatePayout();

  return (
    <div>
      {/* Breadcrumb navigation */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/matches"
          style={{ color: "#666666", fontSize: "13px", textDecoration: "none" }}
        >
          Matches
        </Link>
        <span style={{ color: "#444444", margin: "0 8px" }}>→</span>
        <span style={{ color: "#FFFFFF", fontSize: "13px" }}>
          {match.homeTeam} vs {match.awayTeam}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN -- match info and sentiment */}
        <div>

          {/* Match header card */}
          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "16px",
              background: "linear-gradient(135deg, #0d1a0d 0%, #111111 60%, #0a0a0a 100%)",
            }}
          >
            {/* League and status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  color: "#666666",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {match.league}
              </span>
              <span
                style={{
                  backgroundColor: match.status === "live" ? "#00FF87" : "#FF8C00",
                  color: "#0A0A0A",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                }}
              >
                {match.status === "live" ? "LIVE" : "CLOSING SOON"}
              </span>
            </div>

            {/* Team matchup display */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              {/* Home team */}
              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#1A1A1A",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    border: "1px solid #333333",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>🏀</span>
                </div>
                <p
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                  }}
                >
                  {match.homeTeam}
                </p>
              </div>

              {/* VS and match info */}
              <div style={{ textAlign: "center", padding: "0 24px" }}>
                <p
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "32px",
                    fontWeight: "800",
                    color: "#00FF87",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  VS
                </p>
                <p style={{ color: "#666666", fontSize: "12px" }}>
                  {match.startTime}
                </p>
                <p style={{ color: "#666666", fontSize: "12px" }}>
                  {match.channel}
                </p>
              </div>

              {/* Away team */}
              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#00FF87",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>🏀</span>
                </div>
                <p
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                  }}
                >
                  {match.awayTeam}
                </p>
              </div>
            </div>

            {/* Stats bar -- total pot, players, odds, tv */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1px",
                backgroundColor: "#222222",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {[
                { label: "Total Pot", value: `${(match.poolSize / 1000).toFixed(1)}K` },
                { label: "Players", value: match.participants.toLocaleString() },
                { label: "Odds", value: `${match.homeOdds}/${match.awayOdds > 0 ? "+" : ""}${match.awayOdds}` },
                { label: "TV", value: match.channel },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: "#1A1A1A",
                    padding: "12px 16px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                    {stat.label}
                  </p>
                  <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: "700", fontFamily: "Barlow Condensed, sans-serif" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Global sentiment card */}
          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Global Sentiment
              </p>
              <span
                style={{
                  color: "#00FF87",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                · Live Tracking
              </span>
            </div>

            {/* Sentiment percentages */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  {match.homeSentiment}%
                </p>
                <p style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase" }}>
                  {match.homeTeam}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#00FF87",
                    lineHeight: 1,
                  }}
                >
                  {match.awaySentiment}%
                </p>
                <p style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase" }}>
                  {match.awayTeam}
                </p>
              </div>
            </div>

            {/* Sentiment progress bar */}
            <div
              style={{
                height: "6px",
                backgroundColor: "#222222",
                borderRadius: "3px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${match.homeSentiment}%`,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "3px",
                }}
              />
            </div>

            {/* Pot capacity */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <p style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Pot Capacity
                </p>
                <p style={{ color: "#AAAAAA", fontSize: "12px", fontWeight: "600" }}>
                  {match.potCapacity}% of Cap
                </p>
              </div>
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#222222",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${match.potCapacity}%`,
                    backgroundColor: "#00FF87",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN -- score picker and lock prediction */}
        <div>
          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "24px",
              position: "sticky",
              top: "24px",
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Lock Prediction
              </p>
              <span
                style={{
                  backgroundColor: "rgba(0,255,135,0.1)",
                  color: "#00FF87",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Elite Tier
              </span>
            </div>

            {/* Score picker component */}
            <ScorePicker
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              homeScore={homeScore}
              awayScore={awayScore}
              onHomeScoreChange={setHomeScore}
              onAwayScoreChange={setAwayScore}
            />

            {/* Estimated payout and confidence score */}
            <div
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: "8px",
                padding: "16px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Est. Payout
                </span>
                <span
                  style={{
                    color: "#00FF87",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Barlow Condensed, sans-serif",
                  }}
                >
                  {estimatedPayout.toLocaleString()} TOKENS
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Confidence Score
                </span>
                <span
                  style={{
                    color: confidence >= 75 ? "#00FF87" : confidence >= 60 ? "#FF8C00" : "#FF3B3B",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Barlow Condensed, sans-serif",
                  }}
                >
                  {confidence} / 100
                </span>
              </div>
            </div>

            {/* Entry fee notice */}
            <p
              style={{
                color: "#666666",
                fontSize: "12px",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              Entry fee: {match.entryFee} TKNS will be deducted
            </p>

            {/* Lock Score button */}
            <button
              onClick={handleLockPrediction}
              disabled={isLocking}
              style={{
                width: "100%",
                backgroundColor: isLocking ? "#00CC6A" : "#00FF87",
                color: "#0A0A0A",
                fontWeight: "700",
                fontSize: "16px",
                padding: "16px",
                borderRadius: "8px",
                border: "none",
                cursor: isLocking ? "not-allowed" : "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Barlow Condensed, sans-serif",
                transition: "all 0.2s",
              }}
            >
              {isLocking ? "LOCKING..." : "LOCK SCORE"}
            </button>
          </div>
        </div>
      </div>

      {/* Prediction Locked Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#111111",
              border: "2px solid #00FF87",
              borderRadius: "16px",
              padding: "48px",
              maxWidth: "440px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* Green checkmark */}
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#00FF87",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <span style={{ fontSize: "28px", color: "#0A0A0A" }}>✓</span>
            </div>

            <h2
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontSize: "32px",
                fontWeight: "800",
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Prediction Locked
            </h2>

            <p
              style={{
                color: "#00FF87",
                fontSize: "20px",
                fontWeight: "700",
                fontFamily: "Barlow Condensed, sans-serif",
                marginBottom: "24px",
              }}
            >
              {match.homeTeam} {homeScore} — {match.awayTeam} {awayScore}
            </p>

            <div
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: "8px",
                padding: "12px 20px",
                marginBottom: "24px",
                display: "inline-block",
              }}
            >
              <span style={{ color: "#AAAAAA", fontSize: "13px" }}>
                {match.entryFee} TOKENS DEDUCTED
              </span>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link
                href="/matches"
                style={{
                  display: "block",
                  backgroundColor: "#00FF87",
                  color: "#0A0A0A",
                  fontWeight: "700",
                  fontSize: "14px",
                  padding: "14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                Browse More Matches →
              </Link>
              <Link
                href="/predictions"
                style={{
                  display: "block",
                  backgroundColor: "transparent",
                  border: "1px solid #00FF87",
                  color: "#00FF87",
                  fontWeight: "700",
                  fontSize: "14px",
                  padding: "14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                View My Predictions →
              </Link>
            </div>

            {/* Transaction ID */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid #222222",
              }}
            >
              <span style={{ color: "#444444", fontSize: "11px" }}>
                TXID: CL-8842-X9
              </span>
              <span style={{ color: "#444444", fontSize: "11px" }}>
                {new Date().toLocaleDateString()} · {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// The default export wraps PredictContent in a Suspense boundary.
// This is required by Next.js when using useSearchParams() in a
// client component -- it prevents the page from crashing during
// server side rendering while waiting for the URL params.
export default function PredictPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ color: "#666666" }}>Loading match...</p>
      </div>
    }>
      <PredictContent />
    </Suspense>
  );
}