const express = require("express");
const router = express.Router();
const { getClientes, createCliente, updateCliente } = require("../controllers/clientes");

// Rutas
router.get("/", getClientes); // Obtener todos los clientes
router.post("/", createCliente); // Insertar un cliente
router.put("/:id", updateCliente); // Actualizar un cliente

module.exports = router;
