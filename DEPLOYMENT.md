# Orderat Deployment

GitHub repository: https://github.com/mohabx116-creator/orderat-landing.git

## Vercel Settings

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: project root

No environment variables are currently required.

## WhatsApp Number

The WhatsApp number is configured in:

```txt
src/data/orderatData.js
```

The readable configured number keeps the `+` sign, and the generated `wa.me` link sanitizes it to digits only.

## Post-Deploy QA Checklist

- Home page loads without a blank screen.
- Arabic RTL layout renders correctly on mobile and desktop.
- Navbar shows `Orderat / أوردرات` cleanly.
- Primary WhatsApp CTAs open a `wa.me/201275920320` link.
- Mobile sticky WhatsApp CTA appears on mobile only.
- Pricing section shows estimated pricing and the weight/space rule.
- No horizontal overflow on mobile.
- Vercel deployment uses `npm run build` and outputs `dist`.
