const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/conexion.js");

// Crear usuario con contraseña encriptada
exports.createUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?);";
    db.query(query, [nombre, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Usuario registrado" });
    });
};

// Login y generar JWT
exports.loginUsuario = (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM usuarios WHERE email = ?;";
    db.query(query, [email], async (err, rows) => {
        if (err || rows.length === 0) return res.status(401).json({ message: "Credenciales inválidas" });

        const validPassword = await bcrypt.compare(password, rows[0].password);
        if (!validPassword) return res.status(401).json({ message: "Credenciales inválidas" });

        const token = jwt.sign({ id: rows[0].id, email }, process.env.JWT_SECRET || "secret", { expiresIn: "24h" });
        res.status(200).json({ token });
    });
};
