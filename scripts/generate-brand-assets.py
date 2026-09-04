#!/usr/bin/env python3
"""Generate C1.1 masterbrand social assets (OG + favicon).

Does not invent R4d geometry. Typography + Ink / Porcelain / Cobalt only.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SOCIAL = PUBLIC / "social"

INK = (11, 16, 32, 255)
PORCELAIN = (247, 248, 250, 255)
COBALT = (37, 104, 255, 255)
SLATE = (51, 65, 85, 255)


def load_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def paint_atmosphere(img: Image.Image) -> None:
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    width, height = img.size
    for radius in range(max(width, height), 0, -10):
        alpha = int(18 * (1 - radius / max(width, height)))
        if alpha <= 0:
            continue
        draw.ellipse(
            [
                width * 0.78 - radius,
                height * 0.05 - radius,
                width * 0.78 + radius,
                height * 0.05 + radius,
            ],
            fill=(*COBALT[:3], alpha),
        )
        draw.ellipse(
            [
                width * 0.08 - radius * 0.7,
                height * 0.95 - radius * 0.7,
                width * 0.08 + radius * 0.7,
                height * 0.95 + radius * 0.7,
            ],
            fill=(*INK[:3], max(4, alpha // 2)),
        )
    img.alpha_composite(overlay)


def write_og() -> None:
    img = Image.new("RGBA", (1200, 630), PORCELAIN)
    paint_atmosphere(img)
    draw = ImageDraw.Draw(img)

    draw.rectangle([(96, 96), (120, 130)], fill=COBALT)

    title_font = load_font(64)
    sub_font = load_font(28)
    meta_font = load_font(22)

    draw.text((96, 190), "BlueSkyz Labs", font=title_font, fill=INK)
    draw.text(
        (96, 290),
        "We build products that make complex",
        font=sub_font,
        fill=SLATE,
    )
    draw.text(
        (96, 330),
        "things feel naturally clear.",
        font=sub_font,
        fill=SLATE,
    )
    draw.text(
        (96, 520),
        "A BlueSkyz Labs product house",
        font=meta_font,
        fill=SLATE,
    )

    SOCIAL.mkdir(parents=True, exist_ok=True)
    rgb = img.convert("RGB")
    rgb.save(PUBLIC / "og-image.png", optimize=True)
    rgb.save(SOCIAL / "og-default.png", optimize=True)


def write_favicon() -> None:
    size = 64
    img = Image.new("RGBA", (size, size), PORCELAIN)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([(8, 8), (56, 56)], radius=12, fill=INK)
    draw.rectangle([(18, 18), (28, 46)], fill=COBALT)
    img.save(PUBLIC / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (64, 64)])


def main() -> None:
    write_og()
    write_favicon()
    print("Wrote C1.1 OG + favicon assets")


if __name__ == "__main__":
    main()
