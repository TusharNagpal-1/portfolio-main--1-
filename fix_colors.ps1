$files = Get-ChildItem -Path "src\components" -Filter "*.tsx" -Recurse
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $content = $content -replace 'border-white/10', 'border-border'
    $content = $content -replace 'border-white/5', 'border-border/50'
    $content = $content -replace 'bg-white/5', 'bg-card/30'
    $content = $content -replace 'bg-black/60', 'bg-card/80'
    $content = $content -replace 'bg-black/40', 'bg-card/60'
    $content = $content -replace 'hover:border-white/20', 'hover:border-border'
    $content = $content -replace 'bg-white/10', 'bg-card/40'
    Set-Content -Path $file.FullName -Value $content -NoNewline
}
Write-Host "Done replacing tokens in component files."
