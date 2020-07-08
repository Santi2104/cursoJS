//Clases
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function(){
    const base = 2000;
    let cantidad;

    switch(this.marca){
        case '1':
            cantidad = base * 1.25;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }

    //leer el año
    const dif = new Date().getFullYear() - this.anio;
    //descuento por antiguedad
    cantidad -= ((dif * 3) * cantidad) / 100;
    //Aumento por el tipo de seguro (basico - completo)
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    console.log(cantidad);
    return cantidad;
}

function Interfaz(){}

//Mensaje que se imprime en el html
Interfaz.prototype.mostrarError = function(mensaje,tipo){
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    }else{
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    },3000)
}
//Imprime el resultado
Interfaz.prototype.mostrarResultado = function(seguro, total){
    const resultado = document.getElementById('resultado');
    let marca;

    switch (seguro.marca) {
        case '1' :
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';      
            break;
        case '3':
            marca = 'Europeo';      
    }

    const div = document.createElement('div');

    div.innerHTML = `
             <p class= "header"> Tu resumen:</p>
             <p>   Marca: ${marca}</p>
             <p>  Año: ${seguro.anio}</p>
             <p>  Tipo: ${seguro.tipo}</p>
             <p>  Total: ${total}  </p>
    `;
    //agregamos el spinner
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    },3000)
    
}


//Listeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //Leer la marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value
    //console.log(marcaSeleccionada);

    //leer el año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    //console.log(anioSeleccionado);

    //Lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    //crear instancia de la interfaz
    const interfaz = new Interfaz();
    //Revisamos que los campos no esten vacios
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        //console.log('Faltan datos');
        interfaz.mostrarError('Faltan datos, revisa el formulario y prueba de nuevo','error');
    }else{
        //Limpiar resultados anteriores
        const resultado = document.querySelector('#resultado div');
        if (resultado != null) {
            resultado.remove();
        }

        //console.log('Todo Ok');
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro();
        //mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);

    }
    
});

//Variables
const max = new Date().getFullYear();
const min = max - 20;
const selectAnios = document.getElementById('anio');

for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}




//Funciones

