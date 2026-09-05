# R4d Production Master Candidate v1.1 — applied to public site — 2026-09-05

## Intent

Owner uploaded `BlueSkyz_Identity_R4d_Production_Master_Candidate_v1.1.zip`.
Apply the branding kit to the live Astro site — do not leave it as an unused archive.

## Applied

| Surface              | Source in kit                                         | Site wiring                                                      |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| Header / Hero lockup | `01_MASTER_VECTOR/lockups/lockup_horizontal_dark.svg` | `BrandLockup` → `/brand/blueskyz/r4d/lockup_horizontal_dark.svg` |
| Footer lockup        | `lockup_horizontal_light.svg`                         | `BrandLockup` footer variant                                     |
| Favicon              | `03_WEB_APP/favicon.ico` + micro SVG                  | `/favicon.ico` + `/brand/.../micro_mark_ink.svg`                 |
| Apple touch          | `apple_touch_icon_180.png`                            | `/apple-touch-icon.png`                                          |
| Web manifest         | kit + public paths                                    | `/site.webmanifest`                                              |
| Tokens               | `04_TOKENS/*`                                         | `public/brand/blueskyz/r4d/brand_tokens.{json,css}`              |
| Full kit archive     | entire zip tree                                       | `brand/r4d-production-master-candidate-v1.1/`                    |
| OG                   | kit light lockup raster (rsvg fallback)               | `public/social/og-default.png`                                   |

## Non-claims (STATUS.json)

- `canonicalMasterbrandPromoted: false`
- Still `DESIGN_FREEZE_CANDIDATE` / `IDENTITY_PROTOTYPE_READY`
- No invented emails, products, or trademark claims

## Digests

See `public/brand/blueskyz/r4d/brand-manifest.json` `fileSha256`.

## Verification

- Architecture brand provenance + brand assets
- Typecheck / lint / format / build / budget / static links
- Playwright shell/home (lockup visible, no hollow Contact soft-land regression)
