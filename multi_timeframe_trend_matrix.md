# Multi-timeframe Trend Matrix Plan (TRADINGVIEW)

## 0) What We'll Build
A single TradingView indicator that:
- Analyzes multiple timeframes simultaneously (e.g., 15m, 1h, 4h, 1D, 1W).
- Evaluates key trend signals per timeframe (EMA slope, RSI, MACD histogram slope, Supertrend direction, optional ADX).
- Converts signals into a score from **−100 (bearish) to +100 (bullish)**.
- Aggregates into a single bias with confidence.
- Displays a table/heatmap and triggers alerts.

Why this works:  
Lower timeframes show *changes*, higher timeframes show *context*.

## 1) Core Concepts We Need
- **Pine Script v5**
- `request.security()`
- **Repainting** avoidance using `lookahead_off`
- **Normalization**
- **Confidence** via ADX
- **Weights** for signals & timeframes

## 2) Signals and Scoring

### 1. EMA Slope (Trend Direction)
- `ema = ta.ema(close, 50)`
- `slope = ema − ema[1]`
- Normalize using ATR

### 2. RSI Level & Momentum
- `rsi = ta.rsi(close, 14)`
- Level: `(rsi − 50) / 50`
- Momentum: `(rsi − rsi[1]) / 10`
- Combine: 70% level, 30% momentum

### 3. MACD Histogram Slope
- Use MACD(12,26,9)
- Slope = `hist − hist[1]`
- Normalize via ATR

### 4. Supertrend Direction
- +1 when price > supertrend
- −1 when price < supertrend

### 5. ADX Trend Quality (Confidence)
- `(adx − 25) / 25`, clamped to [0, 1]

### Final Per‑Timeframe Score
Weighted average of EMA/RSI/MACD/Supertrend × ADX  
Mapped to **−100 → +100**

## 3) Multi-Timeframe Safety
- Always use `lookahead_off`
- Keep expressions inside `security()` pure
- No future-bar logic

## 4) UI Plan
- Table: timeframes as rows, components as columns
- Header shows aggregate score + grade
- Alerts:
  - Bias turns bullish/bearish
  - Strong trend when aggregate ≥ +60 and N timeframes agree

## 5) Default Weights & Thresholds
- **Signal weights:** EMA 0.30, RSI 0.20, MACD 0.25, ST 0.25
- **ADX threshold:** 25
- **Timeframe weights:**
  - 15m: 0.5
  - 1h: 1.0
  - 4h: 1.5
  - 1D: 2.0
  - 1W: 2.5
- **Bias thresholds:** ±20 for bullish/bearish, ±60 for strong trend

## 6) Build It Incrementally
1. Create indicator skeleton  
2. Add signal calculators  
3. Parse timeframes & compute scores  
4. Render heatmap table  
5. Add alerts  

## 7) Testing Checklist
- **Repaint safety**
- **Trend sanity check**
- **Performance** (avoid heavy loops)
- **Edge cases** (low ATR, illiquid assets)

## 8) Packaging & Licensing
- Premium version: full features
- Lite: 3 timeframes, no custom weights
- Use invite-only protection

## 9) Default Presets
- Intraday: ["5","15","60","240"]
- Swing: ["60","240","D","W"]
- Conservative: higher thresholds

## 10) Documentation for Users
- How to read heatmap colors
- What triggers alerts
- Best practices for alignment across timeframes

## 11) Roadmap
- Add volume filters
- Add VWAP distance penalties
- Add KAMA/Hull alternatives
- Tooltips, export options

## 12) Milestones
- M1: Single timeframe
- M2: Multi-timeframe aggregation
- M3: UI + alerts
- M4: QA
- Release: ~1–2 weeks
