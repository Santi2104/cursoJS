import {API} from './api.js';
import * as UI from './interfaz.js';


UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    //obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if(artista === '' || cancion === ''){
        //Cuando los campos estan vacios
        UI.divMensaje.innerHTML = 'Error, todos los campos son obligatorios';
        UI.divMensaje.classList.add('error');
        setTimeout(() => {
            UI.divMensaje.innerHTML = '';
            UI.divMensaje.classList.remove('error');
        },3000)
    }else{
        //Formulario lleno
        const api = new API(artista, cancion);
        api.consultarApi().then(data => {
            if(data.respuesta.lyrics){
                //la cancion existe
                const letra = data.respuesta.lyrics;
                UI.divResultado.textContent = letra;
            }else{
                //la cancion no existe
                UI.divMensaje.innerHTML = 'La cancion no existe, prueba de nuevo';
                UI.divMensaje.classList.add('error');
                setTimeout(() => {
                    UI.divMensaje.innerHTML = '';
                    UI.divMensaje.classList.remove('error');
                    UI.formularioBuscar.reset();
                },3000)
            }
        })
    }
})