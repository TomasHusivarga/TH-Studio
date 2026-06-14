# strip-contact.ps1
# Copies dist/ to dist-jaspravim/ and removes direct contact info from the static HTML export.
# Run from the project root after npm run build: .\strip-contact.ps1

$jaspravimProfile = 'https://www.jaspravim.sk/profil/tomas1412'
$jaspravimSiteUrl = 'https://jolly-nasturtium-8f54af.netlify.app'

$src  = ".\dist"
$dest = ".\dist-jaspravim"

if (-not (Test-Path $src)) {
    Write-Error "Source build folder not found: $src. Run npm run build first."
    exit 1
}

if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
Copy-Item $src $dest -Recurse -Force
Write-Host "[1/7] Copied dist -> dist-jaspravim" -ForegroundColor Cyan

$noticePath = Join-Path $PSScriptRoot "_jaspravim-notice.html"
if (-not (Test-Path $noticePath)) {
    Write-Error "Notice template not found: $noticePath"
    exit 1
}
$notice = Get-Content $noticePath -Raw -Encoding UTF8

$htmlFiles = Get-ChildItem $dest -Filter "*.html" -Recurse
foreach ($file in $htmlFiles) {
    $html = Get-Content $file.FullName -Raw -Encoding UTF8

    # Vite bakes in base:'/TH-Studio/' for GitHub Pages. The Jaspravim export is served from root.
    $html = $html -replace '/TH-Studio/', '/'
    $html = $html -replace 'https://tomashusivarga\.github\.io/', ($jaspravimSiteUrl + '/')

    # Remove direct contact data from metadata, schema, content, and forms.
    $html = $html -replace '(?m)^\s*"email"\s*:\s*"[^"]*",?\s*\r?\n', ''
    $html = $html -replace '(?s)<section[^>]*id=["'']kontakt["''][^>]*>.*?</section>', $notice
    $html = $html -replace '(?s)<form[^>]*id=["'']contact-form["''][^>]*>.*?</form>', ''
    $html = $html -replace '(?s)<a[^>]*href=["'']mailto:[^"'']+["''][^>]*>.*?</a>', ''
    $html = $html -replace '(?s)<a[^>]*href=["'']tel:[^"'']+["''][^>]*>.*?</a>', ''
    $html = $html -replace '(?s)<footer[^>]*>.*?</footer>', ''

    # Remove contact CTA items from navigation and point remaining contact CTAs to the platform profile.
    $html = $html -replace '(?s)<li[^>]*>\s*<a[^>]*class=["''][^"'']*nav-cta[^"'']*["''][^>]*>.*?</a>\s*</li>', ''
    $html = $html -replace 'href=["''](?:/)?#kontakt["'']', "href=`"$jaspravimProfile`" target=`"_blank`" rel=`"noopener`""
    $html = $html -replace 'href=["''](?:/)?projects/([^"'']+)["'']', 'href="/projects/$1"'
    $html = $html -replace 'href=["''](?:/)?gdpr\.html["'']', 'href="/gdpr.html"'

    Set-Content -Path $file.FullName -Value $html -Encoding UTF8 -NoNewline
    Write-Host "    Sanitized: $($file.FullName.Replace((Resolve-Path $dest).Path + '\', ''))" -ForegroundColor DarkCyan
}
Write-Host "[2/7] Sanitized HTML files" -ForegroundColor Cyan

# Rewrite the GitHub Pages base path in text assets and remove direct email strings from JS.
Get-ChildItem $dest -Recurse -File -Include "*.js","*.css","*.txt","*.xml","*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '/TH-Studio/', '/'
    $content = $content -replace 'https://tomashusivarga\.github\.io/TH-Studio/', '/'
    $content = $content -replace 'https://tomashusivarga\.github\.io/', ($jaspravimSiteUrl + '/')
    $content = $content -replace 'Sitemap:\s*/sitemap\.xml', ('Sitemap: ' + $jaspravimSiteUrl + '/sitemap.xml')
    $content = $content -replace 'mailto:Husivarga1412@gmail\.com\?subject=', ($jaspravimProfile + '?subject=')
    $content = $content -replace 'Husivarga1412@gmail\.com', 'jaspravim.sk/profil/tomas1412'
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8 -NoNewline
}
Write-Host "[3/7] Rewrote base paths and removed direct email strings from text assets" -ForegroundColor Cyan

# GDPR is not suitable for the marketplace copy because it necessarily names direct controller contact data.
$gdprPath = Join-Path $dest "gdpr.html"
if (Test-Path $gdprPath) {
    Remove-Item $gdprPath -Force
    Write-Host "[4/7] Removed GDPR page from Jaspravim export" -ForegroundColor Cyan
} else {
    Write-Host "[4/7] No GDPR page found" -ForegroundColor DarkCyan
}

$sitemapPath = Join-Path $dest "sitemap.xml"
if (Test-Path $sitemapPath) {
    $sitemap = Get-Content $sitemapPath -Raw -Encoding UTF8
    $sitemap = $sitemap -replace '(?s)\s*<url>\s*<loc>[^<]*gdpr\.html</loc>.*?</url>', ''
    $sitemap = $sitemap -replace 'https://tomashusivarga\.github\.io/TH-Studio/', '/'
    $sitemap = $sitemap -replace 'https://tomashusivarga\.github\.io/', ($jaspravimSiteUrl + '/')
    $sitemap = $sitemap -replace '<loc>/', ('<loc>' + $jaspravimSiteUrl + '/')
    Set-Content -Path $sitemapPath -Value $sitemap -Encoding UTF8 -NoNewline
}
Write-Host "[5/7] Updated sitemap" -ForegroundColor Cyan

$leaks = rg -n "mailto:|tel:|formspree|Husivarga1412@gmail\.com|#kontakt|/TH-Studio/|tomashusivarga\.github\.io" $dest
if ($LASTEXITCODE -eq 0) {
    Write-Host $leaks -ForegroundColor Yellow
    Write-Error "Potential direct contact or GitHub Pages base path references remain."
    exit 1
}
Write-Host "[6/7] Leak check passed" -ForegroundColor Cyan

Write-Host "[7/7] Done. dist-jaspravim is ready." -ForegroundColor Green
Write-Host "    Folder: $(Resolve-Path $dest)" -ForegroundColor Gray
