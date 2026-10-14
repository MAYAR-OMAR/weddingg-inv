# Eyad & Fatma - Wedding Invitation

Static site (no build step). Deploy on Vercel: drag this folder, or `vercel --prod`.

## Files
- `index.html`  : page content + Open Graph tags (WhatsApp preview)
- `css/style.css`, `js/main.js`
- `js/main.js` top: edit `timeText`, `venueName`, `venueMaps`, `whatsapp` (e.g. 2010xxxxxxxx)
- `assets/photos/1..6.jpg` : replace photos (keep the same names)
- `assets/og-image.jpg` : WhatsApp preview image (1200x630)
- `assets/open.mp4`, `assets/poster.jpg` : opening video

## WhatsApp preview cache
WhatsApp caches previews. After changing the image/text, share the link with `?v=2` at the end.
