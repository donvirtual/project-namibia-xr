@echo off
echo ================================================
echo   PROJECT NAMIBIA XR - PUSH TO GITHUB
echo ================================================
echo.

REM Refresh PATH to include gh
call refreshenv >nul 2>&1

echo [1/4] Checking GitHub CLI...
where gh >nul 2>&1
if errorlevel 1 (
    echo ERROR: GitHub CLI not found in PATH
    echo Please close this window and open a NEW terminal window.
    pause
    exit /b 1
)

echo [2/4] Checking authentication...
gh auth status
if errorlevel 1 (
    echo.
    echo You need to authenticate first!
    echo.
    set /p AUTH="Do you want to authenticate now? (Y/N): "
    if /i "%AUTH%"=="Y" (
        gh auth login
    ) else (
        echo Exiting...
        pause
        exit /b 1
    )
)

echo.
echo [3/4] Creating repository on GitHub...
gh repo create project-namibia-xr --public --source=. --remote=origin --push

echo.
echo [4/4] Enabling GitHub Pages...
gh api repos/:owner/project-namibia-xr/pages -X POST -f source[branch]=master -f source[path]=/

echo.
echo ================================================
echo   SUCCESS! Your site will be live in 2-3 minutes
echo ================================================
echo.
echo Your URLs:
echo.
echo Premium (RECOMMENDED):
echo https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html
echo.
echo MVP:
echo https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt.html
echo.
echo Replace YOUR-USERNAME with your actual GitHub username
echo.
pause
