#!/usr/bin/env python3
"""Generate an A4 PDF with Ozon-style labels for warehouse boxes.

One box per page (one cell range per box). Each A4 page shows:
  - a large "ozon" wordmark in a blue banner at the top
  - the box's cell range centered large on the sheet for printing.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

OZON_BLUE = HexColor("#005BFF")

FONT_BOLD = "DejaVuSans-Bold"
pdfmetrics.registerFont(
    TTFont(FONT_BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
)
FONT_REG = "DejaVuSans"
pdfmetrics.registerFont(
    TTFont(FONT_REG, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
)

# One box per cell range.
CELL_RANGES = [
    (391, 396), (397, 402), (403, 408), (409, 414), (415, 420),
    (421, 426), (427, 432), (433, 438), (439, 444), (445, 450),
    (451, 456), (457, 462), (463, 468), (469, 474), (475, 480),
    (481, 486), (487, 492), (493, 498), (499, 504), (505, 510),
    (511, 516), (517, 522), (523, 528), (529, 534), (535, 540),
    (541, 546), (547, 552), (553, 558), (559, 564), (565, 570),
    (571, 576), (577, 582), (583, 588), (589, 594), (595, 600),
]

OUTPUT = "ozon/ozon_box_labels.pdf"
PNG_DIR = "ozon/png"
# Print resolution for the per-box PNG files (300 DPI = print quality).
PNG_DPI = 300


def fit_font_size(text, font, max_width, start_size):
    """Return the largest font size <= start_size so text fits max_width."""
    size = start_size
    while size > 8 and pdfmetrics.stringWidth(text, font, size) > max_width:
        size -= 1
    return size


def draw_logo(c, page_w, page_h):
    banner_h = 55 * mm
    banner_y = page_h - banner_h
    c.setFillColor(OZON_BLUE)
    c.rect(0, banner_y, page_w, banner_h, fill=1, stroke=0)
    c.setFillColor(white)
    font_size = 120
    c.setFont(FONT_BOLD, font_size)
    # Vertically center the wordmark within the banner.
    ascent = pdfmetrics.getAscent(FONT_BOLD) / 1000.0 * font_size
    descent = pdfmetrics.getDescent(FONT_BOLD) / 1000.0 * font_size
    text_h = ascent + descent
    baseline = banner_y + (banner_h - text_h) / 2 - descent
    c.drawCentredString(page_w / 2, baseline, "ozon")


def draw_cell(c, page_w, center_y, start, end):
    label = f"{start} \u2013 {end}"
    max_width = page_w - 30 * mm
    size = fit_font_size(label, FONT_BOLD, max_width, 170)
    c.setFillColor(OZON_BLUE)
    c.setFont(FONT_BOLD, size)
    c.drawCentredString(page_w / 2, center_y, label)
    # Caption under the number.
    c.setFillColor(HexColor("#444444"))
    c.setFont(FONT_REG, 30)
    c.drawCentredString(page_w / 2, center_y - 45 * mm, "\u042f\u0447\u0435\u0439\u043a\u0438")


def export_pngs():
    """Render each PDF page into its own A4 PNG file (one per box)."""
    import os
    import pymupdf

    os.makedirs(PNG_DIR, exist_ok=True)
    doc = pymupdf.open(OUTPUT)
    for page_index, (start, end) in enumerate(CELL_RANGES):
        page = doc[page_index]
        pix = page.get_pixmap(dpi=PNG_DPI)
        name = f"{page_index + 1:02d}_cells_{start}-{end}.png"
        pix.save(os.path.join(PNG_DIR, name))
    doc.close()
    print(f"Wrote {len(CELL_RANGES)} PNG files into {PNG_DIR} at {PNG_DPI} DPI")


def main():
    page_w, page_h = A4
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    for start, end in CELL_RANGES:
        c.setStrokeColor(HexColor("#CCCCCC"))
        c.setLineWidth(1)
        c.rect(10 * mm, 10 * mm, page_w - 20 * mm, page_h - 20 * mm, fill=0, stroke=1)
        draw_logo(c, page_w, page_h)
        draw_cell(c, page_w, page_h * 0.40, start, end)
        c.showPage()
    c.save()
    print(f"Wrote {OUTPUT} with {len(CELL_RANGES)} pages")
    export_pngs()


if __name__ == "__main__":
    main()
