const express = require("express");
const router = express.Router();
const {
    getOrdenes,
    getOrdenById,
    createOrden,
    updateOrden
} = require("../controllers/ordenes.js");

// Rutas CRUD para órdenes
router.get("/", getOrdenes); // Obtener todas las órdenes
router.get("/:id", getOrdenById); // Obtener una orden por ID
router.post("/", createOrden); // Insertar una nueva orden
router.put("/:id", updateOrden); // Actualizar una orden existente

module.exports = router;
