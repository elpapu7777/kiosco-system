import express from "express";
import db from "../database/db.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", (req, res) => {
  db.query("SELECT * FROM productos ORDER BY id DESC", (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error al obtener productos" });
    }
    res.json(result);
  });
});

// Crear producto
router.post("/", (req, res) => {
  const { nombre, precio, stock } = req.body;

  const sql = `
    INSERT INTO productos (nombre, precio, stock)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nombre, precio, stock], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error al crear producto" });
    }

    res.json({
      success: true,
      message: "Producto creado correctamente"
    });
  });
});

// Actualizar producto
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const sql = `
    UPDATE productos
    SET nombre = ?, precio = ?, stock = ?
    WHERE id = ?
  `;

  db.query(sql, [nombre, precio, stock, id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error al actualizar producto" });
    }

    res.json({
      success: true,
      message: "Producto actualizado correctamente"
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al eliminar producto"
      });
    }

    res.json({
      success: true,
      message: "Producto eliminado correctamente"
    });
  });
});

export default router;