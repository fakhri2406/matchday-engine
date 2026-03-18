"use client";

import {PositionData, PositionKey, POSITIONS} from "@/data/positions";

interface PositionSelectorProps {
  position: PositionKey;
  onPositionChange: (key: PositionKey) => void;
}

export function PositionSelector({position, onPositionChange}: PositionSelectorProps) {
  return (
    <div style={{
      background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.08)",
      borderRadius: 14, padding: "14px 16px",
    }}>
      <div style={{
        fontSize: 11,
        color: "#64748b",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: 10
      }}>
        Position
      </div>
      <div style={{display: "flex", flexWrap: "wrap", gap: 6}}>
        {(Object.entries(POSITIONS) as [PositionKey, PositionData][]).map(([key, p]) => (
          <button key={key} onClick={() => onPositionChange(key)} style={{
            background: position === key
              ? `linear-gradient(135deg, ${p.color}30, ${p.color}15)`
              : "rgba(51,65,85,0.3)",
            border: position === key ? `1.5px solid ${p.color}60` : "1.5px solid rgba(148,163,184,0.08)",
            color: position === key ? p.color : "#94a3b8",
            padding: "6px 12px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: position === key ? 600 : 400,
            fontFamily: "inherit", transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
