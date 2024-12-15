const express = require("express");
const router = express.Router();
const { createUsuario, loginUsuario } = require("../controllers/usuarios");

router.post("/register", createUsuario); // Registro
router.post("/login", loginUsuario);     // Login

module.exports = router;
