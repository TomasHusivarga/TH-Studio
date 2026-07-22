# Deployment Notes

Updated: 2026-05-27

## Public Portfolio

- Source/build project: `D:\PORTFOLIO WEBSITE`
- Main public GitHub Pages URL: `https://tomashusivarga.github.io/TH-Studio/`
- Normal production build command:

```powershell
npm run build
```

This creates `dist/` with the GitHub Pages base path from `vite.config.js`.

## Jaspravim No-Direct-Contact Version

- Live URL: `https://jolly-nasturtium-8f54af.netlify.app/`
- Netlify project name: `jolly-nasturtium-8f54af`
- Netlify site ID: `ca090bd0-682b-468b-b77e-daf939a53ef2`
- Netlify team/account slug: `tomas1564230`
- This site was originally created via Netlify Drop.
- The Netlify CLI auth token is stored as the Windows user environment variable `NETLIFY_AUTH_TOKEN`.
- Do not commit or document the token value.

To update this version:

```powershell
cd "D:\PORTFOLIO WEBSITE"
npm run build
.\strip-contact.ps1
$env:NETLIFY_AUTH_TOKEN = [Environment]::GetEnvironmentVariable('NETLIFY_AUTH_TOKEN','User')
npx --yes netlify-cli deploy --dir "D:\PORTFOLIO WEBSITE\dist-jaspravim" --site ca090bd0-682b-468b-b77e-daf939a53ef2 --prod --message "Update Jaspravim portfolio"
```

After deploying, verify:

```powershell
$urls=@(
  'https://jolly-nasturtium-8f54af.netlify.app/',
  'https://jolly-nasturtium-8f54af.netlify.app/en/',
  'https://jolly-nasturtium-8f54af.netlify.app/projects/viamax.html'
)
foreach($u in $urls){
  $r=Invoke-WebRequest -UseBasicParsing $u -TimeoutSec 30
  $hasViamax=$r.Content -match 'Viamax'
  $hasDirectContact=$r.Content -match 'Husivarga1412@gmail|mailto:|formspree|contact-form'
  "STATUS=$($r.StatusCode) URL=$u VIAMAX=$hasViamax DIRECT_CONTACT=$hasDirectContact"
}
```

Expected result for the Jaspravim version:

- `Viamax` appears on SK, EN, and `/projects/viamax.html`.
- No direct email, `mailto:`, Formspree form, or contact form remains.
- `gdpr.html` is intentionally removed from `dist-jaspravim` because it contains direct controller contact details.

## Related Files

- `strip-contact.ps1` regenerates `dist-jaspravim` from `dist`.
- `_jaspravim-notice.html` replaces the contact section in the marketplace-safe version.
- `PORTFOLIO_GUIDELINES.md` documents rules for adding projects.
