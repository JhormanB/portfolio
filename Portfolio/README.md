# Portfolio — Jhorman Botello

Sitio estático para GitHub Pages.

## Estructura

- `index.html`: Página principal con secciones del portafolio
- `styles.css`: Estilos con paleta en tonos azules y diseño moderno
- `script.js`: Interacciones básicas y animaciones AOS
- `assets/`: Coloca aquí tu foto y tu CV
- `.github/workflows/deploy.yml`: Workflow para desplegar a GitHub Pages

## Cómo personalizar

1) Foto de perfil
- Reemplaza `assets/profile-placeholder.svg` por tu foto, por ejemplo `assets/profile.jpg`.
- En `index.html`, cambia el `src` de la imagen dentro de `.photo-frame` si usas otro nombre.

2) Hoja de vida (CV)
- Agrega tu PDF en `assets/Jhorman_Botello_CV.pdf` o actualiza el link de los botones "Download Resume" en `index.html`.

3) Proyectos
- En la sección `#projects`, edita los placeholders con tus proyectos reales (nombre, descripción, enlaces a demo y código).

## Despliegue

Este repo incluye un workflow que, al hacer push a `main`, publica automáticamente el sitio con GitHub Pages.

URL esperada: `https://jhormanb.github.io/portfolio/`

Si es la primera vez:
- Ve a Settings → Pages del repo y confirma que el método de despliegue es "GitHub Actions".

## Desarrollo local

Abre `index.html` directamente en el navegador o usa un servidor estático simple.

## Licencia

MIT


