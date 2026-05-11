import express from "express";
import db from "../database/db.js";

const router = express.Router();

// Obtener historial de ventas
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      ventas.id,
      productos.nombre,
      ventas.cantidad,
      ventas.total,
      ventas.fecha
    FROM ventas
    INNER JOIN productos ON ventas.producto_id = productos.id
    ORDER BY ventas.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener ventas"
      });
    }

    res.json(result);
  });
});

// Registrar una venta
router.post("/", (req, res) => {
  const { producto_id, cantidad } = req.body;

  // Obtener datos del producto
  db.query(
    "SELECT * FROM productos WHERE id = ?",
    [producto_id],
    (err, productos) => {
      if (err || productos.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Producto no encontrado"
        });
      }

      const producto = productos[0];

      // Validar stock
      if (producto.stock < cantidad) {
        return res.json({
          success: false,
          message: "Stock insuficiente"
        });
      }

      const total = producto.precio * cantidad;
      const nuevoStock = producto.stock - cantidad;

      // Insertar venta
      db.query(
        `
        INSERT INTO ventas (producto_id, cantidad, total)
        VALUES (?, ?, ?)
        `,
        [producto_id, cantidad, total],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error al registrar venta"
            });
          }

          // Actualizar stock
          db.query(
            "UPDATE productos SET stock = ? WHERE id = ?",
            [nuevoStock, producto_id],
            (err) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: "Error al actualizar stock"
                });
              }

              res.json({
                success: true,
                message: "Venta registrada correctamente"
              });
            }
          );
        }
      );
    }
  );
});

export default router;