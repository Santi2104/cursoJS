class EventBrite{
    constructor(){
        this.token_outh = '54STYCIWCGEZQI2WI6HV';
        this.ordenar = 'date';
    }
    //obtiene las categorias en init
    async obtenerCategorias(){
        //consultar las categorias a la API
        const respuestaCategorias = await fetch (`https://www.eventbriteapi.com/v3/categories/?token=${this.token_outh}`);

        //esperar las respuesta y devolver json
        const categorias = await respuestaCategorias.json();

        return categorias;
    }
    //mostrar resultado de la busqueda
    async obtenerEventos(evento, categoria){
        const repuestaEvento = await fetch('');
    }

}