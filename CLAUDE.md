# Web FPU 2026 — Contexto para Claude (Propuesta A)

## Proyecto
Web informativa sobre la convocatoria FPU 2026 de la AEI (primera gestionada
por la Agencia tras el Real Decreto 265/2026). Esta es la **propuesta A**,
maqueta clásica AEI con la convención del proyecto RYC. La **propuesta B**
("WEB FPU - design") vive en una carpeta hermana y tiene su propio repo.

- Repo: https://github.com/ramirez-santigosa/FPU-web
- Pages: https://ramirez-santigosa.github.io/FPU-web/
- Referencia visual: https://ramirez-santigosa.github.io/ryc-web/

## Estructura de carpetas
```
10-WEB FPU 2026/
├── ENTRADA/01/             ← documentos fuente (no en git)
│   └── assessts/           ← imágenes del banner
├── WEB FPU/                ← repositorio git (esta propuesta)
│   ├── .gitignore  ·  CLAUDE.md  ·  README.md
│   ├── publicar.bat        ← script de publicación a GitHub
│   ├── index.html  ·  novedades-2026.html  ·  convocatoria.html
│   ├── areas-tematicas.html  ·  buscador-grupos.html
│   ├── assets/
│   │   ├── styles.css  ·  app.js          ← fuentes únicas (se embeben)
│   │   ├── banner-fpu.png  ·  banner-fpu-alt.png
│   │   ├── ilustraciones/  ← SVG (birrete, contrato, lab, universidad,
│   │   │                       globo, moneda) en estilo lineal AEI
│   │   └── fotos/          ← fotos pendientes (Y:\Dpto Audiovisual o stock)
│   └── scripts/
│       └── sync-assets.py  ← re-embebe styles.css y app.js en todos los HTML
└── WEB FPU - design/       ← propuesta B · Claude Design (pendiente)
```

## Stack y convención (igual que RYC)
- HTML5 + CSS3 con variables + JS vanilla
- **CSS y JS embebidos dentro del `<body>`** (Drupal descarta el `<head>`).
  La fuente única vive en `assets/styles.css` y `assets/app.js`; cada HTML
  contiene los bloques inyectados entre marcadores `CSS:BEGIN/END` y
  `JS:BEGIN/END`. Para regenerar tras editar los assets:
  ```bash
  python scripts/sync-assets.py        # sincroniza
  python scripts/sync-assets.py --check # solo comprueba (CI-friendly)
  ```
- **No hay `<footer>`**: la última sección es `<section class="banner-cofinanciacion">`.
- Imágenes en `assets/` (rutas relativas en GitHub Pages; cuando se porte a
  Drupal se sustituirán por URLs absolutas, igual que hicimos en RYC).
- Páginas: `index.html`, `novedades-2026.html`, `convocatoria.html`,
  `areas-tematicas.html`, `buscador-grupos.html`.

## Paleta
- `--aei-azul: #1b4c96` — principal
- `--aei-azul-oscuro: #143a73` — hover
- `--fpu-verde: #2db26a` — acento (inspirado en la flecha del banner)
- `--fondo-claro: #f0f4fa` — fondo
- `--fondo-blanco: #ffffff` — tarjetas

## Páginas
| Archivo | Contenido |
|---------|-----------|
| `index.html` | Home: hero, ¿qué es FPU?, datos clave, novedades destacadas, cuantía, convocatorias, enlaces. |
| `novedades-2026.html` | Detalle de novedades en acordeones (10 bloques). |
| `convocatoria.html` | Entidades, requisitos, dirección de tesis, cuantía, procedimiento, evaluación, plazos, obligaciones, interrupciones. |
| `areas-tematicas.html` | Listado de áreas y subáreas AEI (Anexo III). |

## Estado actual — v0.1 (07-05-2026)
Primera maqueta para revisión interna. Pendiente:
- Decidir nombre del repo en GitHub (sugerido: `fpu-web`).
- Confirmar fechas oficiales y presupuesto total cuando la convocatoria se publique.
- Posible versión en inglés cuando se estabilice la versión española.

## URLs (pendientes)
- Repositorio GitHub: por crear (sugerido `https://github.com/<usuario>/fpu-web`)
- GitHub Pages: por activar
