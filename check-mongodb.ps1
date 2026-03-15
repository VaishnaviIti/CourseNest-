# MongoDB Installation Checker for CourseNest
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Status Checker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB service exists
Write-Host "Checking MongoDB service..." -ForegroundColor Yellow
$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($mongoService) {
    Write-Host "[OK] MongoDB service found!" -ForegroundColor Green
    Write-Host "Status: $($mongoService.Status)" -ForegroundColor Cyan
    
    if ($mongoService.Status -eq "Running") {
        Write-Host "[OK] MongoDB is RUNNING!" -ForegroundColor Green
    } else {
        Write-Host "[INFO] MongoDB is installed but not running" -ForegroundColor Yellow
        Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
        
        try {
            Start-Service -Name "MongoDB"
            Write-Host "[OK] MongoDB started successfully!" -ForegroundColor Green
        } catch {
            Write-Host "[ERROR] Failed to start MongoDB. Run as Administrator." -ForegroundColor Red
            Write-Host "Try: net start MongoDB" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "[ERROR] MongoDB service NOT found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "MongoDB is not installed. Please install it:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Use the installer helper" -ForegroundColor Cyan
    Write-Host "  Double-click: install-mongodb.bat" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Manual installation" -ForegroundColor Cyan
    Write-Host "  1. Visit: https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host "  2. Download MongoDB Community Server for Windows (MSI)" -ForegroundColor White
    Write-Host "  3. Run installer with 'Complete' setup" -ForegroundColor White
    Write-Host "  4. Check 'Install MongoDB as a Service'" -ForegroundColor White
    Write-Host ""
    
    $continue = Read-Host "Want me to open the download page? (y/n)"
    if ($continue -eq "y") {
        Start-Process "https://www.mongodb.com/try/download/community"
        Write-Host "Download page opened!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# If MongoDB is running, offer to seed database
if ($mongoService -and $mongoService.Status -eq "Running") {
    Write-Host ""
    Write-Host "MongoDB is ready! Want to seed the CourseNest database now?" -ForegroundColor Green
    Write-Host ""
    $seed = Read-Host "Run database seed? (y/n)"
    
    if ($seed -eq "y") {
        Write-Host ""
        Write-Host "Seeding database..." -ForegroundColor Yellow
        Write-Host "This will create courses, lessons, and admin account" -ForegroundColor Cyan
        Write-Host ""
        
        # Change to backend directory and run seed
        $backendPath = Join-Path $PSScriptRoot "backend"
        
        if (Test-Path $backendPath) {
            Set-Location $backendPath
            npm run seed
            
            Write-Host ""
            Write-Host "Database seeding complete!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Admin Credentials:" -ForegroundColor Cyan
            Write-Host "  Email: admin@coursenest.com" -ForegroundColor White
            Write-Host "  Password: admin123" -ForegroundColor White
            Write-Host ""
            
            Set-Location $PSScriptRoot
        } else {
            Write-Host "[ERROR] Backend folder not found at: $backendPath" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
