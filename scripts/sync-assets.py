#!/usr/bin/env python3
"""
sync-assets.py — Embebe assets/styles.css y assets/app.js dentro de cada HTML.

Convención AEI (igual que la web RYC): el destino final es Drupal, que descarta
el <head>. Por tanto el CSS debe ir en un <style> dentro del <body> y el JS al
final del <body>. Este script toma como fuente los archivos en assets/ y los
inyecta entre marcadores HTML que delimitan los bloques generados.

Uso (desde la raíz del proyecto):
    python scripts/sync-assets.py        # sincroniza todos los HTML
    python scripts/sync-assets.py --check # solo comprueba (CI-friendly)

Marcadores en cada HTML:
    <!-- ===== CSS:BEGIN ===== -->
    <style> ... </style>
    <!-- ===== CSS:END ===== -->
    ...
    <!-- ===== JS:BEGIN ===== -->
    <script> ... </script>
    <!-- ===== JS:END ===== -->
"""
from __future__ import annotations
import re, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent   # scripts/ → raíz del proyecto
CSS  = (ROOT / "assets" / "styles.css").read_text(encoding="utf-8")
JS   = (ROOT / "assets" / "app.js").read_text(encoding="utf-8")

CSS_BLOCK = (
    "<!-- ===== CSS:BEGIN (auto-sync from assets/styles.css) ===== -->\n"
    f"<style>\n{CSS}\n</style>\n"
    "<!-- ===== CSS:END ===== -->"
)
JS_BLOCK = (
    "<!-- ===== JS:BEGIN (auto-sync from assets/app.js) ===== -->\n"
    f"<script>\n{JS}\n</script>\n"
    "<!-- ===== JS:END ===== -->"
)

CSS_RE = re.compile(r"<!-- ===== CSS:BEGIN.*?CSS:END ===== -->", re.DOTALL)
JS_RE  = re.compile(r"<!-- ===== JS:BEGIN.*?JS:END ===== -->",  re.DOTALL)

def sync_file(p: Path, check_only: bool = False) -> bool:
    src = p.read_text(encoding="utf-8")
    out = src
    out = CSS_RE.sub(lambda m: CSS_BLOCK, out, count=1)
    out = JS_RE.sub(lambda m: JS_BLOCK, out, count=1)
    if out == src:
        return False
    if not check_only:
        p.write_text(out, encoding="utf-8")
    return True

def main():
    check = "--check" in sys.argv
    htmls = sorted(ROOT.glob("*.html"))
    changed = 0
    for h in htmls:
        if sync_file(h, check_only=check):
            print(("[changed] " if not check else "[outdated] ") + h.name)
            changed += 1
        else:
            print(f"[ok]      {h.name}")
    if check and changed:
        print(f"\n{changed} archivo(s) desincronizados. Ejecuta: python sync-assets.py")
        sys.exit(1)
    print(f"\nTotal: {len(htmls)} archivos. Modificados: {changed}.")

if __name__ == "__main__":
    main()
