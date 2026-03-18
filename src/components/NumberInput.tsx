"use client";

import React, { useCallback } from "react";

interface NumberInputProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function NumberInput({ value, min, max, onChange, style, onFocus, onBlur }: NumberInputProps) {
  const increment = useCallback(() => {
    if (value < max) onChange(String(value + 1));
  }, [value, max, onChange]);

  const decrement = useCallback(() => {
    if (value > min) onChange(String(value - 1));
  }, [value, min, onChange]);

  const arrowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    flex: 1,
    cursor: "pointer",
    color: "#64748b",
    transition: "color 0.15s, background 0.15s",
    userSelect: "none",
  };

  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: -1,
        borderRadius: "0 8px 8px 0",
        overflow: "hidden",
        background: "rgba(15,23,42,0.6)",
        border: "1.5px solid rgba(148,163,184,0.1)",
        borderLeft: "1px solid rgba(148,163,184,0.06)",
      }}>
        <div
          onClick={increment}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(148,163,184,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
          style={arrowStyle}
        >
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 4L4 1L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ height: 1, background: "rgba(148,163,184,0.06)", flexShrink: 0 }} />
        <div
          onClick={decrement}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(148,163,184,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
          style={arrowStyle}
        >
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
