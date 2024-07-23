
//Funcion para encriptar las letras con expresiones regulares
function encriptar() {
    let texto = document.getElementById('encriptador').value;
    let textoEncriptado = '';

    // Reemplazar cada vocal con su cadena encriptada correspondiente
    textoEncriptado = texto.replace(/e/g, 'enter')
                           .replace(/i/g, 'imes')
                           .replace(/a/g, 'ai')
                           .replace(/o/g, 'ober')
                           .replace(/u/g, 'ufat');

    mostrarResultado(textoEncriptado);

    // Actualizar el contenido del textarea con el texto encriptado
    document.getElementById('encriptador').value = textoEncriptado;

    // Ocultar la imagen si hay texto en el textarea
    if (texto !== '') {
        ocultarImagen();
        mostrarImagenDespierto();
        
    } else {
        mostrarImagen();
        ocultarImagenDespierto();
    }
    
    //Modificar los colores de las variables 
    document.documentElement.style.transition = 'backgroundColor 3s ease';
    document.documentElement.style.setProperty('--bg-gradiente-principal', '#fc4a1a');
    document.documentElement.style.setProperty('--bg-gradiente-secundario', '#fc4a1a');
    document.documentElement.style.setProperty('--bg-gradiente-terciario', '#f7b733');
    document.documentElement.style.setProperty('--bg-gradiente-cuarto', '#FFC837');
    document.documentElement.style.setProperty('--bg-gradiente-quinto', '#FF8008');
    

}

//Funcion para desencriptar las letras con expresiones regulares
function desencriptar() {
    let texto = document.getElementById('encriptador').value;
    let textoDesencriptado = '';

    // Reemplazar cada cadena encriptada con su vocal correspondiente
    textoDesencriptado = texto.replace(/enter/g, 'e')
                              .replace(/imes/g, 'i')
                              .replace(/ai/g, 'a')
                              .replace(/ober/g, 'o')
                              .replace(/ufat/g, 'u');

    mostrarResultado(textoDesencriptado);

    // Actualizar el contenido del textarea con el texto desencriptado
    document.getElementById('encriptador').value = textoDesencriptado;

    // Mostrar la imagen si el textarea está vacío después de desencriptar
    if (textoDesencriptado === '') {
        mostrarImagen();
        ocultarImagenDespierto()
    } else {
        ocultarImagen();
        mostrarImagenDespierto();
    }

     
      //Modificar los colores de las variables 
    document.documentElement.style.transition = 'backgroundColor 3s ease';
    document.documentElement.style.setProperty('--bg-gradiente-principal', '#fc4a1a');
    document.documentElement.style.setProperty('--bg-gradiente-secundario', '#fc4a1a');
    document.documentElement.style.setProperty('--bg-gradiente-terciario', '#f7b733');
    document.documentElement.style.setProperty('--bg-gradiente-cuarto', '#FFC837');
    document.documentElement.style.setProperty('--bg-gradiente-quinto', '#FF8008');
}

function ocultarImagen() {
    let imagen = document.querySelector('.muñeco__imagen');
    imagen.style.display = 'none';
}

function ocultarImagenDespierto(){
    let imagenDespierto = document.querySelector(".muñeco_imagenDespierto")
    imagenDespierto.style.display = 'none'
}

function mostrarImagen() {
    let imagen = document.querySelector('.muñeco__imagen');
    imagen.style.display = 'block';
}

function mostrarImagenDespierto(){
    let imagenDespierto = document.querySelector('.muñeco__imagenDespierto');
    imagenDespierto.style.display = 'block';
}


//Funcion para mostrar el resultado y tambien para copiar
function mostrarResultado(resultado) {
    let mensajeNoEncontrado = document.querySelector('.mensaje__no__encontrado');
    let textoEncriptado = document.querySelector('.texto__encriptado');
    let botonCopiar = document.querySelector('.boton__copiar');

    if (resultado.trim() === '') {
        mensajeNoEncontrado.textContent = 'Ningún mensaje fue encontrado';
        textoEncriptado.textContent = 'Ingresa el texto que desees encriptar o desencriptar';
        botonCopiar.style.display = 'none'
    } else {
        mensajeNoEncontrado.textContent = '';
        textoEncriptado.textContent = resultado;
        botonCopiar.style.display = 'inline-block';
        botonCopiar.setAttribute('data-texto',resultado)
    }
}

function copiar() {
    let textoCopiar = document.querySelector('.boton__copiar').getAttribute('data-texto');
    
    // Llama a la función para copiar al portapapeles
    if (textoCopiar) {
        let exito = copiarTextoAlPortapapeles(textoCopiar);
        if (exito) {
            console.log('Texto copiado al portapapeles');
        } else {
            console.log('Error al intentar copiar el texto');
        }
    }
}

//Funcion para copiar el texto al portapapeles utilizando promesas
async function copiarTextoAlPortapapeles(texto) {
    return navigator.clipboard.writeText(texto)
        .then(() => {
            return true; // Éxito al copiar al portapapeles
        })
        .catch(err => {
            console.error('Error al intentar copiar al portapapeles:', err);
            return false; // Error al copiar al portapapeles
        });
}



// Función para verificar el contenido del textarea y deshabilitar botones si es necesario
function verificarContenido() {
    let textarea = document.getElementById('encriptador');
    let contenido = textarea.value;

    // Expresión regular para verificar si hay mayúsculas o caracteres especiales
    let regex = /[A-ZáéíóúüÁÉÍÓÚÜñÑ!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~]/;

    // Elementos del DOM
    let mensajeAdvertencia = document.querySelector('.contenedor__botones__encriptar b');
    let iconoExclamacion = document.querySelector('.contenedor__botones__encriptar img');
    let botonEncriptar = document.querySelector('.boton__encriptar');
    let botonDesencriptar = document.querySelector('.boton__desencriptar');

    if (regex.test(contenido)) {
        // Mostrar mensaje de advertencia y el ícono si hay caracteres no permitidos
        mensajeAdvertencia.style.display = 'inline';
        iconoExclamacion.style.display = 'inline';
        
        // Deshabilitar botones de encriptar y desencriptar
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
    } else {
        // Ocultar mensaje de advertencia y el ícono si no hay caracteres no permitidos
        mensajeAdvertencia.style.display = 'none';
        iconoExclamacion.style.display = 'none';

        // Habilitar botones de encriptar y desencriptar
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
    }
}

// Ejecutar verificarContenido al cargar la página para asegurarse de que el estado inicial sea correcto
window.onload = function() {
    verificarContenido();

    // Evento para verificar contenido al escribir en el textarea
    document.getElementById('encriptador').addEventListener('input', verificarContenido);
};



