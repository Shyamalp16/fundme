from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from lxml import etree

path = Path(__file__).resolve().parents[1] / "docs" / "paypal-platform-approval-brief.docx"
tmp = path.with_suffix(".tmp.docx")
ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

with ZipFile(path, "r") as zin, ZipFile(tmp, "w", ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "word/document.xml":
            root = etree.fromstring(data)
            for table in root.xpath(".//w:tbl", namespaces=ns):
                rows = table.xpath("./w:tr", namespaces=ns)
                if rows:
                    tr_pr = rows[0].find("w:trPr", namespaces=ns)
                    if tr_pr is None:
                        tr_pr = etree.Element("{%s}trPr" % ns["w"])
                        rows[0].insert(0, tr_pr)
                    if tr_pr.find("w:tblHeader", namespaces=ns) is None:
                        etree.SubElement(tr_pr, "{%s}tblHeader" % ns["w"])
            data = etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone="yes")
        zout.writestr(item, data)

tmp.replace(path)
print(path)
