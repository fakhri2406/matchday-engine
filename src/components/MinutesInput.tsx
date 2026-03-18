"use client";

import React from "react";
import { clamp } from "@/utils/rating";

interface MinutesInputProps {
  minutes: number;
  onMinutesChange: (minutes: number) => void;
}

export function MinutesInput({ minutes, onMinutesChange }: MinutesInputProps) {
  return (
    <div style={{
      background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.08)",
      borderRadius: 14, padding: "14px 16px", minWidth: 120,
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
        Minutes
      </div>
      <input type="number" min={0} max={120} value={minutes}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => onMinutesChange(clamp(parseInt(e.target.value) || 0, 0, 120))}
             style={{
               width: 72, textAlign: "center", background: "rgba(15,23,42,0.6)",
               border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8,
               color: "#f1f5f9", fontSize: 18, fontWeight: 600, padding: "6px 8px",
               fontFamily: "'JetBrains Mono', monospace", outline: "none",
             }}
      />
    </div>
  );
}
