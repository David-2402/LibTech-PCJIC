/* global use, db */

// ==========================================
// BIBLIOTECA DIGITAL - BASE DE DATOS
// ==========================================

// Seleccionar base de datos
use('biblioteca_digital');

// ==========================================
// 1. COLECCIÓN DE USUARIOS
// ==========================================

db.createCollection('usuarios');

db.usuarios.createIndex(
    { correo: 1 },
    { unique: true }
);

// ==========================================
// 2. COLECCIÓN DE LIBROS
// ==========================================

db.createCollection('libros');

db.libros.createIndex({ titulo: 1 });
db.libros.createIndex({ genero: 1 });

// ==========================================
// 3. COLECCIÓN DE COMENTARIOS
// ==========================================

db.createCollection('comentarios');

db.comentarios.createIndex({ libroId: 1 });

// ==========================================
// 4. COLECCIÓN DE PRÉSTAMOS
// ==========================================

db.createCollection('prestamos');

db.prestamos.createIndex({ usuarioId: 1 });

// ==========================================
// 5. COLECCIÓN DE FAVORITOS
// ==========================================

db.createCollection('favoritos');

db.favoritos.createIndex(
    { usuarioId: 1, libroId: 1 },
    { unique: true }
);

// ==========================================
// 6. MENSAJE DE CONFIRMACIÓN
// ==========================================

console.log('================================');
console.log('BIBLIOTECA DIGITAL');
console.log('Base de datos configurada');
console.log('Colecciones creadas correctamente');
console.log('================================');

// ==========================================
// 7. CONSULTAR COLECCIONES
// ==========================================

db.getCollectionNames();