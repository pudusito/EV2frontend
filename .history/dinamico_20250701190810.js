let velocidades = []; // Arreglo para almacenar velocidades

// Función para agregar una nueva velocidad
function agregarVelocidad() {
  const input = document.getElementById('velocidadInput');
  const valor = Number(input.value);

  if (input.value === "" || isNaN(valor)) return;

  velocidades.push(valor);

  let estado = '';
  let color = '';
  if (valor > 120) {
    estado = 'Exceso';
    color = 'danger';
  } else if (valor >= 60) {
    estado = 'Normal';
    color = 'success';
  } else {
    estado = 'Baja';
    color = 'warning';
  }

  mostrarVelocidades();

  const alerta = document.getElementById('alertaVelocidad');
  alerta.className = `alert alert-${color} mt-4`;
  alerta.textContent = `Última velocidad ingresada: ${valor} km/h - ${estado}`;
  alerta.classList.remove('d-none');

  input.value = "";
  input.focus();
}

// Función para mostrar todas las velocidades
function mostrarVelocidades() {
  const lista = document.getElementById('listaVelocidades');
  lista.innerHTML = "";
  velocidades.forEach((v) => {
    let estado = "";
    if (v > 120) {
      estado = "Exceso";
    } else if (v >= 60) {
      estado = "Normal";
    } else {
      estado = "Baja";
    }

    const li = document.createElement("li");
    li.textContent = `${v} km/h - ${estado}`;
    li.className = "list-group-item";
    lista.appendChild(li);
  });
}

// Función para eliminar todos los registros
function eliminarTodo() {
  velocidades = [];
  document.getElementById('listaVelocidades').innerHTML = "";
  const alerta = document.getElementById('alertaVelocidad');
  alerta.className = 'alert d-none mt-4';
  alerta.textContent = "";
  document.getElementById('velocidadInput').value = "";

  const modalEliminarTodo = bootstrap.Modal.getInstance(document.getElementById('modalEliminarTodo'));
  modalEliminarTodo.hide();
}
