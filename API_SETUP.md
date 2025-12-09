# API Setup Guide

## Current Status
The application is currently using **mock data** to display charts and the bias matrix. This allows you to see the dashboard working immediately without API limits.

## Getting Real Market Data

### Option 1: Twelve Data (Recommended - More Generous Free Tier)

**Free Tier Benefits:**
- 800 API requests per day
- Real-time and historical data
- Multiple timeframes supported
- Easy to use

**Setup Steps:**
1. Visit https://twelvedata.com/apikey
2. Sign up for a free account
3. Copy your API key
4. Open `backend/.env` file
5. Replace `TWELVE_DATA_API_KEY=demo` with `TWELVE_DATA_API_KEY=your_actual_key_here`
6. Restart the servers: `npm run dev`

### Option 2: Alternative Free APIs

#### Polygon.io
- Free tier: 5 API calls/minute
- Sign up: https://polygon.io/
- Good for US stock market data
- Update the service file to use Polygon endpoints

#### Finnhub
- Free tier: 60 API calls/minute
- Sign up: https://finnhub.io/
- Supports global markets
- Good documentation

#### IEX Cloud
- Free tier: 50,000 API calls/month
- Sign up: https://iexcloud.io/
- US markets focused
- Easy integration

## How the Mock Data Works

When the API fails or rate limits are hit, the application automatically generates realistic mock data:
- Simulates price movements (OHLCV data)
- Creates technical indicators
- Displays the bias matrix
- Shows charts with candlestick patterns

This ensures the dashboard is always functional for demonstration and testing purposes.

## Switching APIs

To use a different API provider:

1. Create a new service file in `backend/src/services/` (e.g., `polygonService.ts`)
2. Implement the same methods: `getIntradayData()`, `getDailyData()`, `getWeeklyData()`
3. Transform the API response to match the expected format
4. Update `marketDataService.ts` to use your new service
5. Add your API key to `.env`

## Troubleshooting

**No data showing:**
- Check browser console for errors (F12)
- Check backend logs in terminal
- Verify API key is correct in `.env`
- Ensure servers are running (`npm run dev`)

**Rate limit errors:**
- Wait for the rate limit to reset (usually 1 minute)
- The app will automatically fall back to mock data
- Consider upgrading to a paid API plan for production use

**Chart not displaying:**
- Ensure the symbol exists (try AAPL, IBM, MSFT)
- Check that data is being returned in backend logs
- Verify frontend is connecting to backend at http://localhost:3001
