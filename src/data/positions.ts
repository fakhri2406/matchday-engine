export type PositionKey = "GK" | "CB" | "LB/RB" | "LWB/RWB" | "CDM" | "CM" | "CAM" | "LM/RM" | "LW/RW" | "CF" | "ST";

export interface PositionData {
  label: string;
  group: string;
  color: string;
}

export const POSITIONS: Record<PositionKey, PositionData> = {
  GK: { label: "GK", group: "GK", color: "#f59e0b" },
  CB: { label: "CB", group: "DEF", color: "#3b82f6" },
  "LB/RB": { label: "LB / RB", group: "DEF", color: "#3b82f6" },
  "LWB/RWB": { label: "LWB / RWB", group: "DEF", color: "#3b82f6" },
  CDM: { label: "CDM", group: "MID", color: "#8b5cf6" },
  CM: { label: "CM", group: "MID", color: "#8b5cf6" },
  CAM: { label: "CAM", group: "MID", color: "#8b5cf6" },
  "LM/RM": { label: "LM / RM", group: "MID", color: "#8b5cf6" },
  "LW/RW": { label: "LW / RW", group: "FWD", color: "#ef4444" },
  CF: { label: "CF", group: "FWD", color: "#ef4444" },
  ST: { label: "ST", group: "FWD", color: "#ef4444" },
};
