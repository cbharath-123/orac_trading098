# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Setup (One-time)
```powershell
# Run setup script
.\setup.ps1
```

This will:
- Install all backend dependencies
- Install all frontend dependencies
- Set up configuration files

### Step 2: Configure API Key
1. Get a free API key from Alpha Vantage: https://www.alphavantage.co/support/#api-key
2. Open `backend\.env` in a text editor
3. Replace `demo` with your API key:
   ```
   ALPHA_VANTAGE_API_KEY=YOUR_KEY_HERE
   PORT=3001
   NODE_ENV=development
   ```

### Step 3: Start the Application
```powershell
# Run start script
.\start.ps1
```

This will:
- Start the backend server on http://localhost:3001
- Start the frontend app on http://localhost:3000
- Open two terminal windows

**OR** start manually:

Terminal 1 (Backend):
```powershell
cd backend
npm run dev
```

Terminal 2 (Frontend):
```powershell
cd frontend
npm run dev
```

## 📱 Using the Dashboard

1. **Open your browser** to http://localhost:3000
2. **Search for a symbol** (try: IBM, AAPL, MSFT, GOOGL)
3. **View the analysis**:
   - Real-time price chart at the top
   - Multi-timeframe bias matrix below
4. **Click Refresh** to update data

## 🎯 Features Overview

### Multi-Timeframe Analysis
- **15 minutes**: Short-term scalping signals
- **1 hour**: Intraday trading signals
- **4 hours**: Swing trading signals
- **1 day**: Position trading signals
- **1 week**: Long-term trend analysis

### Technical Indicators
- **EMA (50)**: Trend direction and slope
- **RSI (14)**: Momentum and overbought/oversold levels
- **MACD**: Convergence/divergence and momentum
- **Supertrend**: Trend direction with support/resistance
- **ADX (14)**: Trend strength and confidence

### Scoring System
- **+100**: Maximum bullish signal
- **0**: Neutral (no clear trend)
- **-100**: Maximum bearish signal

### Confidence Levels
- **High (ADX > 40)**: Strong trend, high reliability
- **Medium (ADX 25-40)**: Moderate trend
- **Low (ADX < 25)**: Weak or no trend

## ⚡ Quick Tips

1. **Use multiple timeframes**: Higher timeframe trends are more reliable
2. **Check confidence**: High ADX means stronger trend signals
3. **Look for alignment**: When multiple timeframes agree, signals are stronger
4. **Watch for divergence**: When timeframes disagree, trend may be weakening
5. **Refresh regularly**: Market data updates frequently

## 🔧 Customization

### Change Timeframes
Edit `frontend/src/app/page.tsx`:
```typescript
const defaultTimeframes = ['15min', '1hour', '4hour', '1day', '1week'];
```

### Adjust Chart Interval
Edit the `interval` parameter in API calls (default: '15min')

### Modify Color Theme
Edit `frontend/src/app/globals.css` for color scheme changes

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Make sure backend server is running on port 3001
- Check `backend/.env` file exists with valid API key
- Verify `frontend/.env.local` has correct API URL

### "API rate limit exceeded"
- Free Alpha Vantage key: 5 calls/minute, 100/day
- Backend implements 5-minute caching to reduce calls
- Upgrade to premium API key for higher limits

### "Chart not loading"
- Check browser console for errors
- Ensure symbol exists and has data
- Try refreshing the page

### TypeScript/Build Errors
```powershell
# In backend or frontend directory
npm install
npm run build
```

## 📊 Understanding the Display

### Bias Colors
- 🟢 **Green**: Bullish (positive values)
- 🔴 **Red**: Bearish (negative values)
- ⚫ **Gray**: Neutral (near zero)

### Grade System
- **A+ / A**: Very strong trend (score > 70)
- **B+ / B**: Strong trend (score 50-70)
- **C+ / C**: Moderate trend (score 30-50)
- **D**: Weak trend (score 20-30)
- **F**: No clear trend (score < 20)

## 💡 Trading Strategy Tips

⚠️ **Disclaimer**: This tool is for educational purposes only. Not financial advice.

### Bullish Strategy
When aggregate bias is **strongly bullish (+60 or higher)**:
- Look for long entry opportunities
- Place stops below recent support
- Consider higher timeframe trends for targets

### Bearish Strategy
When aggregate bias is **strongly bearish (-60 or lower)**:
- Look for short entry opportunities  
- Place stops above recent resistance
- Consider higher timeframe trends for targets

### Neutral/Ranging Strategy
When aggregate bias is **neutral (-20 to +20)**:
- Trade range-bound strategies
- Wait for breakout confirmation
- Reduce position sizes

## 🔗 Useful Links

- **Alpha Vantage API**: https://www.alphavantage.co/
- **Next.js Documentation**: https://nextjs.org/docs
- **Lightweight Charts**: https://tradingview.github.io/lightweight-charts/
- **Technical Analysis**: https://www.investopedia.com/

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Review your browser console for errors
- Verify backend logs in the terminal
- Ensure all dependencies are installed

---

**Happy Trading! 📈**
