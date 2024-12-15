const db = require("../db/conexion.js");
const multer = require("multer");

// Configuración de multer para almacenar archivos en memoria como Buffer
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todos los productos
exports.getProductos = (req, res) => {
    const query = "SELECT * FROM Productos;";
    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Insertar un producto usando procedimiento almacenado y archivo
exports.createProducto = (req, res) => {
    upload.single("foto")(req, res, () => {
        const {
            idProductos,
            CategoriaProductos_idCategoriaProductos,
            usuarios_idusuarios,
            nombre,
            marca,
            codigo,
            stock,
            estados_idestados,
            precio,
            fecha_creacion,
        } = req.body;

        // Obtener la foto desde el archivo
        const foto = req.file ? req.file.buffer : null;

        const query = `EXEC InsertarProducto 
            @idProductos = ?, 
            @CategoriaProductos_idCategoriaProductos = ?, 
            @usuarios_idusuarios = ?, 
            @nombre = ?, 
            @marca = ?, 
            @codigo = ?, 
            @stock = ?, 
            @estados_idestados = ?, 
            @precio = ?, 
            @fecha_creacion = ?, 
            @foto = ?`;

        db.query(
            query,
            [
                idProductos,
                CategoriaProductos_idCategoriaProductos,
                usuarios_idusuarios,
                nombre,
                marca,
                codigo,
                stock,
                estados_idestados,
                precio,
                fecha_creacion,
                foto,
            ],
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: "Producto insertado exitosamente usando el procedimiento almacenado" });
            }
        );
    });
};

// Actualizar un producto
exports.updateProducto = (req, res) => {
    const { id } = req.params; 
    const { nombre, precio, stock } = req.body;

    const query = `UPDATE Productos 
                   SET nombre = ?, precio = ?, stock = ?
                   WHERE idProductos = ?`;

    db.query(query, [nombre, precio, stock, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Producto actualizado exitosamente" });
    });
};
