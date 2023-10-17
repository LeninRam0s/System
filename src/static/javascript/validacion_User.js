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
  floatingInput: [
    /^\d{5,6}-(?:[AaPp])$/,
    'El formato 12345-P o 123456-A.',
    'NIP',
  ],
  floatingPrimerNombre: [
    /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
    'Ingrese solo letras y espacios.',
    'Primer Nombre',
  ],
  floatingSegundoNombre: [
    /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/,
    'Ingrese solo letras y espacios.',
    'Segundo Nombre',
    false,
  ],
  floatingTercerNombre: [
    /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/,
    'Ingrese solo letras y espacios.',
    'Tercer Nombre',
    false,
  ],
  floatingPrimerApellido: [
    /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
    'Ingrese solo letras y espacios.',
    'Primer Apellido',
  ],
  floatingSegundoApellido: [
    /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/,
    'Ingrese solo letras y espacios.',
    'Segundo Apellido',
    false,
  ],
  floatingTelefono: [/^\d{8}$/, 'Ingrese exactamente 8 dígitos.', 'Teléfono'],
  floatingCorreo: [
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Ingrese un correo electrónico válido.',
    'Correo Electrónico',
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



