const db = require("../db/conexion.js");

// Insertar Estado
exports.createEstado = (req, res) => {
    const { idestados, nombre } = req.body;

    const query = `
        EXEC InsertarEstado 
        @idestados = ?, 
        @nombre = ?
    `;

    db.query(query, [idestados, nombre], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Estado insertado exitosamente" });
    });
};

// Leer Todos los Estados
exports.getEstados = (req, res) => {
    const query = "EXEC ObtenerEstados";

    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Leer Estado por ID
exports.getEstadoById = (req, res) => {
    const { id } = req.params;

    const query = "EXEC ObtenerEstadoPorId @idestados = ?";

    db.query(query, [id], (err, rows) => {
        if (err || rows.length === 0)
            return res.status(404).json({ message: "Estado no encontrado" });
        res.status(200).json(rows[0]);
    });
};

// Actualizar Estado
exports.updateEstado = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    const query = `
        EXEC ActualizarEstado 
        @idestados = ?, 
        @nombre = ?
    `;

    db.query(query, [id, nombre], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Estado actualizado exitosamente" });
    });
};
