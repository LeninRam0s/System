// Función para validar un campo

function validarCampo(campo, regex, errorMessage, label, esObligatorio) {
  var valor = campo.value.trim();

  // Si no es obligatorio y está vacío, se considera válido
  if (!esObligatorio && valor === '') {
    ocultarErrorCampo(campo);
    return true;
  }

  var isValid = regex.test(valor);

  if (!isValid) {
    mostrarErrorCampo(campo, errorMessage, label);
  } else {
    ocultarErrorCampo(campo);
  }

  return isValid;
}

// Función para mostrar un mensaje de error en el campo

function mostrarErrorCampo(campo, errorMessage, label) {
  campo.classList.add('is-invalid');

  var parentDiv = campo.parentElement;

  var errorDiv = parentDiv.querySelector('.invalid-feedback');

  if (!errorDiv) {
    errorDiv = document.createElement('div');

    errorDiv.className = 'invalid-feedback';

    parentDiv.appendChild(errorDiv);
  }

  errorDiv.innerText = `Error en ${label}: ${errorMessage}`;
}

// Función para ocultar el mensaje de error en el campo

function ocultarErrorCampo(campo) {
  campo.classList.remove('is-invalid');

  var parentDiv = campo.parentElement;

  var errorDiv = parentDiv.querySelector('.invalid-feedback');

  if (errorDiv) {
    parentDiv.removeChild(errorDiv);
  }
}

// Función para validar campos en tiempo real
function validarEnTiempoReal(campo, regex, errorMessage, label) {
  campo.addEventListener('input', function () {
    const valor = campo.value.trim();
    if (valor === '') {
      ocultarErrorCampo(campo);
    } else {
      validarCampo(campo, regex, errorMessage, label);
    }
  });
}

// Llamada a la función para cada campo

var campos = {
  //floatingInput: ['Fecha'],

  floatingDireccion: [
    /^[A-Za-z0-9\s,'-]*$/,
    'Ingrese solo letras, numeros, espacios y guiones. Ejemplo: Calle 5, Avenida Las Rosas, Casa 3-56, Colonia San Carlos, Zona 12, San Miguel Petapa, Guatemala',
    'Direccion',
  ],
  floatingCoordenadas: [
    /^([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-\d{1,3}(\.\d+)?$/,
    'Ingree la coordenada en fomrato decimal Ejemplo: 14.634915, -90.506882',
    'Coordenadas (Latitud,Longitud)',
  ],
  floatingNombreCompleto: [
    /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
    'Ingrese un nombre completo (nombres y apellidos)',
    'Nombre Completo',
  ],
  floatingEdad: [
    /^\d+$/,
    'Ingrese la edad en años. Ej. 18, Nota: si es menor a 6 meses o se desconoce ingresar: 0 y si es mayora a 6 meses ingresar: 1',
    'Edad',
  ],
};

// Validar en tiempo real

for (var campoId in campos) {
  var campo = document.getElementById(campoId);

  validarEnTiempoReal(
    campo,
    campos[campoId][0],
    campos[campoId][1],
    campos[campoId][2]
  );
}

// Manejar el evento submit del formulario

var formulario = document.getElementById('Regsitro'); // Reemplaza 'tuFormularioId' con el ID de tu formulario

formulario.addEventListener('submit', function (event) {
  var tieneErrores = false;

  for (var campoId in campos) {
    var campo = document.getElementById(campoId);

    if (
      !validarCampo(
        campo,
        campos[campoId][0],
        campos[campoId][1],
        campos[campoId][2],
        campos[campoId][3] // Indica si es obligatorio o no
      )
    ) {
      tieneErrores = true;
    }
  }

  if (tieneErrores) {
    event.preventDefault(); // Evitar que se envíe el formulario si hay errores
  }
});

