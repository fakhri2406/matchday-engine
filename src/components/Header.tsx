"use client";

import React, { useState, useEffect, useRef } from "react";
import { Preset } from "@/data/presets";

interface HeaderProps {
  onReset: () => void;
  presets: Preset[];
  onLoadPreset: (preset: Preset) => void;
}

export function Header({ onReset, presets, onLoadPreset }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

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
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button onClick={() => setOpen(!open)} style={{
            background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)",
            color: "#94a3b8", padding: "8px 14px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 500, fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6,
            transition: "all 0.2s",
          }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { (e.target as HTMLButtonElement).style.background = "rgba(148,163,184,0.15)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { (e.target as HTMLButtonElement).style.background = "rgba(148,163,184,0.08)"; }}
          >
            Presets
            <span style={{ fontSize: 10, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
          </button>
          {open && (
            <div style={{
              position: "absolute", top: "calc(100% + 6px)", right: 0,
              background: "rgba(15,23,42,0.95)", border: "1px solid rgba(148,163,184,0.12)",
              borderRadius: 10, padding: 6, minWidth: 200,
              backdropFilter: "blur(20px)",
              zIndex: 50,
            }}>
              {presets.map((p) => (
                <button key={p.name} onClick={() => { onLoadPreset(p); setOpen(false); }} style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "transparent", border: "none",
                  color: "#cbd5e1", padding: "8px 12px", borderRadius: 6, cursor: "pointer",
                  fontSize: 13, fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
                        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "rgba(148,163,184,0.1)"; }}
                        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "transparent"; }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
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
      </div>
    </header>
  );
}
