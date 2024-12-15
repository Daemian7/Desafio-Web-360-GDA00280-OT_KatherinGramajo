const db = require("../db/conexion.js");

// Leer todas las órdenes
exports.getOrdenes = (req, res) => {
    const query = "EXEC ObtenerOrdenes;";
    db.query(query, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Leer una orden por ID
exports.getOrdenById = (req, res) => {
    const { id } = req.params;
    const query = "EXEC ObtenerOrdenPorId @idOrden = ?;";
    db.query(query, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ message: "Orden no encontrada" });
        res.status(200).json(rows[0]);
    });
};

// Insertar una nueva orden
exports.createOrden = (req, res) => {
    const {
        idOrden,
        usuarios_idusuarios,
        estados_idestados,
        fecha_creacion,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden
    } = req.body;

    const query = `EXEC InsertarOrden 
        @idOrden = ?, 
        @usuarios_idusuarios = ?, 
        @estados_idestados = ?, 
        @fecha_creacion = ?, 
        @direccion = ?, 
        @telefono = ?, 
        @correo_electronico = ?, 
        @fecha_entrega = ?, 
        @total_orden = ?;`;

    db.query(query, [
        idOrden,
        usuarios_idusuarios,
        estados_idestados,
        fecha_creacion,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden
    ], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Orden insertada exitosamente" });
    });
};

// Actualizar una orden existente
exports.updateOrden = (req, res) => {
    const { id } = req.params;
    const {
        usuarios_idusuarios,
        estados_idestados,
        fecha_creacion,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden
    } = req.body;

    const query = `EXEC ActualizarOrden 
        @idOrden = ?, 
        @usuarios_idusuarios = ?, 
        @estados_idestados = ?, 
        @fecha_creacion = ?, 
        @direccion = ?, 
        @telefono = ?, 
        @correo_electronico = ?, 
        @fecha_entrega = ?, 
        @total_orden = ?;`;

    db.query(query, [
        id,
        usuarios_idusuarios,
        estados_idestados,
        fecha_creacion,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden
    ], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Orden actualizada exitosamente" });
    });
};
