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
  floatingPlaca: [
    /^[A-Za-z0-9\s-]+$|^$/,
    'Ingrese una placa válida (letras, números, espacios y guiones). Ej: P-258SGE',
    'Placa',
    false,
  ],
  floatingModelo: [
    /^\d{4}$|^$/,
    'Ingrese un modelo válido de 4 dígitos (ej. 2023) o deje este campo vacío.',
    'Modelo (Año)',
    false,
  ],
  floatingMarca: [
    /^[A-Za-z0-9\s]+$|^$/,
    'Ingrese una marca válida (letras, números y espacios) o deje este campo vacío.',
    'Marca',
    false,
  ],
  floatingLinea: [
    /^[A-Za-z0-9\s]+$|^$/,
    'Ingrese una Linea de vehículo válida (letras, números y espacios) o deje este campo vacío.',
    'Linea',
    false,
  ],
  floatingColor: [
    /^[A-Za-z\s]+$|^$/,
    'Ingrese un color válido (solo letras y espacios) o deje este campo vacío.',
    'Color',
    false,
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

function mostrarPassword() {
  var cambio = document.getElementById('txtPassword');
  if (cambio.type == 'password') {
    cambio.type = 'text';
    $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
  } else {
    cambio.type = 'password';
    $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
  }
}

function togglePassword() {
  const passwordField = document.getElementById('floatingPass');
  const eyeIcon = document.getElementById('eye_icon');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
  } else {
    passwordField.type = 'password';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
  }
}
