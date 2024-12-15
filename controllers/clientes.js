const db = require("../db/conexion");

// Obtener todos los clientes
exports.getClientes = (req, res) => {
    const query = "SELECT * FROM clientes;";
    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Insertar un cliente usando procedimiento almacenado
exports.createCliente = (req, res) => {
    const {
        idClientes,
        razon_social,
        nombre_comercial,
        direccion_entrega,
        telefono,
        email,
    } = req.body;

    const query = `EXEC InsertarCliente 
        @idClientes = ?, 
        @razon_social = ?, 
        @nombre_comercial = ?, 
        @direccion_entrega = ?, 
        @telefono = ?, 
        @email = ?`;

    db.query(
        query,
        [idClientes, razon_social, nombre_comercial, direccion_entrega, telefono, email],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Cliente insertado exitosamente" });
        }
    );
};

// Actualizar un cliente usando procedimiento almacenado
exports.updateCliente = (req, res) => {
    const { id } = req.params; // ID del cliente a actualizar
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

    const query = `EXEC ActualizarCliente 
        @idCliente = ?, 
        @razon_social = ?, 
        @nombre_comercial = ?, 
        @direccion_entrega = ?, 
        @telefono = ?, 
        @email = ?`;

    db.query(
        query,
        [id, razon_social, nombre_comercial, direccion_entrega, telefono, email],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Cliente actualizado exitosamente" });
        }
    );
};
