# ORAC Trading Dashboard - Setup Script
# Run this script to set up both frontend and backend

Write-Host "================================" -ForegroundColor Cyan
Write-Host "ORAC Trading Dashboard Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Backend setup
Write-Host "Setting up Backend..." -ForegroundColor Yellow
Set-Location "$scriptPath\backend"

if (Test-Path "node_modules") {
    Write-Host "Backend dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "Error installing backend dependencies" -ForegroundColor Red
        exit 1
    }
}

# Frontend setup
Write-Host ""
Write-Host "Setting up Frontend..." -ForegroundColor Yellow
Set-Location "$scriptPath\frontend"

if (Test-Path "node_modules") {
    Write-Host "Frontend dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Frontend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "Error installing frontend dependencies" -ForegroundColor Red
        exit 1
    }
}

Set-Location $scriptPath

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend\.env and add your Alpha Vantage API key" -ForegroundColor White
Write-Host "2. Run 'npm run dev' in backend folder to start the API server" -ForegroundColor White
Write-Host "3. Run 'npm run dev' in frontend folder to start the web app" -ForegroundColor White
Write-Host "4. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "Get your free API key at: https://www.alphavantage.co/support/#api-key" -ForegroundColor Cyan
Write-Host ""
