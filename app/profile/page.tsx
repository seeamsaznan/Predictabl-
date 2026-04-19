// app/profile/page.tsx
// Profile page updated with responsive support.
// On desktop: 2 column layout with profile info on the left
// and account settings on the right.
// On mobile: stacks into single column with settings below.

"use client";

import { useState } from "react";
import { userStats } from "@/lib/mockData";

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [liveOdds, setLiveOdds] = useState(true);

  return (
    <div>
      {/* Responsive style tag -- collapses grid to single column on mobile
          and also collapses the stats grid from 2 columns to 1 */}
      <style>{`
        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        className="profile-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN -- avatar, tier, pro circuit CTA, stats */}
        <div>

          {/* Avatar and user info card */}
          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "16px",
              textAlign: "center",
              background: "linear-gradient(135deg, #0d1a0d 0%, #111111 60%, #0a0a0a 100%)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#00FF87",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <span
                style={{
                  color: "#0A0A0A",
                  fontSize: "28px",
                  fontWeight: "800",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                JD
              </span>
            </div>

            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "22px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              {userStats.username}
            </h2>

            <div
              style={{
                display: "inline-block",
                border: "1px solid #00FF87",
                borderRadius: "6px",
                padding: "4px 16px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  color: "#00FF87",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: "Barlow Condensed, sans-serif",
                }}
              >
                {userStats.tier}
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#00FF87",
                borderRadius: "8px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    color: "#0A0A0A",
                    fontSize: "16px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontFamily: "Barlow Condensed, sans-serif",
                    marginBottom: "2px",
                  }}
                >
                  Join Pro Circuit
                </p>
                <p style={{ color: "#0A0A0A", fontSize: "12px", opacity: 0.7 }}>
                  Unlock Exclusive Lab Data
                </p>
              </div>
              <span style={{ color: "#0A0A0A", fontSize: "20px", fontWeight: "700" }}>
                →
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              backgroundColor: "#222222",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {[
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
                label: "Best Payout",
                value: `${userStats.bestPayoutTokens.toLocaleString()}`,
                color: "#FFFFFF",
                suffix: "TKNS",
              },
              {
                label: "Current Streak",
                value: `${userStats.currentStreak} Wins`,
                color: "#00FF87",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "#111111",
                  padding: "24px",
                }}
              >
                <p
                  style={{
                    color: "#666666",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "8px",
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
                {stat.suffix && (
                  <p style={{ color: "#666666", fontSize: "11px", marginTop: "4px" }}>
                    {stat.suffix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN -- account settings */}
        <div>
          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #222222",
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
                Account Settings
              </p>
            </div>

            {[
              {
                label: "Push Notifications",
                description: "Get notified about match results",
                value: notifications,
                onChange: setNotifications,
              },
              {
                label: "Email Updates",
                description: "Weekly performance summary",
                value: emailUpdates,
                onChange: setEmailUpdates,
              },
              {
                label: "Live Odds Updates",
                description: "Real-time odds changes",
                value: liveOdds,
                onChange: setLiveOdds,
              },
            ].map((setting) => (
              <div
                key={setting.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  borderBottom: "1px solid #222222",
                  gap: "12px",
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "2px",
                    }}
                  >
                    {setting.label}
                  </p>
                  <p style={{ color: "#666666", fontSize: "12px" }}>
                    {setting.description}
                  </p>
                </div>

                <button
                  onClick={() => setting.onChange(!setting.value)}
                  style={{
                    width: "48px",
                    height: "26px",
                    backgroundColor: setting.value ? "#00FF87" : "#333333",
                    borderRadius: "13px",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background-color 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "3px",
                      left: setting.value ? "25px" : "3px",
                      transition: "left 0.2s",
                    }}
                  />
                </button>
              </div>
            ))}

            {[
              { label: "Edit Profile", color: "#FFFFFF" },
              { label: "Change Password", color: "#FFFFFF" },
              { label: "Privacy Settings", color: "#FFFFFF" },
              { label: "Sign Out", color: "#FF3B3B" },
            ].map((action) => (
              <div
                key={action.label}
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #222222",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: action.color,
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {action.label}
                </span>
                <span style={{ color: "#444444", fontSize: "16px" }}>→</span>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              borderRadius: "12px",
              padding: "16px 24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <p style={{ color: "#444444", fontSize: "12px" }}>
                Predictabl v1.0.0
              </p>
              <p style={{ color: "#444444", fontSize: "12px" }}>
                Built with Next.js
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}