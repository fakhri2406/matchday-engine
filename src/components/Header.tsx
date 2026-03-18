"use client";

import React from "react";

interface HeaderProps {
  onReset: () => void;
}

export function Header({ onReset }: HeaderProps) {
  return (
    <header style={{
      background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))",
      borderBottom: "1px solid rgba(148,163,184,0.1)",
      padding: "20px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 12,
      backdropFilter: "blur(20px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="/md-engine-icon.png" alt="Matchday Engine" width={28} height={28} style={{ borderRadius: 6 }} />
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#f1f5f9" }}>
          Matchday Engine
        </span>
      </div>
      <button onClick={onReset} style={{
        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
        color: "#f87171", padding: "8px 16px", borderRadius: 8, cursor: "pointer",
        fontSize: 13, fontWeight: 500, fontFamily: "inherit",
        transition: "all 0.2s",
      }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { (e.target as HTMLButtonElement).style.background = "rgba(239,68,68,0.2)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { (e.target as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)"; }}
      >Reset All</button>
    </header>
  );
}
