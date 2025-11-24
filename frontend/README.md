# ORAC Trading Dashboard - Frontend

A Next.js-based trading dashboard with multi-timeframe trend analysis.

## Features

- Real-time stock price charts
- Multi-timeframe bias matrix (15min, 1hour, 4hour, 1day, 1week)
- Technical indicators (EMA, RSI, MACD, Supertrend, ADX)
- Interactive candlestick charts
- Symbol search and selection

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.vercel.app
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

This app is optimized for Vercel deployment. The backend API needs to be deployed separately.

### Important: Backend API

The frontend expects a backend API running. Update `NEXT_PUBLIC_API_URL` in your Vercel environment variables to point to your deployed backend.

For local development without backend:
- The app will show connection errors but mock data can be added
- Backend should be running at `http://localhost:3001`
