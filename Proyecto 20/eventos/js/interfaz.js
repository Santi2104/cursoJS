class Interfaz{
    constructor() {
        this.init();
        //leer los resultados
        this.listado = document.getElementById('resultado-eventos');
    }

    //Metodo para cuando inicia la app
    init(){
        this.imprimirCategorias();
    }
    //imprimir categorias
    imprimirCategorias(){
        const listaCategorias = event.obtenerCategorias()
        .then(categorias => {
           const categoria = categorias.categories;
            //Seleccionar el select
            const selectCategorias = document.getElementById('listado-categorias');

            categoria.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.appendChild(document.createTextNode(cat.name_localized));
                selectCategorias.appendChild(option);
            })
        })
    }
    //Imprimir mensajes
    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.classList = clases;
        div.appendChild(document.createTextNode(mensaje));

        const buscadorDiv = document.querySelector('#buscador');
        buscadorDiv.appendChild(div);
        //quitar el alert despues de 3 segundos
        setTimeout(() => {
            this.limpiarMensaje();
        },3000)
    }

    limpiarMensaje(){
        const alert = document.querySelector('.alert');
        if(alert){
            alert.remove();
        }
    }
}