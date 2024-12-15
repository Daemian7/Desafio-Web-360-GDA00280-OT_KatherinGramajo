const express = require("express");
const router = express.Router();
const {
    createEstado,
    getEstados,
    getEstadoById,
    updateEstado,
} = require("../controllers/estados");

// Rutas del CRUD para Estados
router.post("/", createEstado); // Insertar un nuevo estado
router.get("/", getEstados); // Leer todos los estados
router.get("/:id", getEstadoById); // Leer un estado por ID
router.put("/:id", updateEstado); // Actualizar un estado

module.exports = router;
