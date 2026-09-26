# Mboka Flow

A responsive, French-language website for a community-powered mobility project in Kinshasa, DRC. Built with plain HTML, CSS and JavaScript, based on the original project draft.

## Run locally

No build step or application dependencies are needed. With Python 3 installed:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open `http://localhost:3000`. Alternatively, `npm run dev` runs the same command. On hosted preview environments, use the provided preview URL instead of localhost.

## Features

- Responsive landing page, mobile menu, vision and partnership sections.
- Original SVG illustrations with no map API keys or tile-service dependency.
- Interactive, keyboard-accessible schematic traffic map with six locations.
- Accent-insensitive search for the available neighbourhoods and roads.
- Zoom, reset and selectable traffic markers.
- Incident reports that update the map locally for the current page session.
- Contact form that prepares a message in the visitor's email application.
- Form labels, live status messages, skip link, visible focus and reduced-motion support.

## Important limitations

**This is a presentation prototype, not a navigation service.** All traffic conditions and delays are fictitious. Maps are illustrative, not geographically accurate. There is no live traffic feed, route calculation, backend, account system, or published mobile app.

Incident reports are held in browser memory and disappear on reload. They are not sent to other users or to authorities. The contact form uses `mailto:`; visitors need a configured email client and must send the message themselves. The email address comes from the original project draft.

The website has no analytics, geolocation collection or local storage. Google Fonts is an external dependency for typography; system font fallbacks are provided.

## Files

- `index.html`: French content, sections and forms.
- `styles.css`: responsive design and reduced-motion handling.
- `script.js`: map illustration, simulated data and interactions.
- `favicon.svg`: site icon.
- `tests/smoke.cjs`: browser interaction and responsive-layout checks.

## Browser tests

With Node.js and Python 3 installed:

```sh
npm ci
npx playwright install --with-deps chromium
npm run dev
```

In another terminal:

```sh
npm test
```

Tests cover location search, no-result feedback, simulated reports, marker updates, keyboard activation, zoom/reset, mobile navigation, the contact draft, JavaScript errors, and horizontal overflow at 320, 390, 768, 1024 and 1440 pixels.

Optional environment variables: `BASE_URL` selects the server URL; `CHROMIUM_PATH` selects an existing Chromium executable.

## Deployment

Serve `index.html`, `styles.css`, `script.js` and `favicon.svg` from any static web host. Asset paths are relative, so the website also works under a GitHub Pages project path.

The existing `.github/workflows/static.yml` deploys to GitHub Pages on pushes to `main` or manual dispatch, subject to the repository's Pages configuration. Creating or previewing files on this working branch does not publish them automatically.

## Next steps toward a production service

Connect authorized geographic and traffic data sources, design consent and privacy controls, build secure incident ingestion and moderation, and validate data quality before enabling navigation or real-world public reports.
