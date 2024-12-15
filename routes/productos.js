const express = require("express");
const router = express.Router();
const { getProductos, createProducto, updateProducto } = require("../controllers/productos");
// const auth = require("../middleware/auth"); 

// Rutas protegidas con JWT
router.get("/", getProductos); 
router.post("/", createProducto); 
router.put("/:id", updateProducto); 

module.exports = router;
