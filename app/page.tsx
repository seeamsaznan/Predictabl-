// app/page.tsx
// Home page updated with responsive support.
// On desktop: 2 column layout with active pools on the left
// and recent results on the right.
// On mobile: stacks into single column with recent results below.

import FeaturedMatch from "@/components/home/FeaturedMatch";
import PerformanceDashboard from "@/components/home/PerformanceDashboard";
import ActivePools from "@/components/home/ActivePools";
import RecentResults from "@/components/home/RecentResults";
import { matches, predictions } from "@/lib/mockData";

export default function HomePage() {
  const featuredMatch =
    matches.find((m) => m.status === "live") ||
    matches.find((m) => m.status === "closing") ||
    matches[0];

  const activePools = matches
    .filter((m) => m.status !== "ended")
    .slice(0, 4);

  return (
    <div>
      {/* Responsive style tag -- collapses the bottom grid to a
          single column on mobile so cards stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          .home-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <FeaturedMatch match={featuredMatch} />
      <PerformanceDashboard />

      <div
        className="home-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <ActivePools matches={activePools} />
        <RecentResults predictions={predictions} />
      </div>
    </div>
  );
}