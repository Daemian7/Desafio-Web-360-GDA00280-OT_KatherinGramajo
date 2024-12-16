const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/conexion.js");

// Obtener todos los usuarios
exports.getUsuarios = (req, res) => {
    const query = "SELECT * FROM usuarios;";
    db.query(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Insertar un usuario
exports.createUsuario = async (req, res) => {
    const {
        idusuarios,
        rol_idrol,
        estados_idestados,
        correo_electronico,
        nombre_completo,
        password,
        telefono,
        fecha_nacimiento,
        fecha_creacion,
        Clientes_idClientes
    } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `EXEC InsertarUsuario 
        @idusuarios = ?, 
        @rol_idrol = ?, 
        @estados_idestados = ?, 
        @correo_electronico = ?, 
        @nombre_completo = ?, 
        @password = ?, 
        @telefono = ?, 
        @fecha_nacimiento = ?, 
        @fecha_creacion = ?, 
        @Clientes_idClientes = ?`;

    db.query(
        query,
        [
            idusuarios,
            rol_idrol,
            estados_idestados,
            correo_electronico,
            nombre_completo,
            hashedPassword, // Usamos la contraseña encriptada
            telefono,
            fecha_nacimiento,
            fecha_creacion,
            Clientes_idClientes
        ],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Usuario registrado exitosamente" });
        }
    );
};

// Login y generar JWT (no cambia)
exports.loginUsuario = (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM usuarios WHERE correo_electronico = ?;";
    db.query(query, [email], async (err, rows) => {
        if (err || rows.length === 0) return res.status(401).json({ message: "Credenciales inválidas" });

        const validPassword = await bcrypt.compare(password, rows[0].password);
        if (!validPassword) return res.status(401).json({ message: "Credenciales inválidas" });

        const token = jwt.sign({ id: rows[0].idusuarios, email }, process.env.JWT_SECRET || "secret", { expiresIn: "24h" });
        res.status(200).json({ token });
    });
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
    const { id } = req.params; // ID del usuario a actualizar
    const { idusuarios, rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, Clientes_idClientes } = req.body;

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `EXEC ActualizarUsuario 
        @idusuarios = ?, 
        @rol_idrol = ?, 
        @estados_idestados = ?, 
        @correo_electronico = ?, 
        @nombre_completo = ?, 
        @password = ?, 
        @telefono = ?, 
        @fecha_nacimiento = ?, 
        @fecha_creacion = ?, 
        @Clientes_idClientes = ?`;

    db.query(
        query,
        [
            id,
            rol_idrol,
            estados_idestados,
            correo_electronico,
            nombre_completo,
            hashedPassword, // Usamos la contraseña encriptada
            telefono,
            fecha_nacimiento,
            fecha_creacion, 
            Clientes_idClientes
        ],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Usuario actualizado exitosamente" });
        }
    );
};
