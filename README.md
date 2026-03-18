# Matchday Engine

A football player match rating calculator that computes detailed **1.0–10.0** performance ratings based on position-weighted game events, with optional AI-powered natural language analysis.

## Features

- **Position-Aware Ratings** — 11 positions across GK, DEF, MID, and FWD groups, each with unique event weightings
- **44 Game Events** — 26 positive and 18 negative events covering offensive, defensive, passing, discipline, and goalkeeper-specific actions
- **Real-Time Calculation** — ratings update instantly as you adjust events and minutes played
- **AI Analysis** — describe a player's performance in natural language and let Claude extract structured match data automatically
- **Presets** — quick-load iconic performance profiles (Messi-type Masterclass, Solid CB Clean Sheet, GK Penalty Hero)
- **Rating Breakdown** — collapsible view showing each event's weighted contribution to the final score
- **Impact Tiers** — visual indicators (High / Medium / Low / Minimal) showing how much each event matters for the selected position

## How the Rating Works

1. **Base rating** starts at **6.0**
2. **Minutes scaling** adjusts the base: `base × (minutes / 90) × 1.8`, clamped to a 0–1 ratio
3. **Event contributions** are summed: `count × base_impact × position_weight` for each event
4. **Final rating** = base + contributions, clamped to **1.0–10.0**

### Rating Scale

| Range | Label | Color |
|-------|-------|-------|
| 9.0–10.0 | Man of the Match | Blue |
| 8.0–8.9 | Excellent | Green |
| 7.0–7.9 | Good | Light Green |
| 6.0–6.9 | Average | Yellow |
| 4.0–5.9 | Below Average | Orange |
| 1.0–3.9 | Poor | Red |

## Positions

| Group | Positions |
|-------|-----------|
| GK | Goalkeeper |
| DEF | CB, LB/RB, LWB/RWB |
| MID | CDM, CM, CAM, LM/RM |
| FWD | LW/RW, CF, ST |

## Tech Stack

- **Next.js 16** — App Router, Turbopack, React Compiler
- **React 19**
- **TypeScript** — strict mode
- **Tailwind CSS 4** — with inline styles for components
- **Anthropic Claude API** — AI-powered performance analysis

## Try It Out

Currently, the app is deployed on Vercel and is available at [https://matchday-engine.vercel.app/](https://matchday-engine.vercel.app/). You can also clone the repo and run it locally with `npm run dev`.
