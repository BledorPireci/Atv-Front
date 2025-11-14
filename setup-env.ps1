# PowerShell Script to Setup Environment Files
# Run this script to automatically create your .env files

Write-Host "Setting up environment files for ATV Rent..." -ForegroundColor Green

# Create .env.development
$devContent = "# Development Environment Variables`nVITE_API_BASE_URL=http://localhost:5000"
Set-Content -Path ".env.development" -Value $devContent
Write-Host "✓ Created .env.development (local backend)" -ForegroundColor Green

# Create .env.production
$prodContent = "# Production Environment Variables`nVITE_API_BASE_URL=https://atv-back.onrender.com"
Set-Content -Path ".env.production" -Value $prodContent
Write-Host "✓ Created .env.production (Render backend)" -ForegroundColor Green

Write-Host "`nSetup complete! You can now:" -ForegroundColor Cyan
Write-Host "  • Run 'npm run dev' for local development" -ForegroundColor White
Write-Host "  • Run 'npm run build' for production build" -ForegroundColor White
Write-Host "`nSee ENVIRONMENT_SETUP.md for more details." -ForegroundColor Yellow

