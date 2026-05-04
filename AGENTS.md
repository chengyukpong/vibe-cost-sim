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

Deploys to GitHub Pages by committing the `docs/` folder directly on `main`.

**Publish workflow:**
1. `npm run build`
2. Commit and push (including `docs/`)
3. GitHub Pages serves from `docs/` (configured in repo Settings → Pages)

**Key config:**
- `base: './'` in `vite.config.js` — uses relative asset paths so `docs/` works when served from any subfolder
- `build.outDir: 'docs'` in `vite.config.js` — outputs build to `docs/` instead of `dist/`
- `.gitignore` must NOT include `docs`
- `.gitignore` uses `/assets` (root-level only) to ignore stray build artifacts without blocking `docs/assets/`

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
