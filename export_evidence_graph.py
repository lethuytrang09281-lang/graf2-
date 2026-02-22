#!/usr/bin/env python3
import re, json
from pathlib import Path
import xml.etree.ElementTree as ET

TXT_FILES = [
  "pv-k.ru.txt",
  "www.pv-k.ru.txt",
  "emeds.ru.txt",
  "eltonmed.ru.txt",
  "portanapa.ru.txt",
]

RE_DOMAIN_HDR = re.compile(r"^===\s*([a-z0-9.-]+)\s*===", re.I)
RE_NS = re.compile(r"^([a-z0-9.-]+)\s+nameserver\s+=\s+([a-z0-9.-]+)\s*$", re.I)
RE_MX = re.compile(r"^([a-z0-9.-]+)\s+MX preference\s+=\s+(\d+),\s+mail exchanger\s+=\s+([a-z0-9.-]+)\s*$", re.I)
RE_A  = re.compile(r"^Address:\s+(\d{1,3}(?:\.\d{1,3}){3})\s*$")

def parse_txt(p: Path):
    dom = None
    resolver = None
    out = {"domain": None, "ns": [], "mx": [], "a": []}
    for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()

        m = RE_DOMAIN_HDR.match(line)
        if m:
            dom = m.group(1).lower()
            out["domain"] = dom
            continue

        if line.lower().startswith("сервер:"):
            resolver = line.split(":",1)[1].strip()
            continue

        m = RE_NS.match(line)
        if m and out["domain"]:
            out["ns"].append((m.group(2).lower(), resolver or "unknown", p.name))
            continue

        m = RE_MX.match(line)
        if m and out["domain"]:
            out["mx"].append((m.group(3).lower(), m.group(2), resolver or "unknown", p.name))
            continue

        m = RE_A.match(line)
        if m and out["domain"]:
            out["a"].append((m.group(1), resolver or "unknown", p.name))
            continue

    return out

def add_node(nodes, nid, label, ntype, info):
    if nid in nodes: return
    nodes[nid] = {"id": nid, "label": label, "type": ntype, "info": info}

def main():
    nodes = {}
    edges = []
    edge_id = 0

    for fn in TXT_FILES:
        p = Path(fn)
        if not p.exists():
            continue
        data = parse_txt(p)
        dom = data["domain"]
        if not dom:
            continue

        add_node(nodes, dom, dom, "anchor_domain", f"Evidence file: {p.name}")

        for ns, resolver, src in data["ns"]:
            add_node(nodes, ns, ns, "ns", "Nameserver")
            edges.append({
                "id": f"e{edge_id}", "source": dom, "target": ns, "label": "NS",
                "evidence": f"{src} | NS via {resolver}"
            }); edge_id += 1

        for mxhost, pref, resolver, src in data["mx"]:
            add_node(nodes, mxhost, mxhost, "mx", "Mail exchanger")
            edges.append({
                "id": f"e{edge_id}", "source": dom, "target": mxhost, "label": "MX",
                "evidence": f"{src} | MX pref={pref} via {resolver}"
            }); edge_id += 1

        for ip, resolver, src in data["a"]:
            add_node(nodes, ip, ip, "ip", "A record target")
            edges.append({
                "id": f"e{edge_id}", "source": dom, "target": ip, "label": "A",
                "evidence": f"{src} | A via {resolver}"
            }); edge_id += 1

    # --- JSON export (удобно для проверки)
    Path("evidence_graph.json").write_text(
        json.dumps({"nodes": list(nodes.values()), "edges": edges}, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    # --- GEXF export (Gephi)
    NS = "http://www.gexf.net/1.2draft"
    gexf = ET.Element("gexf", xmlns=NS, version="1.2")
    graph = ET.SubElement(gexf, "graph", mode="static", defaultedgetype="directed")

    # attributes
    nattrs = ET.SubElement(graph, "attributes", **{"class": "node"})
    ET.SubElement(nattrs, "attribute", id="0", title="type", type="string")
    ET.SubElement(nattrs, "attribute", id="1", title="info", type="string")

    eattrs = ET.SubElement(graph, "attributes", **{"class": "edge"})
    ET.SubElement(eattrs, "attribute", id="0", title="evidence", type="string")

    nodes_el = ET.SubElement(graph, "nodes")
    for n in nodes.values():
        n_el = ET.SubElement(nodes_el, "node", id=n["id"], label=n["label"])
        av = ET.SubElement(n_el, "attvalues")
        ET.SubElement(av, "attvalue", **{"for":"0", "value":n["type"]})
        ET.SubElement(av, "attvalue", **{"for":"1", "value":n["info"]})

    edges_el = ET.SubElement(graph, "edges")
    for e in edges:
        e_el = ET.SubElement(edges_el, "edge", id=e["id"], source=e["source"], target=e["target"], label=e["label"])
        av = ET.SubElement(e_el, "attvalues")
        ET.SubElement(av, "attvalue", **{"for":"0", "value":e["evidence"]})

    xml = ET.tostring(gexf, encoding="utf-8", xml_declaration=True)
    Path("evidence_graph.gexf").write_bytes(xml)

    print(f"OK: evidence_graph.gexf + evidence_graph.json | nodes={len(nodes)} edges={len(edges)}")

if __name__ == "__main__":
    main()