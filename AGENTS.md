# vibe-cost-sim

A cost simulation tool for AI-powered applications built with React + Vite.

## Overview

Calculates and visualizes monthly/yearly costs of running an AI service, broken down into:

1. **Model API Costs** - Subscription plan (plan cost, credits per plan, credits per request)
2. **Infrastructure/Hosting Costs** - EC2 instances (spot vs on-demand, hourly rate, number of instances)

## Tech Stack

- React 19 + Vite
- MUI (Material-UI) v6
- MUI X Charts v7

## Project Structure

```
src/
├── App.jsx              # Main app layout
├── components/
│   ├── Header.jsx       # App header with theme toggle
│   ├── ControlPanel.jsx # Parameter sliders (Usage, Hosting, Model Plan)
│   ├── DonutChart.jsx   # Cost breakdown visualization
│   ├── BreakdownTable.jsx # Detailed cost breakdown
│   └── Assumptions.jsx  # Assumptions display
├── hooks/
│   └── useCostCalculator.js # Core calculation logic
├── theme.js             # MUI theme configuration
└── main.jsx             # Entry point
```

## Key Parameters

- **Usage**: users, requests/session, sessions/day, session duration
- **Hosting**: spot/on-demand, hourly rate, on-demand multiplier, instances/machine
- **Model Plan**: plan cost, credits/plan, credits per request

## Deployment

Deploys to GitHub Pages via `gh-pages` branch.

- Base path: `/vibe-cost-sim/` (set in `vite.config.js`)

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
