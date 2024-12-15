const express = require("express");
const router = express.Router();
const { getUsuarios, createUsuario, updateUsuario } = require("../controllers/usuarios");

// Rutas para usuarios
router.get("/", getUsuarios); // Obtener todos los usuarios
router.post("/", createUsuario); // Crear un nuevo usuario
router.put("/:id", updateUsuario); // Actualizar un usuario

module.exports = router;
