const db = require("../db/conexion.js");

// Insertar Categoría
exports.createCategoriaProducto = (req, res) => {
    const { idCategoriaProductos, usuarios_idusuarios, nombre, estados_idestados, fecha_creacion } = req.body;

    const query = `
        EXEC InsertarCategoriaProducto 
        @idCategoriaProductos = ?, 
        @usuarios_idusuarios = ?, 
        @nombre = ?, 
        @estados_idestados = ?, 
        @fecha_creacion = ?
    `;

    db.query(
        query,
        [idCategoriaProductos, usuarios_idusuarios, nombre, estados_idestados, fecha_creacion],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Categoría insertada exitosamente" });
        }
    );
};

// Leer todas las Categorías
exports.getCategoriasProductos = (req, res) => {
    const query = "EXEC ObtenerCategoriasProductos";

    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Leer Categoría por ID
exports.getCategoriaProductoById = (req, res) => {
    const { id } = req.params;

    const query = "EXEC ObtenerCategoriaProductoPorId @idCategoriaProductos = ?";

    db.query(query, [id], (err, rows) => {
        if (err || rows.length === 0)
            return res.status(404).json({ message: "Categoría no encontrada" });
        res.status(200).json(rows[0]);
    });
};

// Actualizar Categoría
exports.updateCategoriaProducto = (req, res) => {
    const { id } = req.params;
    const { usuarios_idusuarios, nombre, estados_idestados, fecha_creacion } = req.body;

    const query = `
        EXEC ActualizarCategoriaProducto 
        @idCategoriaProductos = ?, 
        @usuarios_idusuarios = ?, 
        @nombre = ?, 
        @estados_idestados = ?, 
        @fecha_creacion = ?
    `;

    db.query(
        query,
        [id, usuarios_idusuarios, nombre, estados_idestados, fecha_creacion],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Categoría actualizada exitosamente" });
        }
    );
};
