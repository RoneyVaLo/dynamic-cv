# dynamic-cv

Proyecto React + Vite para crear y descargar un currículum (CV) dinámico.

Este repositorio incluye una interfaz para editar los datos del CV y generar/descargar un PDF usando `@react-pdf/renderer`. También incorpora internacionalización (i18n) con `react-i18next` y estilos con Tailwind CSS.

Características principales

- Editor de CV en tiempo real (página principal `/`).
- Generador de PDF para descargar el currículum (ruta `/download`).
- Soporte para español e inglés (carpeta `locales/`).
- Estado global simple mediante `DataProvider` (context API).

Tecnologías

- React 19
- Vite
- Tailwind CSS
- react-router-dom
- i18next / react-i18next
- @react-pdf/renderer

Requisitos

- Node.js (recomendado >= 18)
- npm o yarn

Instalación

1. Clona el repositorio:

   git clone <repo>

2. Instala dependencias:

   npm install

Uso (scripts)

- npm run dev -> Levanta el servidor de desarrollo (Vite)
- npm run build -> Genera la versión de producción
- npm run preview -> Previsualiza la build localmente
- npm run lint -> Ejecuta ESLint sobre el proyecto

Estructura del proyecto (resumen)

- `index.html` - archivo HTML principal
- `src/main.jsx` - punto de entrada, monta React y `DataProvider`
- `src/App.jsx` - ruteo y selector de idioma (EN/ES)
- `src/i18n.js` - configuración de i18next (locales)
- `src/index.css` - estilos globales (Tailwind)
- `src/pages/ResumeEdit.jsx` - UI para editar el CV
- `src/pages/ResumeDownload.jsx` - Componente/actividad para generar/descargar el PDF
- `src/components/` - componentes UI (documento PDF y bullets reutilizables)
- `src/context/DataProvider.jsx` - provider para datos del CV
- `locales/en.json` / `locales/es.json` - traducciones

Localización
El proyecto usa `react-i18next`. El idioma seleccionado se guarda en `localStorage` (clave `lang`) y el selector de idioma en `src/App.jsx` recarga la página al cambiarlo.

Generar PDF
La generación de PDF se hace con `@react-pdf/renderer`. Revisa `src/components/ResumeDocument.jsx` y los componentes dentro de `src/components/download/` para ver cómo se mapea el estado del CV al documento PDF.

Buenas prácticas

- Mantén las traducciones actualizadas en `locales/`.
- Si agregas campos al CV, actualiza el `DataProvider` y los parsers del documento PDF.
