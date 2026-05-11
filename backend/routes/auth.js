import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM usuarios 
    WHERE email = ? AND password = ?
  `;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error del servidor"
      });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        message: "Login exitoso"
      });
    } else {
      res.json({
        success: false,
        message: "Credenciales incorrectas"
      });
    }
  });
});

export default router;