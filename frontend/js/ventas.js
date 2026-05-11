const API_PRODUCTOS = "http://localhost:3000/api/productos";
const API_VENTAS = "http://localhost:3000/api/ventas";

async function cargarProductos() {
  const response = await fetch(API_PRODUCTOS);
  const productos = await response.json();

  const select = document.getElementById("producto");
  select.innerHTML = "";

  productos.forEach(producto => {
    if (producto.stock > 0) {
      select.innerHTML += `
        <option value="${producto.id}">
          ${producto.nombre} - $${producto.precio} (Stock: ${producto.stock})
        </option>
      `;
    }
  });
}

async function cargarVentas() {
  const response = await fetch(API_VENTAS);
  const ventas = await response.json();

  const tabla = document.getElementById("tablaVentas");
  tabla.innerHTML = "";

  ventas.forEach(venta => {
    tabla.innerHTML += `
      <tr>
        <td>${venta.id}</td>
        <td>${venta.nombre}</td>
        <td>${venta.cantidad}</td>
        <td>$${venta.total}</td>
        <td>${new Date(venta.fecha).toLocaleString()}</td>
      </tr>
    `;
  });
}

async function registrarVenta() {
  const producto_id = document.getElementById("producto").value;
  const cantidad = document.getElementById("cantidad").value;

  if (!cantidad || cantidad <= 0) {
    alert("Ingresá una cantidad válida");
    return;
  }

  const response = await fetch(API_VENTAS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      producto_id,
      cantidad
    })
  });

  const data = await response.json();

  alert(data.message);

  if (data.success) {
    document.getElementById("cantidad").value = "";
    cargarProductos();
    cargarVentas();
  }
}

cargarProductos();
cargarVentas();