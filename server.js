const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

// Importar rutas
const productosRoutes = require("./routes/productos");
const usuariosRoutes = require("./routes/usuarios");

// Configurar rutas
app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Ruta principal (endpoint raíz "/")
app.get("/", (req, res) => {
    res.send("Bienvenido a la API - Servidor corriendo correctamente 🚀");
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
