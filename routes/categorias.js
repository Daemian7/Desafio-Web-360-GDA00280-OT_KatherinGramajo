const express = require("express");
const router = express.Router();
const {
    createCategoriaProducto,
    getCategoriasProductos,
    getCategoriaProductoById,
    updateCategoriaProducto,
} = require("../controllers/categorias");

// Rutas
router.post("/", createCategoriaProducto); // Insertar una nueva categoría
router.get("/", getCategoriasProductos); // Leer todas las categorías
router.get("/:id", getCategoriaProductoById); // Leer una categoría por ID
router.put("/:id", updateCategoriaProducto); // Actualizar una categoría

module.exports = router;
