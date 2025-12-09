# ORAC Trading Dashboard

A modern, real-time trading dashboard featuring multi-timeframe trend analysis using technical indicators. Built with Next.js, Node.js, Express, and integrated with Alpha Vantage API.

![Trading Dashboard](screenshot.png)

## 🚀 Features

- **Real-time Price Charts**: Interactive candlestick charts with lightweight-charts
- **Multi-Timeframe Analysis**: Analyze trends across 15min, 1H, 4H, 1D, and 1W timeframes
- **Technical Indicators**:
  - EMA (Exponential Moving Average) with slope analysis
  - RSI (Relative Strength Index) with momentum
  - MACD (Moving Average Convergence Divergence) histogram
  - Supertrend indicator
  - ADX (Average Directional Index) for confidence
- **Aggregate Bias Calculation**: Weighted scoring system from -100 (bearish) to +100 (bullish)
- **Confidence Grading**: A+ to F grading based on trend strength
- **Symbol Search**: Quick search and selection of trading symbols
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lightweight Charts**: High-performance charting library
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **TypeScript**: Type-safe backend development
- **Alpha Vantage API**: Market data provider
- **Node-Cache**: In-memory caching layer
- **CORS**: Cross-origin resource sharing

## 🛠️ Installation

### Prerequisites
- Node.js 18+ installed
- Alpha Vantage API key (get free at https://www.alphavantage.co/support/#api-key)

### Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Create `.env` file:
```powershell
Copy-Item .env.example .env
```

4. Edit `.env` and add your Alpha Vantage API key:
```
ALPHA_VANTAGE_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

5. Start the backend server:
```powershell
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Create `.env.local` file:
```powershell
Copy-Item .env.local.example .env.local
```

4. Edit `.env.local` (default should work if backend is on port 3001):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

5. Start the frontend development server:
```powershell
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📖 Usage

1. **Start both servers** (backend and frontend)
2. **Open your browser** to `http://localhost:3000`
3. **Search for a symbol** using the search bar (e.g., IBM, AAPL, GOOGL)
4. **View the analysis**:
   - Interactive price chart at the top
   - Multi-timeframe bias matrix below
   - Overall aggregate bias with grade
5. **Click Refresh** to update data

## 📊 Understanding the Dashboard

### Bias Matrix

The bias matrix shows analysis across multiple timeframes:

- **Score**: -100 (strong bearish) to +100 (strong bullish)
- **Confidence**: Based on ADX, shows trend strength
- **Color Coding**:
  - 🟢 Green: Bullish signals
  - 🔴 Red: Bearish signals
  - ⚫ Gray: Neutral/weak signals

### Technical Indicators

1. **EMA Slope**: Direction and strength of the 50-period EMA
2. **RSI**: Relative Strength Index (oversold <30, overbought >70)
3. **MACD**: Histogram showing momentum
4. **Supertrend**: Trend direction indicator

### Aggregate Bias

Combines all timeframes with weighted scoring:
- 15min: 0.5x weight
- 1 hour: 1.0x weight
- 4 hour: 1.5x weight
- 1 day: 2.0x weight
- 1 week: 2.5x weight

## 🔧 API Endpoints

### Backend API

- `POST /api/analysis` - Get multi-timeframe analysis
  ```json
  {
    "symbol": "IBM",
    "timeframes": ["15min", "1hour", "4hour", "1day", "1week"]
  }
  ```

- `GET /api/chart/:symbol?interval=15min` - Get chart data
- `GET /api/symbols/search?query=ibm` - Search symbols
- `GET /api/health` - Health check

## 🎨 Customization

### Modify Timeframes

Edit `frontend/src/app/page.tsx`:
```typescript
const defaultTimeframes = ['15min', '1hour', '4hour', '1day', '1week'];
```

### Adjust Indicator Weights

Edit `backend/src/services/marketDataService.ts`:
```typescript
const weights = {
  ema: 0.3,
  rsi: 0.2,
  macd: 0.25,
  supertrend: 0.25
};
```

### Change Chart Colors

Edit `frontend/src/components/TradingChart.tsx`:
```typescript
upColor: '#26a69a',    // Bullish candles
downColor: '#ef5350',   // Bearish candles
```

## 📝 Project Structure

```
orac_trading/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   ├── types/           # TypeScript types
│   │   ├── routes/          # API routes
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities & API client
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── tsconfig.json
└── multi_timeframe_trend_matrix.md  # Original plan
```

## ⚠️ Important Notes

1. **API Rate Limits**: The free Alpha Vantage API key has rate limits (5 calls/minute, 100 calls/day for demo key)
2. **Demo Key**: Replace the demo API key with your own for production use
3. **Caching**: The backend implements 5-minute caching to reduce API calls
4. **Data Accuracy**: Historical data may have limitations with the free tier

## 🚀 Production Deployment

### Backend Deployment

1. Build the TypeScript code:
```powershell
npm run build
```

2. Start production server:
```powershell
npm start
```

### Frontend Deployment

1. Build the Next.js application:
```powershell
npm run build
```

2. Start production server:
```powershell
npm start
```

Or deploy to Vercel/Netlify for automatic deployment.

## 🐛 Troubleshooting

### Backend Issues

- **API Key Error**: Ensure `.env` file exists with valid `ALPHA_VANTAGE_API_KEY`
- **CORS Error**: Check that CORS is enabled in backend
- **Port Conflict**: Change `PORT` in `.env` if 3001 is in use

### Frontend Issues

- **Connection Error**: Verify backend is running on correct port
- **Chart Not Displaying**: Check console for errors, ensure data is being fetched
- **TypeScript Errors**: Run `npm install` to ensure all dependencies are installed

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check Alpha Vantage documentation: https://www.alphavantage.co/documentation/

## 🙏 Acknowledgments

- Alpha Vantage for providing market data API
- TradingView for design inspiration
- The open-source community for amazing tools and libraries

---

**Built with ❤️ for traders by traders**
