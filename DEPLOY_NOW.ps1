# Project Namibia XR - GitHub Deployment
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PROJECT NAMIBIA XR DEPLOYMENT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Step 1: Authenticate
Write-Host "[1/2] Checking GitHub authentication..." -ForegroundColor Yellow
gh auth status 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Not authenticated. Starting login process..." -ForegroundColor Yellow
    Write-Host ""
    gh auth login

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Authentication failed!" -ForegroundColor Red
        pause
        exit 1
    }
}

Write-Host "Authenticated successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Create repo and push
Write-Host "[2/2] Creating repository and pushing code..." -ForegroundColor Yellow
gh repo create project-namibia-xr --public --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host "Code pushed successfully!" -ForegroundColor Green
    Write-Host ""

    # Enable Pages
    Write-Host "Enabling GitHub Pages..." -ForegroundColor Yellow
    gh api repos/:owner/project-namibia-xr/pages -X POST -f source[branch]=master -f source[path]=/ 2>&1 | Out-Null

    # Get username
    $username = gh api user --jq .login

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  SUCCESS!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your URLs (live in 2-3 minutes):" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "PREMIUM:" -ForegroundColor Yellow
    Write-Host "https://$username.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html" -ForegroundColor White
    Write-Host ""
    Write-Host "MVP:" -ForegroundColor Yellow
    Write-Host "https://$username.github.io/project-namibia-xr/ar-scavenger-hunt.html" -ForegroundColor White
    Write-Host ""
}

pause
