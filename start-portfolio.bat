@echo off
REM Quick start for the portfolio on Windows (double-click friendly).
REM Fresh worktrees: runs setup (Node check + .env + npm install), builds, and starts the dev server.
REM Override the port for parallel worktrees:  set PORT=3001 && start-portfolio.bat
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js not found. Install Node 18+ ^(see .nvmrc^) from https://nodejs.org/ and retry.
  pause
  exit /b 1
)

if not defined PORT set PORT=3000

echo [1/3] Setup...
call npm run setup
if errorlevel 1 (
  echo [ERROR] Setup failed.
  pause
  exit /b 1
)

echo [2/3] Build...
call npm run build
if errorlevel 1 (
  echo [ERROR] Build failed.
  pause
  exit /b 1
)

echo [3/3] Starting dev server on port %PORT%...
echo Open http://localhost:%PORT% in your browser.
call npm start
pause
