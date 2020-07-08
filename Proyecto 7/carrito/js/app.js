//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.getElementById('vaciar-carrito');
//listeners

cargarEventListeners();

function cargarEventListeners(){
    // dispara cuando se precioa agregar carrito
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un producto del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar carrito
    vaciarCarritobtn.addEventListener('click', vaciarCarrito);

    //Mostrar en el documento lo que esta en el LS

    document.addEventListener('DOMContentLoaded', leerLs);
}


//Funciones
// Funcion que anaña el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //console.log(e.target.classList);
    if(e.target.classList.contains('agregar-carrito')){
        //console.log('object');
        const curso = e.target.parentElement.parentElement;
        leerDatosCursos(curso);
        //console.log(curso);
    }
}

// Lee los datos del curso
function leerDatosCursos(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
    }

    insertarCarrito(infoCurso);

    
    //console.log(infoCurso);
}

//Muestra el curso seleccionado en el carrito

function insertarCarrito(info){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${info.imagen}" width=100>
        </td>
        <td>${info.titulo}</td>
        <td>${info.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${info.id}">X</a>
        </td>
    
    `;

    listaCursos.appendChild(row);
    guardarCursoLs(info);
}
//Elimina el curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    //console.log('Borrando');
    let curso, cursoId;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        //console.log(cursoId);
    }

    eliminarCursoLs(cursoId);
}
//Elimina los cursos del carrito con el boton
function vaciarCarrito(){
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    //vacias el Ls todo de una
    vaciarLs();

}

//Almacena los cursos al LS
function guardarCursoLs(curso){
    //console.log(curso);
    let cursos;

    cursos = obtenerCursoLs();
    //el curso seleccionado se guarda en el arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
    
}
//Comprueba que haya elementos en el LS
function obtenerCursoLs(){
    let cursosLS;

    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse( localStorage.getItem('cursos'));
    }

    return cursosLS;
}

function leerLs(){
    let cursosLs;

    cursosLs = obtenerCursoLs();
    
    cursosLs.forEach(function(info){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${info.imagen}" width=100>
            </td>
            <td>${info.titulo}</td>
            <td>${info.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${info.id}">X</a>
            </td>
        
        `;
    
        listaCursos.appendChild(row);
    })
}

//Eliminar el curso del LS
function eliminarCursoLs(curso){
    let cursosLs;
    cursosLs = obtenerCursoLs();

    cursosLs.forEach(function(cursoLs, index){
        if (cursoLs.id === curso) {
            cursosLs.splice(index, 1)
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLs));
}

//Elimina todo del LS
function vaciarLs(){
    localStorage.clear();
}