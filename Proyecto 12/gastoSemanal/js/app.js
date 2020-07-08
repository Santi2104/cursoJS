//Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//clases

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

class Interfaz{
    insertarPresupuesto(cantidad){
        const span = document.querySelector('span#total');
        const span2 = document.querySelector('span#restante');

        span.innerHTML = `${cantidad}`;
        span2.innerHTML = `${cantidad}`;
    }

    imprimirMesanje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));2

        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //quitar el alert
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        },3000)
    }

    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');
        const li = document.createElement('li');

        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
            ${nombre}
            <span class = "badge badge-primary badge-pill">$ ${cantidad}</span>
        `;

        gastosListado.appendChild(li);
    }

    //Comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        //console.log(cantidadPresupuesto);
        const restante = document.querySelector('span#restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `
            ${presupuestoRestanteUsuario}
        `;

        this.comprobarPresupuesto();
    }

    //Cambia de color el presupuesto restante
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //%25 del gasto
        if((presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}


//Event
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);

    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //leer el fornulario
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    const ui = new Interfaz();

    if(nombreGasto === '' || cantidadGasto === ''){
        ui.imprimirMesanje('Hubo un error', 'error')
    }else{
        //insertar en el html
        ui.imprimirMesanje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
})