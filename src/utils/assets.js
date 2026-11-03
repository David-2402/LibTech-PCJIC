// Construye la URL de un archivo que vive en la carpeta /public
// (imágenes y PDFs). encodeURI convierte espacios y tildes
// ("Acción Y Aventuras/El Código Da Vinci.pdf") en una URL válida.

export const assetUrl = (path) => `${import.meta.env.BASE_URL}${encodeURI(path)}`;
