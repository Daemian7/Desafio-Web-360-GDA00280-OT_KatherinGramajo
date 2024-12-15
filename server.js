const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

// Importar rutas
const productosRoutes = require("./routes/productos");
const usuariosRoutes = require("./routes/usuarios");
const clientesRoutes = require("./routes/clientes");
const ordenRoutes = require("./routes/ordenes");
const categoriaProductosRoutes = require("./routes/categorias");
const estadosRoutes = require("./routes/estados");
const ordenDetallesRoutes = require("./routes/ordendetalle");


// Configurar rutas
app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/categorias", categoriaProductosRoutes);
app.use("/api/estados", estadosRoutes);
app.use("/api/ordendetalle", ordenDetallesRoutes);

// Ruta principal (endpoint raíz "/")
app.get("/", (req, res) => {
    res.send("Servidor corriendo correctamente 🚀");
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
