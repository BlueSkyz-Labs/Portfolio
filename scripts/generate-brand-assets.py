#!/usr/bin/env python3
"""Generate C1.1 masterbrand social assets (OG + favicon).

Does not invent R4d geometry. Rasterizes the committed
public/brand/blueskyz/r4d/*.svg masters via rsvg-convert and composites
them into Porcelain canvases. Typography + Ink / Porcelain / Cobalt only.
"""

from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SOCIAL = PUBLIC / "social"
R4D_DIR = PUBLIC / "brand" / "blueskyz" / "r4d"
R4D_SYMBOL = R4D_DIR / "symbol_mono_ink.svg"
R4D_MICRO = R4D_DIR / "micro_mark_ink.svg"

INK = (11, 16, 32, 255)
PORCELAIN = (247, 248, 250, 255)
COBALT = (37, 104, 255, 255)
SLATE = (51, 65, 85, 255)


def require_r4d_symbol() -> str:
    if not R4D_SYMBOL.exists():
        raise SystemExit(f"missing committed R4d symbol: {R4D_SYMBOL}")
    if not R4D_MICRO.exists():
        raise SystemExit(f"missing committed R4d micro mark: {R4D_MICRO}")
    text = R4D_SYMBOL.read_text(encoding="utf-8")
    if "#0B1020" not in text:
        raise SystemExit("R4d symbol must remain the ink master")
    if "<path" not in text:
        raise SystemExit("R4d symbol must remain vector path data")
    return text


def rasterize_svg(svg_path: Path, size: int) -> Image.Image:
    """Rasterize an R4d SVG with rsvg-convert (exact geometry, no redraw)."""
    converter = shutil.which("rsvg-convert")
    if converter is None:
        raise SystemExit(
            "rsvg-convert is required to project committed R4d SVG bytes "
            "(install librsvg2-bin)"
        )
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
        out = Path(tmp.name)
    try:
        subprocess.run(
            [
                converter,
                f"--width={size}",
                f"--height={size}",
                "--keep-aspect-ratio",
                "--background-color=none",
                f"--output={out}",
                str(svg_path),
            ],
            check=True,
            capture_output=True,
        )
        img = Image.open(out).convert("RGBA")
    finally:
        out.unlink(missing_ok=True)
    if img.size != (size, size):
        img = img.resize((size, size), Image.Resampling.LANCZOS)
    # Guard: raster must contain ink pixels from the path, not an empty canvas.
    extrema = img.getextrema()
    alpha_max = extrema[3][1] if len(extrema) == 4 else 0
    if alpha_max < 200:
        raise SystemExit(f"rasterized {svg_path.name} has no opaque ink pixels")
    return img


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
    require_r4d_symbol()
    img = Image.new("RGBA", (1200, 630), PORCELAIN)
    paint_atmosphere(img)

    symbol = rasterize_svg(R4D_SYMBOL, 220)
    img.alpha_composite(symbol, dest=(96, 72))

    draw = ImageDraw.Draw(img)
    title_font = load_font(64)
    sub_font = load_font(28)
    meta_font = load_font(22)

    draw.text((96, 320), "BlueSkyz Labs", font=title_font, fill=INK)
    draw.text(
        (96, 400),
        "We build products that make complex",
        font=sub_font,
        fill=SLATE,
    )
    draw.text(
        (96, 440),
        "things feel naturally clear.",
        font=sub_font,
        fill=SLATE,
    )
    draw.text(
        (96, 540),
        "A BlueSkyz Labs product house",
        font=meta_font,
        fill=SLATE,
    )

    SOCIAL.mkdir(parents=True, exist_ok=True)
    rgb = img.convert("RGB")
    rgb.save(SOCIAL / "og-default.png", optimize=True)


def write_favicon() -> None:
    require_r4d_symbol()
    size = 64
    canvas = Image.new("RGBA", (size, size), PORCELAIN)
    mark = rasterize_svg(R4D_MICRO, 48)
    canvas.alpha_composite(mark, dest=(8, 8))
    canvas.save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (64, 64)],
    )


def main() -> None:
    require_r4d_symbol()
    write_og()
    write_favicon()
    print("Wrote C1.1 OG + favicon from rasterized R4d SVG masters")


if __name__ == "__main__":
    main()
