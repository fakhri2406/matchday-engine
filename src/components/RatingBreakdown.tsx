"use client";

import { BreakdownItem } from "@/hooks/useRatingCalculator";
import { clamp } from "@/utils/rating";
import { BASE_RATING } from "@/data/constants";

interface RatingBreakdownProps {
  showBreakdown: boolean;
  onToggle: () => void;
  breakdown: BreakdownItem[];
  ratingColor: string;
  rating: number;
  minutes: number;
}

export function RatingBreakdown({ showBreakdown, onToggle, breakdown, ratingColor, rating, minutes }: RatingBreakdownProps) {
  return (
    <div style={{ marginTop: 24 }}>
      <button onClick={onToggle} style={{
        background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.08)",
        borderRadius: "14px 14px " + (showBreakdown ? "0 0" : "14px 14px"),
        padding: "14px 18px", width: "100%", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "inherit", color: "#e2e8f0", fontSize: 14, fontWeight: 600,
        transition: "all 0.2s",
      }}>
        <span>Rating Breakdown</span>
        <span style={{ fontSize: 18, transform: showBreakdown ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
      </button>
      {showBreakdown && (
        <div style={{
          background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)",
          borderTop: "none", borderRadius: "0 0 14px 14px", padding: "16px",
          animation: "fadeIn 0.3s ease",
        }}>
          {breakdown.length === 0 ? (
            <div style={{ color: "#64748b", fontSize: 13, textAlign: "center", padding: 20 }}>
              No events entered yet. Adjust the inputs above to see the breakdown.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", padding: "0 4px 8px",
                borderBottom: "1px solid rgba(148,163,184,0.06)",
                fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                <span>Event</span>
                <span>Impact</span>
              </div>
              {breakdown.map(b => (
                <div key={b.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "6px 8px", borderRadius: 8,
                  background: b.isPositive ? "rgba(34,197,94,0.04)" : "rgba(239,68,68,0.04)",
                }}>
                  <span style={{ fontSize: 13, color: "#cbd5e1" }}>
                    {b.label} <span style={{ color: "#64748b" }}>×{b.count}</span>
                  </span>
                  <span style={{
                    fontSize: 14, fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: b.contribution > 0 ? "#22c55e" : "#ef4444",
                  }}>
                    {b.contribution > 0 ? "+" : ""}{b.contribution.toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 8px 4px", borderTop: "1px solid rgba(148,163,184,0.1)",
                marginTop: 4,
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>
                  Base ({(BASE_RATING * clamp(minutes/90,0,1)).toFixed(1)}) + Events
                </span>
                <span style={{
                  fontSize: 18, fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: ratingColor,
                }}>
                  = {rating.toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
