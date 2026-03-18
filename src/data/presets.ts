import {PositionKey} from "./positions";

export interface Preset {
  name: string;
  icon: string;
  position: PositionKey;
  minutes: number;
  desc: string;
  values: Record<string, number>;
}

export const PRESETS: Preset[] = [
  {
    name: "Messi-type Masterclass",
    icon: "⚡",
    position: "CF",
    minutes: 90,
    desc: "2 goals, 1 assist, dribble king",
    values: {
      goals: 2, assists: 1, keyPasses: 4, bigChancesCreated: 1, successfulDribbles: 6,
      accurateCrosses: 0, accurateLongBalls: 1, passCompBonus: 1, tacklesWon: 0,
      interceptions: 0, clearances: 0, blocks: 0, aerialDuelsWon: 0, groundDuelsWon: 4,
      lastManTackle: 0, cleanSheet: 0, saves: 0, divingSaves: 0, penaltySave: 0,
      highClaim: 0, sweeperAction: 0, shotsOnTarget: 5, chanceConversion: 1,
      progressiveCarries: 8, progressivePasses: 3, recoveries: 2,
      ownGoals: 0, errorsToGoal: 0, errorsToShot: 0, penaltyConceded: 0,
      yellowCard: 0, redCard: 0, foulsCommitted: 1, dispossessed: 3,
      badTouch: 1, unsuccessfulDribbles: 2, missedBigChance: 0, offsides: 1,
      missedPenalty: 0, tacklesLost: 0, aerialDuelsLost: 2, goalsConceded: 0,
      parryToDanger: 0, poorDistribution: 0,
    },
  },
  {
    name: "Solid CB Clean Sheet",
    icon: "🛡️",
    position: "CB",
    minutes: 90,
    desc: "Dominant at the back, no goals conceded",
    values: {
      goals: 0, assists: 0, keyPasses: 0, bigChancesCreated: 0, successfulDribbles: 0,
      accurateCrosses: 0, accurateLongBalls: 3, passCompBonus: 1, tacklesWon: 4,
      interceptions: 5, clearances: 7, blocks: 2, aerialDuelsWon: 6, groundDuelsWon: 3,
      lastManTackle: 1, cleanSheet: 1, saves: 0, divingSaves: 0, penaltySave: 0,
      highClaim: 0, sweeperAction: 0, shotsOnTarget: 0, chanceConversion: 0,
      progressiveCarries: 2, progressivePasses: 5, recoveries: 4,
      ownGoals: 0, errorsToGoal: 0, errorsToShot: 0, penaltyConceded: 0,
      yellowCard: 1, redCard: 0, foulsCommitted: 2, dispossessed: 0,
      badTouch: 0, unsuccessfulDribbles: 0, missedBigChance: 0, offsides: 0,
      missedPenalty: 0, tacklesLost: 1, aerialDuelsLost: 1, goalsConceded: 0,
      parryToDanger: 0, poorDistribution: 0,
    },
  },
  {
    name: "GK Penalty Hero",
    icon: "🧤",
    position: "GK",
    minutes: 90,
    desc: "Penalty save + crucial stops",
    values: {
      goals: 0, assists: 0, keyPasses: 0, bigChancesCreated: 0, successfulDribbles: 0,
      accurateCrosses: 0, accurateLongBalls: 4, passCompBonus: 1, tacklesWon: 0,
      interceptions: 0, clearances: 1, blocks: 0, aerialDuelsWon: 0, groundDuelsWon: 0,
      lastManTackle: 0, cleanSheet: 1, saves: 4, divingSaves: 2, penaltySave: 1,
      highClaim: 2, sweeperAction: 1, shotsOnTarget: 0, chanceConversion: 0,
      progressiveCarries: 0, progressivePasses: 0, recoveries: 0,
      ownGoals: 0, errorsToGoal: 0, errorsToShot: 0, penaltyConceded: 0,
      yellowCard: 0, redCard: 0, foulsCommitted: 0, dispossessed: 0,
      badTouch: 0, unsuccessfulDribbles: 0, missedBigChance: 0, offsides: 0,
      missedPenalty: 0, tacklesLost: 0, aerialDuelsLost: 0, goalsConceded: 0,
      parryToDanger: 0, poorDistribution: 1,
    },
  },
];
