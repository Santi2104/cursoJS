const event = new EventBrite();
const ui = new Interfaz();

document.getElementById('buscarBtn').addEventListener('click', (e) => {
    e.preventDefault();
    //leer el textp del imput buscar
    const textoBuscador = document.getElementById('evento').value;

    const seletCategorias = document.getElementById('listado-categorias')
    const categoriaSeleccionada = seletCategorias.options[seletCategorias.selectedIndex].value;
    //validar el buscar
    if(textoBuscador === ''){
        //mostrar un mensaje de alerta
        ui.mostrarMensaje('Escribe algo en el buscador', 'alert alert-danger mt-4');
    }else{
        event.obtenerEventos(textoBuscador, categoriaSeleccionada);
    }
})