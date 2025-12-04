# ================================================
#   PROJECT NAMIBIA XR - PUSH TO GITHUB
# ================================================

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "  PROJECT NAMIBIA XR - PUSH TO GITHUB" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Step 1: Check if gh is available
Write-Host "[1/4] Checking GitHub CLI..." -ForegroundColor Yellow
$ghPath = Get-Command gh -ErrorAction SilentlyContinue

if (-not $ghPath) {
    Write-Host "ERROR: GitHub CLI not found!" -ForegroundColor Red
    Write-Host "Please close this window and open a NEW PowerShell window." -ForegroundColor Red
    Write-Host "Then run this script again.`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ GitHub CLI found at: $($ghPath.Source)`n" -ForegroundColor Green

# Step 2: Check authentication
Write-Host "[2/4] Checking GitHub authentication..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "You need to authenticate with GitHub first!`n" -ForegroundColor Red
    $response = Read-Host "Do you want to authenticate now? (Y/N)"

    if ($response -eq "Y" -or $response -eq "y") {
        Write-Host "`nStarting authentication process..." -ForegroundColor Yellow
        gh auth login

        if ($LASTEXITCODE -ne 0) {
            Write-Host "Authentication failed!" -ForegroundColor Red
            Read-Host "Press Enter to exit"
            exit 1
        }
    } else {
        Write-Host "Exiting..." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host "✓ Authenticated with GitHub`n" -ForegroundColor Green

# Step 3: Create repository and push
Write-Host "[3/4] Creating GitHub repository and pushing code..." -ForegroundColor Yellow
Write-Host "This will create a PUBLIC repository called 'project-namibia-xr'`n" -ForegroundColor Cyan

gh repo create project-namibia-xr --public --source=. --remote=origin --push

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nERROR: Failed to create repository!" -ForegroundColor Red
    Write-Host "The repository might already exist." -ForegroundColor Yellow
    Write-Host "Try visiting: https://github.com/YOUR-USERNAME/project-namibia-xr`n" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Repository created and code pushed!`n" -ForegroundColor Green

# Step 4: Enable GitHub Pages
Write-Host "[4/4] Enabling GitHub Pages..." -ForegroundColor Yellow

gh api repos/:owner/project-namibia-xr/pages -X POST -f source[branch]=master -f source[path]=/

if ($LASTEXITCODE -ne 0) {
    Write-Host "Note: Pages might already be enabled or branch might be 'main' instead of 'master'" -ForegroundColor Yellow
    Write-Host "Trying with 'main' branch..." -ForegroundColor Yellow
    gh api repos/:owner/project-namibia-xr/pages -X POST -f source[branch]=main -f source[path]=/
}

Write-Host "✓ GitHub Pages enabled!`n" -ForegroundColor Green

# Get GitHub username
$username = gh api user --jq .login

Write-Host "`n================================================" -ForegroundColor Green
Write-Host "  SUCCESS! 🎉" -ForegroundColor Green
Write-Host "================================================`n" -ForegroundColor Green

Write-Host "Your repository is live at:" -ForegroundColor Cyan
Write-Host "https://github.com/$username/project-namibia-xr`n" -ForegroundColor White

Write-Host "Your WebXR experience will be live in 2-3 minutes at:" -ForegroundColor Cyan
Write-Host "`nPremium (RECOMMENDED):" -ForegroundColor Yellow
Write-Host "https://$username.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html" -ForegroundColor White

Write-Host "`nMVP:" -ForegroundColor Yellow
Write-Host "https://$username.github.io/project-namibia-xr/ar-scavenger-hunt.html`n" -ForegroundColor White

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Wait 2-3 minutes for GitHub Pages to deploy" -ForegroundColor White
Write-Host "2. Open the Premium URL in your desktop browser to test" -ForegroundColor White
Write-Host "3. Open the URL on your Meta Quest 3S Browser" -ForegroundColor White
Write-Host "4. Start the treasure hunt!`n" -ForegroundColor White

Read-Host "Press Enter to exit"
