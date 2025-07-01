let vehiculos = [90, 45, 130]; // arreglo inicial con velocidades

let listaVehiculos = document.getElementById("listaVehiculos"); // captura el ul
listarVehiculos(vehiculos); // muestra los vehículos

function listarVehiculos(v) {
  listaVehiculos.innerHTML = ""; // limpia la lista
  v.forEach((vel) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${vel} km/h - ${clasificarVelocidad(vel)}`;
    listaVehiculos.appendChild(li);
  });
  mostrarUltimaVelocidad(v[v.length - 1]);
}

function clasificarVelocidad(vel) {
  if (vel > 120) return "Exceso";
  if (vel >= 60) return "Normal";
  return "Baja";
}

function mostrarUltimaVelocidad(vel) {
  if (vel === undefined) return;
  const alerta = document.getElementById("alertaVelocidad");
  let clase = "";
  if (vel > 120) clase = "danger";
  else if (vel >= 60) clase = "success";
  else clase = "warning";

  alerta.className = `alert alert-${clase} mt-4`;
  alerta.textContent = `Última velocidad ingresada: ${vel} km/h - ${clasificarVelocidad(vel)}`;
  alerta.classList.remove("d-none");
}

// AGREGAR velocidad
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", agregarVelocidad);

function agregarVelocidad() {
  let valor = Number(document.getElementById("velocidad").value);
  if (isNaN(valor) || valor === 0) {
    Swal.fire({
      icon: "warning",
      title: "Ingrese una velocidad válida",
    });
    return;
  }
  vehiculos.push(valor);
  listarVehiculos(vehiculos);
  document.getElementById("velocidad").value = "";
}

// BUSCAR velocidad
let btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", buscarVelocidad);

function buscarVelocidad() {
  let buscada = Number(document.getElementById("velocidad").value);
  if (!buscada) {
    listarVehiculos(vehiculos);
    return;
  }

  let encontrados = vehiculos.filter((v) => v === buscada);
  if (encontrados.length > 0) {
    listarVehiculos(encontrados);
  } else {
    Swal.fire({
      icon: "error",
      title: "No se encontraron velocidades",
    });
  }
}

// EDITAR velocidad
let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
let btnEditar = document.getElementById("btnEditar");
let i = 0;

btnEditar.addEventListener("click", buscarVehiculoEditar);

function buscarVehiculoEditar() {
  let velocidad_buscada = Number(document.getElementById("velocidad").value);
  i = vehiculos.findIndex((v) => v === velocidad_buscada);
  if (i === -1) {
    Swal.fire({
      icon: "error",
      title: "Velocidad no encontrada para editar",
    });
  } else {
    let tituloModal = document.getElementById("modalEditarLabel");
    tituloModal.textContent = "Editando velocidad: " + vehiculos[i] + " km/h";
    modalEditar.show();
  }
}

let btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", guardarVelocidad);

function guardarVelocidad() {
  let nueva = Number(document.getElementById("tarea_nueva").value);
  if (!nueva) return;
  modalEditar.hide();
  vehiculos[i] = nueva;
  listarVehiculos(vehiculos);
}

// ELIMINAR velocidad
let modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
let btnEliminar = document.getElementById("btnEliminar");
btnEliminar.addEventListener("click", eliminarVehiculo);

function eliminarVehiculo() {
  let buscada = Number(document.getElementById("velocidad").value);
  i = vehiculos.findIndex((v) => v === buscada);
  if (i === -1) {
    Swal.fire({
      icon: "error",
      title: "Velocidad no encontrada para eliminar",
    });
  } else {
    let tituloModal = document.getElementById("modalEliminarLabel");
    tituloModal.textContent = "Eliminar velocidad: " + vehiculos[i] + " km/h";
    modalEliminar.show();
  }
}

let btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", deleteVehiculo);

function deleteVehiculo() {
  modalEliminar.hide();
  vehiculos = vehiculos.filter((v, index) => index !== i);
  listarVehiculos(vehiculos);
  Swal.fire({
    icon: "success",
    title: "Velocidad eliminada exitosamente",
  });
}

// ELIMINAR TODAS
function eliminarTodos() {
  vehiculos = [];
  listarVehiculos(vehiculos);
  document.getElementById("alertaVelocidad").className = "alert d-none mt-4";
  document.getElementById("alertaVelocidad").textContent = "";
  bootstrap.Modal.getInstance(document.getElementById("modalEliminarTodo")).hide();

  Swal.fire({
    icon: "success",
    title: "Se eliminaron todas las velocidades",
  });
}
