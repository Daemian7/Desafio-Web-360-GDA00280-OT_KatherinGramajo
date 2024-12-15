const express = require("express");
const router = express.Router();
const {
    createOrdenDetalle,
    getOrdenDetalles,
    getOrdenDetalleById,
    updateOrdenDetalle,
} = require("../controllers/ordendetalle");

// Rutas
router.post("/", createOrdenDetalle); // Insertar un nuevo detalle de orden
router.get("/", getOrdenDetalles); // Leer todos los detalles de orden
router.get("/:id", getOrdenDetalleById); // Leer un detalle de orden por ID
router.put("/:id", updateOrdenDetalle); // Actualizar un detalle de orden

module.exports = router;
