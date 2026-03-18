"use client";

import React from "react";
import { GameEvent } from "@/data/events";
import { PositionKey } from "@/data/positions";
import { getImpactTier } from "@/utils/rating";
import { NumberInput } from "@/components/NumberInput";

interface EventSectionProps {
  title: string;
  titleColor: string;
  events: GameEvent[];
  values: Record<string, number>;
  position: PositionKey;
  setValue: (id: string, v: string) => void;
  tooltipId: string | null;
  setTooltipId: (id: string | null) => void;
}

export function EventSection({ title, titleColor, events, values, position, setValue, tooltipId, setTooltipId }: EventSectionProps) {
  return (
    <div style={{
      background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.06)",
      borderRadius: 16, overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 18px", borderBottom: "1px solid rgba(148,163,184,0.06)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: titleColor }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{title}</span>
        <span style={{ fontSize: 12, color: "#64748b" }}>({events.length})</span>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 1, background: "rgba(148,163,184,0.03)",
      }}>
        {events.map(event => {
          const w = event.weights[position] || 0;
          const tier = getImpactTier(w);
          const isActive = (values[event.id] || 0) > 0;
          return (
            <div key={event.id} style={{
              padding: "10px 14px", background: "rgba(15,23,42,0.4)",
              display: "flex", alignItems: "center", gap: 10,
              opacity: w === 0 ? 0.35 : 1,
              transition: "all 0.15s",
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#f1f5f9" : "#cbd5e1",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {event.label}
                  </span>
                  <span
                    onClick={() => setTooltipId(tooltipId === event.id ? null : event.id)}
                    style={{
                      cursor: "pointer", fontSize: 12, color: "#475569",
                      width: 16, height: 16, borderRadius: "50%",
                      border: "1px solid #334155", display: "inline-flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}
                  >?</span>
                </div>
                {tooltipId === event.id && (
                  <div style={{
                    fontSize: 11, color: "#94a3b8", lineHeight: 1.4,
                    padding: "4px 0", animation: "fadeIn 0.2s ease",
                  }}>
                    {event.desc}
                  </div>
                )}
                <span style={{
                  fontSize: 10, fontWeight: 600, color: tier.color,
                  background: tier.bg, padding: "2px 7px", borderRadius: 4,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                  {tier.label} impact
                </span>
              </div>
              <NumberInput
                min={0} max={99}
                value={values[event.id] || 0}
                onChange={(v) => setValue(event.id, v)}
                style={{
                  width: 54, textAlign: "center",
                  background: isActive ? "rgba(59,130,246,0.1)" : "rgba(15,23,42,0.6)",
                  border: isActive ? "1.5px solid rgba(59,130,246,0.3)" : "1.5px solid rgba(148,163,184,0.1)",
                  borderRadius: "8px 0 0 8px", color: isActive ? "#93c5fd" : "#94a3b8",
                  fontSize: 16, fontWeight: 600, padding: "6px 4px",
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: "none", transition: "all 0.15s",
                }}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  const active = (parseInt(e.target.value) || 0) > 0;
                  e.target.style.borderColor = active ? "rgba(59,130,246,0.3)" : "rgba(148,163,184,0.1)";
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
