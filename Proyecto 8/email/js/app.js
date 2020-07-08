// Variables
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");
const formulario = document.getElementById("enviar-mail");
const btnReset = document.getElementById('resetBtn');

eventListeners();
// listener
function eventListeners() {
    //desabilitar el boton de envio
    document.addEventListener("DOMContentLoaded", inicioApp);

    //campos del formulario
    email.addEventListener("blur", validarCampo);
    asunto.addEventListener("blur", validarCampo);
    mensaje.addEventListener("blur", validarCampo);
    btnEnviar.addEventListener("click", enviarMail);
    btnReset.addEventListener("click", resetFormulario);
}

//funciones

function inicioApp() {
    btnEnviar.disabled = true;
}

//Valida que el campo tenga algo escrito
function validarCampo() {
    //console.log('Dentro del input');
    //se valida la longitud del y texto y que no este vacio
    validarLongitud(this);

    //validar solo el email
    if (this.type === "email") {
        valdiarEmail(this);
    }

    let errores = document.querySelectorAll(".error");
    if (email.value !== "" && asunto.value !== "" && mensaje.value !== "") {
        if (errores.length === 0) {
            btnEnviar.disabled = false;
        }
    }
}

//cuando se envia el corre
function enviarMail(e) {
    //Spinner al presionar enviar
    const spinner = document.querySelector("#spinner");
    const enviado = document.createElement("img");

    spinner.style.display = "block";
    enviado.src = "img/mail.gif";
    enviado.style.display = "block";
    //Ocultar spinner y mostrar sobre
    setTimeout(function () {
        spinner.style.display = "none";
        document.querySelector("#loaders").appendChild(enviado);
        setTimeout(function () {
            enviado.remove();
            formulario.reset();
        }, 3000);
    }, 3000);

    e.preventDefault();
}

function validarLongitud(campo) {
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }
}

function valdiarEmail(campo) {
    const mensaje = campo.value;
    if (mensaje.indexOf("@") !== -1) {
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }
}

function resetFormulario(e){
    formulario.reset();
    e.preventDefault();
}
