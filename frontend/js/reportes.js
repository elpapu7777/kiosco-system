const API_PRODUCTOS = "http://localhost:3000/api/productos";
const API_VENTAS = "http://localhost:3000/api/ventas";

async function cargarReportes() {
  const responseProductos = await fetch(API_PRODUCTOS);
  const productos = await responseProductos.json();

  const responseVentas = await fetch(API_VENTAS);
  const ventas = await responseVentas.json();

  const totalProductos = productos.length;
  const stockBajo = productos.filter(producto => producto.stock < 5).length;
  const totalVentas = ventas.length;
  const montoTotal = ventas.reduce(
    (acumulado, venta) => acumulado + Number(venta.total),
    0
  );

  document.getElementById("totalProductos").innerText = totalProductos;
  document.getElementById("stockBajo").innerText = stockBajo;
  document.getElementById("totalVentas").innerText = totalVentas;
  document.getElementById("montoTotal").innerText = montoTotal.toFixed(2);
}

cargarReportes();