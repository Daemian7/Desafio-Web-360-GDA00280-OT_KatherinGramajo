const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });

    try {
        const verified = jwt.verify(token, "your_jwt_secret_key");
        req.user = verified; // Almacena los datos del usuario
        next();
    } catch (err) {
        res.status(400).json({ message: "Token inválido o expirado" });
    }
};
