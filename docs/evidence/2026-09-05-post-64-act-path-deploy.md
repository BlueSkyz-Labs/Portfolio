# Post-#64 production smoke — Act path + workers.dev noindex — 2026-09-05

## Deploy

| Item           | Value                                                   |
| -------------- | ------------------------------------------------------- |
| `main` SHA     | `a926019c10908d25ae257e7f586c0feff655a7dc` (#64 squash) |
| Workers Builds | `c03d83fa-b977-4886-a1c4-44630dd3bb3c` **success**      |

## Live outcomes

| Check                                                | Result                                             |
| ---------------------------------------------------- | -------------------------------------------------- |
| `https://tonydemo.com/` primary CTA                  | **About BlueSkyz** → `/about/`                     |
| Hero secondary CTA                                   | **Security** → `/security/`                        |
| Featured products heading                            | **absent** (empty registry)                        |
| `https://tonydemo.com/contact/` first lane           | **Security** + advisory CTA; no `mailto:`          |
| `https://blueskyz-web.thinhnguyen-km10.workers.dev/` | `X-Robots-Tag: noindex`                            |
| Apex HSTS                                            | `max-age=31536000; includeSubDomains` (no preload) |

## Residual (owner-gated)

Emails · Issue #8 rulesets · public product YAML · About photography · Cursor App `sgps-core` grant
