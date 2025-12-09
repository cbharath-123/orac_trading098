# ORAC Trading Dashboard - Start Script
# Run this script to start both frontend and backend servers

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Starting ORAC Trading Dashboard" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\backend'; npm run dev" -PassThru

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\frontend'; npm run dev" -PassThru

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "Servers Started!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in each terminal window to stop the servers" -ForegroundColor Yellow
Write-Host ""
