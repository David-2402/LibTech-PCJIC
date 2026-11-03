# LibTech · React

Biblioteca digital (catálogo, lector de PDF, comentarios, modo oscuro y acceso con usuarios).
Migración a **React + Vite** del proyecto HTML/CSS/JS "LibTech 17 Junio".

## Requisitos
- Node.js LTS (20.19 o superior / 22.12 o superior) → `node -v`

## Puesta en marcha
```bash
# 1. Copia tus carpetas de PDFs dentro de public/pdfs/  (ver public/pdfs/COLOCA_AQUI_LOS_PDFS.txt)
# 2. Instala dependencias
npm install
# 3. Arranca en modo desarrollo
npm run dev          # abre http://localhost:5173
```
Para generar la versión de producción: `npm run build` (queda en `dist/`).

## Usuario de prueba
`admin` / `1234`  ·  palabra secreta: `biblioteca`

## Estructura
```
libtech-react/
├── index.html              Punto de entrada (solo contiene <div id="root">)
├── package.json · vite.config.js
├── public/                 Archivos estáticos, se sirven tal cual
│   ├── img/                libtech.png · nieves.png · poli.jfif
│   └── pdfs/               (tus carpetas de PDFs)
└── src/
    ├── main.jsx            Arranque: Router + Theme + Auth
    ├── App.jsx             Mapa de rutas
    ├── data/books.js       Catálogo de libros
    ├── services/           userService.js  (lógica de usuarios)
    ├── context/            AuthContext · ThemeContext
    ├── hooks/              useLocalStorage
    ├── utils/              storage.js · assets.js
    ├── pages/              LoginPage · CatalogPage · BookPage
    ├── components/         Header · Layout · ProtectedRoute · SchoolLogos
    │                       SearchBar · BookCard · Comments
    │   └── auth/           LoginForm · RegisterForm · RecoverForm
    └── styles/styles.css
```

## Rutas
| Ruta           | Página           | Acceso        |
|----------------|------------------|---------------|
| `/login`       | Iniciar sesión / Registro / Recuperar | Público |
| `/`            | Catálogo con buscador (`/?q=terror`)  | Con sesión |
| `/libro/:id`   | Detalle, PDF y comentarios            | Con sesión |

## Agregar un libro
1. Copia el PDF a `public/pdfs/<género>/`.
2. Añade un objeto al final de la lista en `src/data/books.js`.
