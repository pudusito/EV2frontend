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
  else clase = "danger";

  alerta.className = `alert alert-${clase} mt-4`;
  alerta.textContent = `Última velocidad ingresada: ${vel} km/h - ${clasificarVelocidad(vel)}`;
  alerta.classList.remove("d-none");
}

// Agregar velocidades
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


// Elimninar todas las velocidades
function eliminarTodos() {
  vehiculos = [];
  listarVehiculos(vehiculos);
  document.getElementById("alertaVelocidad").className = "alerta";
  document.getElementById("alertaVelocidad").textContent = "";
  bootstrap.Modal.getInstance(document.getElementById("modalEliminarTodo")).hide();

  Swal.fire({
    icon: "success",
    title: "Se eliminaron todas las velocidades",
  });
}
