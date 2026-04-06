from textwrap import wrap


OUTPUT = "QA_Checklist_Morsal_Mozneb.pdf"
PAGE_WIDTH = 612
PAGE_HEIGHT = 792
LEFT = 50
TOP = 742
BOTTOM = 52
LINE_HEIGHT = 14


def esc(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


entries = [
    ("title", "Assignment 2 QA Checklist"),
    ("text", "Student: Morsal Mozneb"),
    ("text", "Project: Portfolio Website"),
    ("text", "Issue Tracking Platform: GitHub Issues - https://github.com/morsalmozneb/Portfolio/issues"),
    ("text", "Instructor Invited as Collaborator: airrickdunfield-bcit"),
    ("space", ""),
    ("h1", "QA Checklist Summary"),
    ("text", "This checklist was used to evaluate the portfolio website for launch readiness across navigation, layout, responsive behavior, browser support, metadata, content quality, deployment, and error handling. Issues found during testing were documented in GitHub Issues, fixed, and then retested."),
    ("space", ""),
]

checklist_rows = [
    ("1", "Navigation", "Clicking the site logo from the home page should return or scroll to the top correctly", "User is returned to the top of the home page without layout or navigation issues", "Pass", "#38"),
    ("2", "Project Showcase", "Prototype iframe should fit correctly inside the device frame when zoomed or resized", "Prototype remains aligned and fully visible inside the frame", "Pass", "#39"),
    ("3", "Mobile Layout", "Device toggle buttons should wrap and remain inside the screen on smaller devices", "Buttons remain visible and do not overflow outside the layout", "Pass", "#40"),
    ("4", "Mobile UX", "Mobile logo should not overlap page headings while scrolling", "Logo does not block text or overlap important content", "Pass", "#41"),
    ("5", "Layout / Visual QA", "No black strip should appear at the bottom of the page", "Background fills the page smoothly without visible gaps", "Pass", "#42"),
    ("6", "Metadata", "Each route should have an appropriate page title", "Home, About, Projects, and Contact pages display correct page titles", "Pass", "#43"),
    ("7", "Carousel Functionality", "Desktop carousel should include working navigation arrows", "User can navigate through project items using visible controls", "Pass", "#44"),
    ("8", "Layout Containment", "Device stage wrapper should hide overflow correctly", "Elements stay inside their intended container without clipping errors", "Pass", "#45"),
    ("9", "External Links", "Footer social links should point to the correct personal profiles", "Each social link opens the correct destination", "Pass", "#46"),
    ("10", "Footer Layout", "Footer spacing should be visually consistent across pages", "Footer spacing appears balanced and consistent on all main pages", "Pass", "#47"),
    ("11", "Branding / Metadata", "Favicon should display in the browser tab", "Browser tab shows the site favicon correctly", "Pass", "#48"),
    ("12", "Social Sharing / SEO", "Open Graph tags should exist on all main pages", "Required Open Graph tags are present in the page head", "Pass", "#49"),
    ("13", "Metadata / SEO", "Meta description should exist on all main pages", "Each page includes a valid meta description tag", "Pass", "#50"),
    ("14", "Navigation / Documents", "Resume link in sidebar should function correctly", "Resume PDF opens or downloads successfully", "Pass", "#51"),
    ("15", "Error Handling", "Invalid routes should show a custom 404 page", "User sees a custom 404 page with a way back to the site", "Pass", "#52"),
]

entries.append(("h1", "Primary Checklist"))
for row in checklist_rows:
    entries.append(("h2", f"Item {row[0]} - {row[1]}"))
    entries.append(("text", f"Checklist Item: {row[2]}"))
    entries.append(("text", f"Expected Result: {row[3]}"))
    entries.append(("text", f"Status: {row[4]}"))
    entries.append(("text", f"Linked Issue: {row[5]}"))
    entries.append(("space", ""))

additional_rows = [
    ("16", "Portfolio Requirements", "Home, About, Projects, and Contact sections or pages are present", "All required portfolio sections are available and accessible", "Pass", "Core requirement met"),
    ("17", "Portfolio Requirements", "Project content is accurate and complete", "Project names, visuals, and descriptions match the intended content", "Pass", "Manual review"),
    ("18", "Browser Support", "Test site in Chrome", "Site loads and functions correctly in Chrome", "Pass", "Primary browser"),
    ("19", "Browser Support", "Test site in Safari", "Site loads and functions correctly in Safari", "Pass", "Cross-browser check"),
    ("20", "Browser Support", "Test site in Firefox if available", "Site remains functional and visually acceptable", "Pass / N/A", "Optional if tested"),
    ("21", "Responsive Design", "Test mobile screen sizes", "Layout adapts correctly to smaller screens", "Pass", "Includes prior mobile bug fixes"),
    ("22", "Responsive Design", "Test tablet screen sizes", "Layout remains readable and properly aligned", "Pass", "Tablet layout checked"),
    ("23", "Responsive Design", "Test desktop screen sizes", "Layout appears polished and consistent on desktop", "Pass", "Desktop reviewed"),
    ("24", "Content Accuracy", "No spelling mistakes or placeholder text remain", "Written content appears professional and correct", "Pass", "Manual proofreading"),
    ("25", "Content Accuracy", "Contact information is accurate", "Email, LinkedIn, and resume information are correct", "Pass", "Verified against live content"),
    ("26", "Metadata", "Canonical and social metadata are present where needed", "Metadata supports search and social sharing expectations", "Pass", "Added during QA fixes"),
    ("27", "Code Optimization", "No broken imports or missing assets in final deployment", "Site builds and deploys without asset path issues", "Pass", "Deployment retested"),
    ("28", "CMS Support", "CMS functionality review", "Not applicable because this portfolio does not use a CMS", "N/A", "Included per assignment requirement"),
    ("29", "Accessibility", "Interactive elements are clearly visible and usable", "Buttons, links, and navigation are understandable and clickable", "Pass", "Basic manual check"),
    ("30", "Deployment", "Live deployed site reflects fixed issues", "Production site matches the corrected version", "Pass", "Verified after deployment"),
]

entries.append(("h1", "Additional Launch Readiness Checklist"))
for row in additional_rows:
    entries.append(("h2", f"Item {row[0]} - {row[1]}"))
    entries.append(("text", f"Checklist Item: {row[2]}"))
    entries.append(("text", f"Expected Result: {row[3]}"))
    entries.append(("text", f"Status: {row[4]}"))
    entries.append(("text", f"Notes: {row[5]}"))
    entries.append(("space", ""))

entries.extend(
    [
        ("h1", "Bug Management Process"),
        ("text", "Issues identified during QA testing were documented in GitHub Issues using the detailed bug report format from Assignment 1. Each issue included a title, reproduction steps, expected result, actual result, labels, and retest information. After fixes were applied, each issue was retested and closed with notes describing how it was addressed."),
        ("space", ""),
        ("h1", "Testing Notes"),
        ("bullet", "Testing focused on navigation, layout consistency, browser display, responsive behavior, metadata, and content accuracy."),
        ("bullet", "GitHub Issues was used to organize and manage bugs."),
        ("bullet", "The instructor was provided with issues to retest using the linked issue tracker."),
        ("space", ""),
        ("text", "Issue Tracker Link: https://github.com/morsalmozneb/Portfolio/issues"),
    ]
)


def wrap_line(text: str, width: int):
    return wrap(text, width=width, break_long_words=False, break_on_hyphens=False) or [""]


def add_entry_to_lines(kind: str, value: str, out: list[str]):
    if kind == "title":
        out.append(("F2", 20, value))
    elif kind == "h1":
        out.append(("F2", 14, value))
    elif kind == "h2":
        for line in wrap_line(value, 80):
            out.append(("F2", 11, line))
    elif kind == "bullet":
        wrapped = wrap_line(value, 88)
        first = True
        for line in wrapped:
            out.append(("F1", 11, f"- {line}" if first else f"  {line}"))
            first = False
    elif kind == "space":
        out.append(("SPACE", 0, ""))
    else:
        for line in wrap_line(value, 92):
            out.append(("F1", 11, line))


all_lines: list[tuple[str, int, str]] = []
for kind, value in entries:
    add_entry_to_lines(kind, value, all_lines)


pages = []
current = []
remaining = TOP - BOTTOM
for font, size, text in all_lines:
    needed = LINE_HEIGHT if font != "SPACE" else 8
    if needed > remaining:
      pages.append(current)
      current = []
      remaining = TOP - BOTTOM
    current.append((font, size, text))
    remaining -= needed
if current:
    pages.append(current)


def page_stream(page_lines: list[tuple[str, int, str]], page_num: int, total: int) -> bytes:
    cmds = ["BT", f"/F1 11 Tf", f"1 0 0 1 {LEFT} {TOP} Tm"]
    first_line = True
    current_font = "F1"
    current_size = 11
    for font, size, text in page_lines:
        if font == "SPACE":
            cmds.append(f"0 {-8} Td")
            first_line = False
            continue
        if font != current_font or size != current_size:
            cmds.append(f"/{font} {size} Tf")
            current_font = font
            current_size = size
        if first_line:
            cmds.append(f"({esc(text)}) Tj")
            first_line = False
        else:
            cmds.append(f"0 {-LINE_HEIGHT} Td")
            cmds.append(f"({esc(text)}) Tj")
    cmds.append("ET")
    footer = f"BT /F1 9 Tf 1 0 0 1 {LEFT} 28 Tm (Page {page_num} of {total}) Tj ET"
    cmds.append(footer)
    return "\n".join(cmds).encode("latin-1", "replace")


objects: list[bytes] = []


def add_object(data: bytes) -> int:
    objects.append(data)
    return len(objects)


font1 = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
font2 = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

page_ids = []
content_ids = []
for i, p in enumerate(pages, start=1):
    stream = page_stream(p, i, len(pages))
    content = f"<< /Length {len(stream)} >>\nstream\n".encode() + stream + b"\nendstream"
    content_ids.append(add_object(content))
    page_ids.append(0)

pages_obj_id = add_object(b"")

for idx, content_id in enumerate(content_ids):
    page_dict = (
        f"<< /Type /Page /Parent {pages_obj_id} 0 R /MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] "
        f"/Resources << /Font << /F1 {font1} 0 R /F2 {font2} 0 R >> >> "
        f"/Contents {content_id} 0 R >>"
    ).encode()
    page_ids[idx] = add_object(page_dict)

kids = " ".join(f"{pid} 0 R" for pid in page_ids)
objects[pages_obj_id - 1] = f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>".encode()
catalog_id = add_object(f"<< /Type /Catalog /Pages {pages_obj_id} 0 R >>".encode())

pdf = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
offsets = [0]
for i, obj in enumerate(objects, start=1):
    offsets.append(len(pdf))
    pdf.extend(f"{i} 0 obj\n".encode())
    pdf.extend(obj)
    pdf.extend(b"\nendobj\n")

xref_start = len(pdf)
pdf.extend(f"xref\n0 {len(objects)+1}\n".encode())
pdf.extend(b"0000000000 65535 f \n")
for off in offsets[1:]:
    pdf.extend(f"{off:010d} 00000 n \n".encode())
pdf.extend(
    f"trailer\n<< /Size {len(objects)+1} /Root {catalog_id} 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode()
)

with open(OUTPUT, "wb") as f:
    f.write(pdf)

print(OUTPUT)
