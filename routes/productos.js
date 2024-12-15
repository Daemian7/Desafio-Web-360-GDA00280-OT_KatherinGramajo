const express = require("express");
const router = express.Router();
const { getProductos, createProducto, updateProducto } = require("../controllers/productos");
const auth = require("../middleware/auth"); 

// Rutas protegidas con JWT
router.get("/", auth, getProductos); 
router.post("/", auth, createProducto); 
router.put("/:id", auth, updateProducto); 

module.exports = router;
