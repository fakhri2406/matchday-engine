export interface ImpactTier {
  label: string;
  color: string;
  bg: string;
}

export function getImpactTier(w: number): ImpactTier {
  if (w >= 0.8) return {label: "High", color: "#22c55e", bg: "rgba(34,197,94,0.12)"};
  if (w >= 0.5) return {label: "Med", color: "#eab308", bg: "rgba(234,179,8,0.10)"};
  if (w >= 0.25) return {label: "Low", color: "#f97316", bg: "rgba(249,115,22,0.10)"};
  return {label: "Min", color: "#6b7280", bg: "rgba(107,114,128,0.08)"};
}

export function getRatingColor(r: number): string {
  if (r >= 9.0) return "#3b82f6";
  if (r >= 8.0) return "#22c55e";
  if (r >= 7.0) return "#86efac";
  if (r >= 6.0) return "#eab308";
  if (r >= 4.0) return "#f97316";
  return "#ef4444";
}

export function getRatingLabel(r: number): string {
  if (r >= 9.0) return "Man of the Match";
  if (r >= 8.0) return "Excellent";
  if (r >= 7.0) return "Good";
  if (r >= 6.0) return "Average";
  if (r >= 4.0) return "Below Average";
  return "Poor";
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
