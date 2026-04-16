// components/layout/Header.tsx
// This is the top header bar that appears above every page.
// It displays the current page name, the user's token balance,
// a notification bell, and a user avatar.
// It is a client component because it reads the current URL
// to determine which page title to display.

"use client";

import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

// This object maps URL paths to human readable page titles.
// When the user is on /matches, the header shows "Matches".
// To add a new page title, just add a new key value pair here.
const pageTitles: Record<string, string> = {
  "/": "Home",
  "/matches": "Matches",
  "/predictions": "My Predictions",
  "/wallet": "Wallet",
  "/profile": "Profile",
  "/predict": "Predict Score",
};

export default function Header() {
  // Read the current URL path from the browser
  const pathname = usePathname();

  // Look up the page title for the current path.
  // If no title is found (for example a dynamic route), fall back to "Predictabl"
  const pageTitle = pageTitles[pathname] ?? "Predictabl";

  return (
    // The header spans the full width of the content area.
    // It sticks to the top as the user scrolls down the page.
    // A bottom border separates it from the page content below.
    <header className="sticky top-0 z-10 bg-brand-card border-b border-brand-border px-6 py-4">

      {/* Flexbox row with the page title on the left
          and the user controls on the right */}
      <div className="flex items-center justify-between">

        {/* Left side -- current page title */}
        <div>
          <h1 className="font-display text-xl font-bold text-brand-white tracking-wide">
            {pageTitle}
          </h1>
          <p className="text-brand-muted text-xs mt-0.5">
            Welcome back, Jordan_Dev
          </p>
        </div>

        {/* Right side -- token balance, notifications, avatar */}
        <div className="flex items-center gap-4">

          {/* Token balance pill -- shows how many tokens the user has */}
          <div className="bg-brand-surface border border-brand-border rounded-lg px-4 py-2 flex items-center gap-2">
            {/* Green dot indicator */}
            <div className="w-2 h-2 bg-brand-green rounded-full" />
            <span className="text-brand-green font-bold text-sm font-display">
              1,240 TKNS
            </span>
          </div>

          {/* Notification bell button */}
          <button className="relative w-10 h-10 bg-brand-surface border border-brand-border rounded-lg flex items-center justify-center hover:border-brand-green transition-colors duration-200">
            <Bell size={16} className="text-brand-muted" />
            {/* Red dot badge showing there are unread notifications */}
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-red rounded-full" />
          </button>

          {/* User avatar button -- shows initials and a dropdown arrow */}
          <button className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-lg px-3 py-2 hover:border-brand-green transition-colors duration-200">
            {/* Green square avatar with user initials */}
            <div className="w-7 h-7 bg-brand-green rounded-sm flex items-center justify-center">
              <span className="text-brand-dark font-bold text-xs">JD</span>
            </div>
            <span className="text-brand-white text-sm font-medium">
              Jordan_Dev
            </span>
            <ChevronDown size={14} className="text-brand-muted" />
          </button>

        </div>
      </div>
    </header>
  );
}