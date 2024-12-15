const db = require("../db/conexion.js");

// Insertar Orden Detalle
exports.createOrdenDetalle = (req, res) => {
    const { idOrdenDetalles, Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal } = req.body;

    const query = `
        EXEC InsertarOrdenDetalle 
        @idOrdenDetalles = ?, 
        @Orden_idOrden = ?, 
        @Productos_idProductos = ?, 
        @cantidad = ?, 
        @precio = ?, 
        @subtotal = ?
    `;

    db.query(query, [idOrdenDetalles, Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "OrdenDetalle insertado exitosamente" });
    });
};

// Leer Todos los OrdenDetalles
exports.getOrdenDetalles = (req, res) => {
    const query = "EXEC ObtenerOrdenDetalles";

    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Leer OrdenDetalle por ID
exports.getOrdenDetalleById = (req, res) => {
    const { id } = req.params;

    const query = "EXEC ObtenerOrdenDetallePorId @idOrdenDetalles = ?";

    db.query(query, [id], (err, rows) => {
        if (err || rows.length === 0)
            return res.status(404).json({ message: "OrdenDetalle no encontrado" });
        res.status(200).json(rows[0]);
    });
};

// Actualizar Orden Detalle
exports.updateOrdenDetalle = (req, res) => {
    const { id } = req.params;
    const { Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal } = req.body;

    const query = `
        EXEC ActualizarOrdenDetalle 
        @idOrdenDetalles = ?, 
        @Orden_idOrden = ?, 
        @Productos_idProductos = ?, 
        @cantidad = ?, 
        @precio = ?, 
        @subtotal = ?
    `;

    db.query(query, [id, Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "OrdenDetalle actualizado exitosamente" });
    });
};
