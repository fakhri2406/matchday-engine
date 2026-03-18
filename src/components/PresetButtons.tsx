"use client";

import React from "react";
import { Preset } from "@/data/presets";

interface PresetButtonsProps {
  presets: Preset[];
  onLoadPreset: (preset: Preset) => void;
}

export function PresetButtons({ presets, onLoadPreset }: PresetButtonsProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10,
      marginBottom: 24,
    }}>
      {presets.map(p => (
        <button key={p.name} onClick={() => onLoadPreset(p)} style={{
          background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)",
          borderRadius: 12, padding: "12px 14px", cursor: "pointer",
          textAlign: "left", fontFamily: "inherit", transition: "all 0.2s",
          color: "#e2e8f0",
        }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "rgba(30,41,59,0.8)"; e.currentTarget.style.borderColor = "rgba(148,163,184,0.2)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "rgba(30,41,59,0.5)"; e.currentTarget.style.borderColor = "rgba(148,163,184,0.08)"; }}
        >
          <div style={{ fontSize: 18, marginBottom: 4 }}>{p.icon}</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>{p.desc}</div>
        </button>
      ))}
    </div>
  );
}
