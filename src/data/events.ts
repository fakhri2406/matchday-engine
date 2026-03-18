import { PositionKey } from "./positions";

export type PositionWeights = Record<PositionKey, number>;

export interface GameEvent {
  id: string;
  label: string;
  desc: string;
  base: number;
  weights: PositionWeights;
}

export const POSITIVE_EVENTS: GameEvent[] = [
  {
    id: "goals", label: "Goals Scored", desc: "Open play, set piece, or penalty goals",
    base: 0.55,
    weights: { GK: 0.7, CB: 0.7, "LB/RB": 0.65, "LWB/RWB": 0.65, CDM: 0.7, CM: 0.75, CAM: 0.9, "LM/RM": 0.8, "LW/RW": 0.9, CF: 1.0, ST: 1.0 }
  },
  {
    id: "assists", label: "Assists", desc: "Direct assist leading to a goal",
    base: 0.4,
    weights: { GK: 0.3, CB: 0.4, "LB/RB": 0.75, "LWB/RWB": 0.7, CDM: 0.55, CM: 0.75, CAM: 0.9, "LM/RM": 0.8, "LW/RW": 0.85, CF: 0.8, ST: 0.7 }
  },
  {
    id: "keyPasses", label: "Key Passes", desc: "Pass directly leading to a shot attempt",
    base: 0.15,
    weights: { GK: 0.15, CB: 0.25, "LB/RB": 0.5, "LWB/RWB": 0.5, CDM: 0.45, CM: 0.7, CAM: 0.9, "LM/RM": 0.75, "LW/RW": 0.8, CF: 0.7, ST: 0.55 }
  },
  {
    id: "bigChancesCreated", label: "Big Chances Created", desc: "Pass leading to a clear goal opportunity",
    base: 0.3,
    weights: { GK: 0.1, CB: 0.2, "LB/RB": 0.55, "LWB/RWB": 0.55, CDM: 0.4, CM: 0.7, CAM: 0.9, "LM/RM": 0.75, "LW/RW": 0.85, CF: 0.65, ST: 0.5 }
  },
  {
    id: "successfulDribbles", label: "Successful Dribbles", desc: "Beating a defender 1v1",
    base: 0.12,
    weights: { GK: 0.05, CB: 0.15, "LB/RB": 0.4, "LWB/RWB": 0.45, CDM: 0.3, CM: 0.5, CAM: 0.7, "LM/RM": 0.65, "LW/RW": 0.9, CF: 0.8, ST: 0.75 }
  },
  {
    id: "accurateCrosses", label: "Accurate Crosses", desc: "Successful cross into the box",
    base: 0.1,
    weights: { GK: 0.05, CB: 0.15, "LB/RB": 0.9, "LWB/RWB": 0.95, CDM: 0.2, CM: 0.35, CAM: 0.5, "LM/RM": 0.85, "LW/RW": 0.7, CF: 0.25, ST: 0.2 }
  },
  {
    id: "accurateLongBalls", label: "Accurate Long Balls", desc: "Successful long-range pass",
    base: 0.08,
    weights: { GK: 0.8, CB: 0.65, "LB/RB": 0.5, "LWB/RWB": 0.5, CDM: 0.6, CM: 0.65, CAM: 0.45, "LM/RM": 0.4, "LW/RW": 0.25, CF: 0.2, ST: 0.15 }
  },
  {
    id: "passCompBonus", label: "Pass Completion % Bonus", desc: "Ticks if pass accuracy >85% (enter 1 for yes, 0 for no)",
    base: 0.25,
    weights: { GK: 0.4, CB: 0.7, "LB/RB": 0.5, "LWB/RWB": 0.5, CDM: 0.65, CM: 0.8, CAM: 0.6, "LM/RM": 0.45, "LW/RW": 0.3, CF: 0.25, ST: 0.2 }
  },
  {
    id: "tacklesWon", label: "Tackles Won", desc: "Successful tackle winning possession",
    base: 0.12,
    weights: { GK: 0.1, CB: 0.75, "LB/RB": 0.7, "LWB/RWB": 0.65, CDM: 0.9, CM: 0.65, CAM: 0.35, "LM/RM": 0.4, "LW/RW": 0.25, CF: 0.2, ST: 0.15 }
  },
  {
    id: "interceptions", label: "Interceptions", desc: "Reading and cutting out a pass",
    base: 0.12,
    weights: { GK: 0.15, CB: 0.85, "LB/RB": 0.75, "LWB/RWB": 0.7, CDM: 0.85, CM: 0.6, CAM: 0.3, "LM/RM": 0.35, "LW/RW": 0.2, CF: 0.15, ST: 0.1 }
  },
  {
    id: "clearances", label: "Clearances", desc: "Clearing the ball from danger",
    base: 0.07,
    weights: { GK: 0.5, CB: 0.85, "LB/RB": 0.7, "LWB/RWB": 0.6, CDM: 0.5, CM: 0.3, CAM: 0.1, "LM/RM": 0.15, "LW/RW": 0.05, CF: 0.05, ST: 0.05 }
  },
  {
    id: "blocks", label: "Blocks", desc: "Blocking a shot or cross",
    base: 0.12,
    weights: { GK: 0.2, CB: 0.85, "LB/RB": 0.65, "LWB/RWB": 0.55, CDM: 0.7, CM: 0.4, CAM: 0.15, "LM/RM": 0.2, "LW/RW": 0.1, CF: 0.1, ST: 0.05 }
  },
  {
    id: "aerialDuelsWon", label: "Aerial Duels Won", desc: "Winning a header contest",
    base: 0.08,
    weights: { GK: 0.15, CB: 0.85, "LB/RB": 0.4, "LWB/RWB": 0.35, CDM: 0.55, CM: 0.45, CAM: 0.25, "LM/RM": 0.25, "LW/RW": 0.2, CF: 0.6, ST: 0.8 }
  },
  {
    id: "groundDuelsWon", label: "Ground Duels Won", desc: "Winning a ground challenge",
    base: 0.06,
    weights: { GK: 0.05, CB: 0.55, "LB/RB": 0.5, "LWB/RWB": 0.5, CDM: 0.65, CM: 0.7, CAM: 0.45, "LM/RM": 0.5, "LW/RW": 0.45, CF: 0.4, ST: 0.35 }
  },
  {
    id: "lastManTackle", label: "Last-Man Tackle / Clearance", desc: "Preventing a clear goal as last defender (no foul)",
    base: 0.4,
    weights: { GK: 0.3, CB: 1.0, "LB/RB": 0.85, "LWB/RWB": 0.8, CDM: 0.7, CM: 0.45, CAM: 0.2, "LM/RM": 0.25, "LW/RW": 0.15, CF: 0.1, ST: 0.1 }
  },
  {
    id: "cleanSheet", label: "Clean Sheet Contribution", desc: "Team kept a clean sheet (enter 1 for yes)",
    base: 0.45,
    weights: { GK: 1.0, CB: 0.85, "LB/RB": 0.65, "LWB/RWB": 0.6, CDM: 0.5, CM: 0.25, CAM: 0.1, "LM/RM": 0.1, "LW/RW": 0.05, CF: 0.05, ST: 0.05 }
  },
  {
    id: "saves", label: "Saves (routine)", desc: "Standard GK save",
    base: 0.12,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
  {
    id: "divingSaves", label: "Diving / Difficult Saves", desc: "Spectacular or reflex save",
    base: 0.25,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
  {
    id: "penaltySave", label: "Penalty Save", desc: "Saving a penalty kick",
    base: 0.7,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
  {
    id: "highClaim", label: "High Claim / Punch", desc: "GK commanding the box aerially",
    base: 0.08,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
  {
    id: "sweeperAction", label: "Sweeper Keeper Action", desc: "GK clearance outside the box",
    base: 0.12,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
  {
    id: "shotsOnTarget", label: "Shots on Target", desc: "Shot that forces a save or scores",
    base: 0.1,
    weights: { GK: 0.05, CB: 0.2, "LB/RB": 0.25, "LWB/RWB": 0.3, CDM: 0.3, CM: 0.45, CAM: 0.8, "LM/RM": 0.6, "LW/RW": 0.75, CF: 0.85, ST: 0.9 }
  },
  {
    id: "chanceConversion", label: "Chance Conversion Bonus", desc: "Scored on >30% of shots (enter 1 for yes)",
    base: 0.25,
    weights: { GK: 0, CB: 0.1, "LB/RB": 0.1, "LWB/RWB": 0.15, CDM: 0.2, CM: 0.3, CAM: 0.55, "LM/RM": 0.4, "LW/RW": 0.6, CF: 0.85, ST: 0.9 }
  },
  {
    id: "progressiveCarries", label: "Progressive Carries", desc: "Carrying ball forward ≥10 yards toward goal",
    base: 0.06,
    weights: { GK: 0.05, CB: 0.25, "LB/RB": 0.65, "LWB/RWB": 0.65, CDM: 0.4, CM: 0.7, CAM: 0.6, "LM/RM": 0.6, "LW/RW": 0.75, CF: 0.5, ST: 0.35 }
  },
  {
    id: "progressivePasses", label: "Progressive Passes", desc: "Forward pass gaining significant yardage",
    base: 0.06,
    weights: { GK: 0.35, CB: 0.65, "LB/RB": 0.5, "LWB/RWB": 0.5, CDM: 0.6, CM: 0.75, CAM: 0.6, "LM/RM": 0.5, "LW/RW": 0.35, CF: 0.3, ST: 0.2 }
  },
  {
    id: "recoveries", label: "Recoveries", desc: "Winning back a loose ball",
    base: 0.05,
    weights: { GK: 0.15, CB: 0.5, "LB/RB": 0.5, "LWB/RWB": 0.5, CDM: 0.7, CM: 0.75, CAM: 0.4, "LM/RM": 0.5, "LW/RW": 0.3, CF: 0.25, ST: 0.2 }
  },
];

export const NEGATIVE_EVENTS: GameEvent[] = [
  {
    id: "ownGoals", label: "Own Goals", desc: "Scoring in own net",
    base: -0.75,
    weights: { GK: 0.8, CB: 1.0, "LB/RB": 0.9, "LWB/RWB": 0.9, CDM: 0.85, CM: 0.8, CAM: 0.75, "LM/RM": 0.75, "LW/RW": 0.7, CF: 0.7, ST: 0.7 }
  },
  {
    id: "errorsToGoal", label: "Errors Leading to Goal", desc: "Direct mistake causing an opponent goal",
    base: -0.7,
    weights: { GK: 1.0, CB: 1.0, "LB/RB": 0.85, "LWB/RWB": 0.85, CDM: 0.8, CM: 0.6, CAM: 0.4, "LM/RM": 0.4, "LW/RW": 0.3, CF: 0.25, ST: 0.2 }
  },
  {
    id: "errorsToShot", label: "Errors Leading to Shot", desc: "Mistake leading to opponent shot on goal",
    base: -0.3,
    weights: { GK: 0.9, CB: 0.85, "LB/RB": 0.75, "LWB/RWB": 0.75, CDM: 0.8, CM: 0.55, CAM: 0.3, "LM/RM": 0.35, "LW/RW": 0.2, CF: 0.15, ST: 0.15 }
  },
  {
    id: "penaltyConceded", label: "Penalty Conceded", desc: "Fouling inside the penalty box",
    base: -0.6,
    weights: { GK: 0.6, CB: 1.0, "LB/RB": 0.9, "LWB/RWB": 0.85, CDM: 0.75, CM: 0.5, CAM: 0.35, "LM/RM": 0.35, "LW/RW": 0.25, CF: 0.2, ST: 0.2 }
  },
  {
    id: "yellowCard", label: "Yellow Card", desc: "Caution from the referee",
    base: -0.2,
    weights: { GK: 0.6, CB: 0.7, "LB/RB": 0.7, "LWB/RWB": 0.65, CDM: 0.7, CM: 0.65, CAM: 0.6, "LM/RM": 0.6, "LW/RW": 0.6, CF: 0.6, ST: 0.6 }
  },
  {
    id: "redCard", label: "Red Card", desc: "Sent off — enter 1 if received",
    base: -1.0,
    weights: { GK: 0.9, CB: 0.9, "LB/RB": 0.85, "LWB/RWB": 0.85, CDM: 0.85, CM: 0.85, CAM: 0.8, "LM/RM": 0.8, "LW/RW": 0.8, CF: 0.8, ST: 0.8 }
  },
  {
    id: "foulsCommitted", label: "Fouls Committed", desc: "Giving away a free kick",
    base: -0.06,
    weights: { GK: 0.4, CB: 0.7, "LB/RB": 0.65, "LWB/RWB": 0.6, CDM: 0.8, CM: 0.55, CAM: 0.35, "LM/RM": 0.4, "LW/RW": 0.3, CF: 0.3, ST: 0.3 }
  },
  {
    id: "dispossessed", label: "Dispossessed", desc: "Losing the ball under pressure",
    base: -0.08,
    weights: { GK: 0.3, CB: 0.55, "LB/RB": 0.45, "LWB/RWB": 0.45, CDM: 0.55, CM: 0.6, CAM: 0.7, "LM/RM": 0.6, "LW/RW": 0.65, CF: 0.7, ST: 0.65 }
  },
  {
    id: "badTouch", label: "Bad Touch", desc: "Failing to control the ball cleanly",
    base: -0.06,
    weights: { GK: 0.4, CB: 0.5, "LB/RB": 0.4, "LWB/RWB": 0.4, CDM: 0.55, CM: 0.65, CAM: 0.7, "LM/RM": 0.6, "LW/RW": 0.6, CF: 0.65, ST: 0.55 }
  },
  {
    id: "unsuccessfulDribbles", label: "Unsuccessful Dribbles", desc: "Failed take-on attempt",
    base: -0.08,
    weights: { GK: 0.1, CB: 0.3, "LB/RB": 0.35, "LWB/RWB": 0.4, CDM: 0.35, CM: 0.45, CAM: 0.7, "LM/RM": 0.55, "LW/RW": 0.65, CF: 0.6, ST: 0.55 }
  },
  {
    id: "missedBigChance", label: "Missed Big Chance", desc: "Missing a clear goal opportunity",
    base: -0.35,
    weights: { GK: 0.05, CB: 0.2, "LB/RB": 0.25, "LWB/RWB": 0.3, CDM: 0.3, CM: 0.4, CAM: 0.65, "LM/RM": 0.5, "LW/RW": 0.75, CF: 0.9, ST: 1.0 }
  },
  {
    id: "offsides", label: "Offsides", desc: "Caught in an offside position",
    base: -0.08,
    weights: { GK: 0, CB: 0.05, "LB/RB": 0.1, "LWB/RWB": 0.15, CDM: 0.15, CM: 0.2, CAM: 0.35, "LM/RM": 0.3, "LW/RW": 0.5, CF: 0.8, ST: 0.9 }
  },
  {
    id: "missedPenalty", label: "Missed Penalty", desc: "Missing from the penalty spot",
    base: -0.55,
    weights: { GK: 0.5, CB: 0.7, "LB/RB": 0.7, "LWB/RWB": 0.7, CDM: 0.7, CM: 0.75, CAM: 0.8, "LM/RM": 0.75, "LW/RW": 0.8, CF: 0.9, ST: 0.95 }
  },
  {
    id: "tacklesLost", label: "Tackles Lost", desc: "Failed tackle attempt",
    base: -0.08,
    weights: { GK: 0.2, CB: 0.8, "LB/RB": 0.75, "LWB/RWB": 0.65, CDM: 0.8, CM: 0.55, CAM: 0.3, "LM/RM": 0.35, "LW/RW": 0.2, CF: 0.15, ST: 0.1 }
  },
  {
    id: "aerialDuelsLost", label: "Aerial Duels Lost", desc: "Losing a header contest",
    base: -0.05,
    weights: { GK: 0.3, CB: 0.75, "LB/RB": 0.4, "LWB/RWB": 0.35, CDM: 0.5, CM: 0.4, CAM: 0.2, "LM/RM": 0.2, "LW/RW": 0.15, CF: 0.45, ST: 0.65 }
  },
  {
    id: "goalsConceded", label: "GK Goals Conceded", desc: "Goals let in by goalkeeper",
    base: -0.25,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
  {
    id: "parryToDanger", label: "GK Parry to Danger", desc: "Parrying the ball into a dangerous area",
    base: -0.2,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
  {
    id: "poorDistribution", label: "GK Poor Distribution", desc: "Bad pass or kick from GK",
    base: -0.12,
    weights: { GK: 1.0, CB: 0, "LB/RB": 0, "LWB/RWB": 0, CDM: 0, CM: 0, CAM: 0, "LM/RM": 0, "LW/RW": 0, CF: 0, ST: 0 }
  },
];

export const ALL_EVENTS: GameEvent[] = [...POSITIVE_EVENTS, ...NEGATIVE_EVENTS];
