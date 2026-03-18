const LEGEND_ITEMS = [
  {range: "1.0–3.9", color: "#ef4444", label: "Poor"},
  {range: "4.0–5.9", color: "#f97316", label: "Below Avg"},
  {range: "6.0–6.9", color: "#eab308", label: "Average"},
  {range: "7.0–7.9", color: "#86efac", label: "Good"},
  {range: "8.0–8.9", color: "#22c55e", label: "Excellent"},
  {range: "9.0–10", color: "#3b82f6", label: "MOTM"},
];

export function ColorLegend() {
  return (
    <div style={{
      marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center",
    }}>
      {LEGEND_ITEMS.map(l => (
        <div key={l.range} style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 11, color: "#94a3b8",
        }}>
          <div style={{width: 10, height: 10, borderRadius: 3, background: l.color}}/>
          <span>{l.range}</span>
        </div>
      ))}
    </div>
  );
}
