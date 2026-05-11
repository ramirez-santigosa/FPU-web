# Web Convocatoria FPU 2026 — AEI · Propuesta A

Maqueta informativa sobre la convocatoria 2026 de las ayudas para la **Formación de Profesorado Universitario (FPU)**, primera convocatoria gestionada por la **Agencia Estatal de Investigación**.

> Esta es la **propuesta A** (Claude Code, estilo institucional AEI/RYC). La **propuesta B** ("WEB FPU - design", Claude Design) está pendiente y vivirá en una carpeta hermana.

- Repo: <https://github.com/ramirez-santigosa/FPU-web>
- Pages: <https://ramirez-santigosa.github.io/FPU-web/>

## Páginas

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Hero, "¿Por qué FPU?", "Tu camino con FPU" (timeline 4 años), descripción del programa, novedades destacadas, cuantías, CTA buscador de grupos y enlaces. |
| `novedades-2026.html` | Detalle de las 10 novedades de la convocatoria 2026 en acordeones. |
| `convocatoria.html` | Entidades, requisitos, dirección de tesis, cuantía, procedimiento, evaluación, plazos, obligaciones, interrupciones. |
| `areas-tematicas.html` | Listado completo de áreas y subáreas AEI (Anexo III). |
| `buscador-grupos.html` | Espacio reservado para el futuro buscador de grupos de investigación. |

## Estructura

```
WEB FPU/
├── .gitignore  ·  README.md  ·  CLAUDE.md
├── publicar.bat            ← script de publicación a GitHub (doble clic)
├── index.html
├── novedades-2026.html
├── convocatoria.html
├── areas-tematicas.html
├── buscador-grupos.html
├── assets/
│   ├── styles.css          ← fuente única (se embebe en cada HTML)
│   ├── app.js              ← fuente única (se embebe en cada HTML)
│   ├── banner-fpu.png
│   ├── banner-fpu-alt.png
│   ├── ilustraciones/      ← SVG (birrete, contrato, lab, universidad, globo, moneda)
│   └── fotos/              ← fotos pendientes
└── scripts/
    └── sync-assets.py      ← re-embebe styles.css y app.js en todos los HTML
```

## Stack y convención (igual que RYC)

- HTML5 + CSS3 con variables + JS vanilla.
- **CSS y JS embebidos dentro del `<body>`** (Drupal descarta el `<head>`). La fuente única vive en `assets/styles.css` y `assets/app.js`; cada HTML los contiene inyectados entre marcadores `CSS:BEGIN/END` y `JS:BEGIN/END`.
- **No hay `<footer>`**: la última sección es `<section class="banner-cofinanciacion">`.
- Ilustraciones SVG embebibles propias (estilo lineal AEI azul + verde).

Tras editar `assets/styles.css` o `assets/app.js`:

```bash
python scripts/sync-assets.py
```

## Despliegue

### Publicar a GitHub

Doble clic en `publicar.bat` (o `publicar.bat` desde CMD ya situado en la carpeta).

Después, en GitHub: **Settings → Pages → Deploy from a branch → main / root → Save**.

### Previsualizar en local

```bash
python -m http.server 8080
# abrir http://localhost:8080/
```

## Origen del contenido

- `Resumen novedades FPU 2026_V4.docx` (AEI, abril 2026)
- `Propuesta de modificaciones ayudas FPU V5 limpio.docx`
- `convocatoria FPU 2026 v1.docx`
- Real Decreto 265/2026, de 1 de abril

## Estado actual — v0.2 (11-05-2026)

- ✅ Maqueta clásica AEI con convención RYC (CSS embebido en body, sin `<footer>`).
- ✅ Hero rediseñado: banner como franja decorativa separada para evitar solapamiento con el título.
- ✅ Estética para audiencia joven: tipografía Inter, eyebrow, mini-stats, "¿Por qué FPU?" con iconos SVG, timeline "Tu camino con FPU", animaciones sutiles.
- ⏳ Fotos reales pendientes (Y:\Dpto Audiovisual\Fotos y Videos o stock).
- ⏳ Versión inglesa (`ing/`) cuando se estabilice la versión española.
- ⏳ Fechas y presupuesto total cuando la convocatoria se publique formalmente.
