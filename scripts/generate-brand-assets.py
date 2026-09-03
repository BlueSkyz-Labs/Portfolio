#!/usr/bin/env python3
"""Generate Quiet Luxury brand assets for static export (OG + favicon)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

INK_VOID = (10, 10, 10, 255)
INK_CHARCOAL = (26, 26, 26, 255)
GOLD = (201, 169, 98, 255)
CREAM = (245, 245, 240, 255)


def load_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSerif.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def draw_radial(img: Image.Image) -> None:
    """Subtle lower-right charcoal lift without glow noise."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    width, height = img.size
    for radius in range(max(width, height), 0, -8):
        alpha = int(28 * (1 - radius / max(width, height)))
        if alpha <= 0:
            continue
        color = (*INK_CHARCOAL[:3], alpha)
        draw.ellipse(
            [
                width * 0.35 - radius,
                height * 0.25 - radius,
                width * 0.35 + radius,
                height * 0.25 + radius,
            ],
            fill=color,
        )
    img.alpha_composite(overlay)


def write_og() -> None:
    img = Image.new("RGBA", (1200, 630), INK_VOID)
    draw_radial(img)
    draw = ImageDraw.Draw(img)

    # Horizon hairline at ~8% vertical mark, gold stitch.
    y = int(630 * 0.08)
    draw.line([(96, y), (1104, y)], fill=GOLD, width=1)

    title_font = load_font(72)
    sub_font = load_font(28)
    meta_font = load_font(20)

    draw.text((96, 210), "BlueSkyz Labs", font=title_font, fill=CREAM)
    draw.text(
        (96, 310),
        "Quiet luxury, loud conviction.",
        font=sub_font,
        fill=(168, 168, 160, 255),
    )
    draw.text(
        (96, 540),
        "PORTFOLIO  ·  2026",
        font=meta_font,
        fill=(168, 168, 160, 255),
    )

    out = PUBLIC / "og-image.png"
    img.convert("RGB").save(out, format="PNG", optimize=True)
    print(f"wrote {out} ({out.stat().st_size} bytes)")


def write_favicon() -> None:
    size = 64
    img = Image.new("RGBA", (size, size), INK_VOID)
    draw = ImageDraw.Draw(img)
    # Hairline gold frame inset by 8px — stitch, not fill.
    draw.rectangle([8, 8, size - 9, size - 9], outline=GOLD, width=1)
    font = load_font(28)
    text = "B"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        ((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1] - 1),
        text,
        font=font,
        fill=CREAM,
    )
    out = PUBLIC / "favicon.ico"
    # Multi-size ICO for browser compatibility.
    img.save(
        out,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )
    print(f"wrote {out} ({out.stat().st_size} bytes)")


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    write_og()
    write_favicon()


if __name__ == "__main__":
    main()
