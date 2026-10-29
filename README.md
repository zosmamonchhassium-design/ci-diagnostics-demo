# Pulse Telemetry Dashboard

A modern, responsive React + TypeScript dashboard designed for monitoring service fleet telemetry, system uptime, and operational events.

## Prerequisites

- **Node.js**: `^20.19.0 || >=22.12.0` (Local testing verified on Node 22)
- **npm**: `10.x` or later (strict engine verification is enabled via `.npmrc`)

## Getting Started

### 1. Install Dependencies

Install the pinned project dependencies:

```bash
npm install
```

### 2. Local Development

Start the local Vite development server:

```bash
npm run dev
```

Open your browser to [http://localhost:5173](http://localhost:5173). In development mode, the dashboard provides a default fallback label (`Local Dev Preview`) for the reporting badge.

## Build Configuration

For production builds, the environment requires an explicit report label supplied via the process environment:

- **Variable**: `VITE_PUBLIC_REPORT_LABEL`
- **Requirement**: Must be a non-empty string (whitespace-only values are rejected).
- **Usage**: Used by Vite during bundle creation to stamp the production report label into the UI.

Example export:

```bash
export VITE_PUBLIC_REPORT_LABEL="Production Metrics Fleet"
```

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite development server with hot module replacement (HMR). |
| `npm run verify:config` | Verifies that all required build environment variables (`VITE_PUBLIC_REPORT_LABEL`) are defined. |
| `npm run typecheck` | Runs TypeScript compiler checks without emitting code (`tsc --noEmit`). |
| `npm run build` | Full production build: verifies configuration, checks TypeScript types, and creates bundle in `dist/`. |
| `npm run preview` | Locally serves the built production assets from `dist/`. |

## Continuous Integration

The repository uses GitHub Actions (`.github/workflows/ci.yml`) to validate incoming pull requests and merges to `main`. The pipeline runs dependency installation with strict engine enforcement (`npm ci`), verifies build configuration, executes TypeScript type-checking, and generates the production dashboard bundle.
