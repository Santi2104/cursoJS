const ui = new Interfaz();

//Leer el formulario
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

     //leer la criptomoneda
     const criptoMonedaSelect = document.querySelector('#criptomoneda');
     const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

     if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
        ui.mostrarMensaje('Ambos campos son obligatorios','alert bg-danger text-center');
     }else{
         //consulta la api
         console.log('Todo ok');
     }

    
})