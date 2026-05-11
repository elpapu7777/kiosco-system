const API_URL = "http://localhost:3000/api/productos";

async function cargarProductos() {
  const response = await fetch(API_URL);
  const productos = await response.json();

  const tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";

  productos.forEach(producto => {
    tabla.innerHTML += `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${producto.stock}</td>
        <td>
          <button onclick='editarProducto(${JSON.stringify(producto)})'>
            Editar
          </button>
          <button onclick='eliminarProducto(${producto.id})'>
            Eliminar
          </button>
        </td>
      </tr>
    `;
  });
}

async function guardarProducto() {
  const id = document.getElementById("productoId").value;
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;

  if (!nombre || !precio || !stock) {
    alert("Completá todos los campos");
    return;
  }

  const datos = { nombre, precio, stock };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });
  }

  limpiarFormulario();
  cargarProductos();
}

function editarProducto(producto) {
  document.getElementById("productoId").value = producto.id;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;
}

async function eliminarProducto(id) {
  if (!confirm("¿Eliminar este producto?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  cargarProductos();
}

function limpiarFormulario() {
  document.getElementById("productoId").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";
}

cargarProductos();  