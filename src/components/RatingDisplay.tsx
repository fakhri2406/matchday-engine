import { getRatingLabel } from "@/utils/rating";
import { clamp } from "@/utils/rating";
import { BASE_RATING } from "@/data/constants";

interface RatingDisplayProps {
  rating: number;
  ratingColor: string;
  posLabel: string;
  minutes: number;
}

export function RatingDisplay({ rating, ratingColor, posLabel, minutes }: RatingDisplayProps) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))",
      border: "1px solid rgba(148,163,184,0.08)",
      borderRadius: 20, padding: "28px 24px", marginBottom: 20,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 8,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at center, ${ratingColor}12 0%, transparent 70%)`,
      }} />
      <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", zIndex: 1 }}>
        Match Rating
      </div>
      <div style={{
        fontSize: 72, fontWeight: 700, color: ratingColor,
        fontFamily: "'JetBrains Mono', monospace",
        lineHeight: 1, zIndex: 1, letterSpacing: "-0.04em",
        textShadow: `0 0 40px ${ratingColor}40`,
        animation: "pulse 3s ease-in-out infinite",
      }}>
        {rating.toFixed(1)}
      </div>
      <div style={{
        fontSize: 14, fontWeight: 600, color: ratingColor, zIndex: 1,
        background: `${ratingColor}15`, padding: "4px 14px", borderRadius: 20,
        border: `1px solid ${ratingColor}30`,
      }}>
        {getRatingLabel(rating)}
      </div>
      <div style={{ fontSize: 12, color: "#64748b", zIndex: 1, marginTop: 4 }}>
        {posLabel} • {minutes} min played • Base {(BASE_RATING * clamp(minutes/90,0,1)).toFixed(1)}
      </div>
    </div>
  );
}
