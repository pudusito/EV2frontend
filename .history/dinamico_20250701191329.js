let velocidades = []; // Arreglo que guarda velocidades

const inputVelocidad = document.getElementById("velocidad");
const btnAgregar = document.getElementById("btnAgregar");
const listaVehiculos = document.getElementById("listaVehiculos");
const alertaVelocidad = document.getElementById("alertaVelocidad");

btnAgregar.addEventListener("click", agregarVelocidad);

function agregarVelocidad() {
  const valor = Number(inputVelocidad.value);

  if (inputVelocidad.value === "" || isNaN(valor)) {
    Swal.fire({
      icon: "warning",
      title: "Dato inválido",
      text: "Por favor, ingresa una velocidad válida.",
    });
    return;
  }

  velocidades.push(valor);
  mostrarVelocidades();
  mostrarUltimaVelocidad(valor);
  inputVelocidad.value = "";
  inputVelocidad.focus();
}

function mostrarVelocidades() {
  listaVehiculos.innerHTML = "";
  velocidades.forEach((vel) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${vel} km/h - ${clasificarVelocidad(vel)}`;
    listaVehiculos.appendChild(li);
  });
}

function mostrarUltimaVelocidad(valor) {
  const estado = clasificarVelocidad(valor);
  let claseColor = "";

  if (valor > 120) claseColor = "danger";
  else if (valor >= 60) claseColor = "success";
  else claseColor = "warning";

  alertaVelocidad.className = `alert alert-${claseColor} mt-4`;
  alertaVelocidad.textContent = `Última velocidad ingresada: ${valor} km/h - ${estado}`;
  alertaVelocidad.classList.remove("d-none");
}

function clasificarVelocidad(vel) {
  if (vel > 120) return "Exceso";
  if (vel >= 60) return "Normal";
  return "Baja";
}

function eliminarTodos() {
  velocidades = [];
  mostrarVelocidades();
  alertaVelocidad.className = "alert d-none mt-4";
  alertaVelocidad.textContent = "";

  const modal = bootstrap.Modal.getInstance(document.getElementById("modalEliminarTodo"));
  modal.hide();

  Swal.fire({
    icon: "success",
    title: "Registros eliminados",
    text: "Se eliminaron todas las velocidades correctamente.",
  });
}
