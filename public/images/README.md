# Images — size guidelines & usage

Purpose
- Quick reference for hero/banner and product image sizes used by the Grace Foods frontend.

Recommended image sizes
- Hero / Banner (desktop): 1600×900 (16:9) — filename: `grace-banner-desktop.jpg` (retina: 3200×1800)
- Hero / Banner (mobile portrait): 800×1200 (2:3) — filename: `grace-banner-mobile.jpg` (retina: 1600×2400)
- Product main (gallery): 1200×1200 (square) or 1200px width — `product-<id>-1.jpg` (retina: 2400×2400)
- Product card (listing): 295×295 / 180×180 / 140×140 — `product-<id>-card.jpg`
- Cart thumbnail: 124×124 — `product-<id>-thumb.jpg`
- Admin preview thumbnail: 400×200 (preview) and small 40×40 for lists
- Category / carousel circle: 220–295 (recommend 295×295)

Formats & compression
- Preferred: AVIF or WebP. Fallback: JPEG (high quality). Aim: mobile hero ≤200KB, desktop hero ≤400KB after compression.

Filenames & location
- Put all front-end images here: `/public/images/`
- Example filenames:
  - `grace-banner-mobile.jpg`
  - `grace-banner-desktop.jpg`
  - `product-123-1.jpg`, `product-123-thumb.jpg`

Next.js / srcset examples
- Next/Image `sizes` example for hero:
  - `sizes="(max-width:768px) 100vw, 1600px"`
- HTML `img` srcset example:
  - `<img src="/images/grace-banner-mobile.jpg" srcset="/images/grace-banner-mobile.jpg 800w, /images/grace-banner-mobile@2x.jpg 1600w" sizes="(max-width:768px) 100vw">`

Design & focal guidance
- Keep the important subject near the center/upper-center. Use `object-fit: cover` and on mobile `object-position: center 30%–40%` to show product tops.
- Avoid full-bleed zoomed composition — keep balanced spacing so mobile cropping does not cut essential items.

Prompt for generating a mobile hero (copy to your image tool)
"Vertical mobile hero, 800x1200, realistic food photography — premium Kerala organic brand aesthetic. Centered composition with clear focal area: foreground arranged products (from left to right): a white pouch of homemade beef pickle (label removed), a rustic honey jar with wooden dipper, a small bowl of smoky dried beef, assorted spices and fresh herbs (curry leaves, green chilies, peppercorns) subtly placed around, and warm rustic props (wooden board, ceramic bowl). Soft warm beige background, natural window-like lighting from upper-left, elegant soft shadows, shallow depth of field, high detail, rich textures, minimal negative space, balanced spacing so all products are fully visible on mobile vertical crop — avoid zoomed-in closeups. No text, no logos, no watermarks. Photorealistic, editorial food photography style, warm tones, clean and minimal composition."

How to add images
1. Generate or export images at the recommended sizes.
2. Place files in `grace-user-main/public/images/` with the recommended filenames.
3. Restart the dev server if needed and visit the homepage in mobile emulation to verify cropping.

Testing locally
```
cd grace-user-main
npm run dev
# open http://localhost:3000 and use DevTools device toolbar (Select a phone) and refresh
```

If cropping still cuts important parts, adjust `object-position` in `src/components/homepage/Header/index.tsx` (mobile value: `center 30%` / `center 40%` / `center 50%`) and tweak `min-height`.

Questions or want me to add example images to this folder? Reply and I will add them and tune the hero styles.
