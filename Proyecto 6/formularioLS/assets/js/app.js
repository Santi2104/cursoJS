//variables
const listartw = document.getElementById('lista-tweets');





//Eventos

eventListeners();

function eventListeners() {
    //Envio de form
    document.querySelector('#formulario').addEventListener("submit",
        agregarTweet)

    //borrar tw
    listartw.addEventListener('click', borrarTweet)

    // COntenido cargado

    document.addEventListener('DOMContentLoaded', localStorageLista);
}




//Añadir tw del form

function agregarTweet(e) {
    e.preventDefault();

    const tw = document.getElementById('tweet').value;

    //crear boton de borrar

    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';


    const li = document.createElement('li');

    li.innerText = tw;
    //añade el boton
    li.appendChild(botonBorrar);
    //añade el tweet
    listartw.appendChild(li);

    //añadir a local storage
    agregarTweetLocalStorage(tw);

    console.log(tw);
}


function borrarTweet(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        //console.log('click en eliminar');
        //console.log(e.target.parentElement);
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText)
        alert('tweet eliminado');
    } else {
        console.log('diste click en otra parte');
    }


}

//mostrar datos de LS en la lista

function localStorageLista() {
    let tweets;

    tweets = obtenerTwlocalStorage();

    tweets.forEach(function (tweet) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';


        const li = document.createElement('li');

        li.innerText = tweet;
        //añade el boton
        li.appendChild(botonBorrar);
        //añade el tweet
        listartw.appendChild(li);
    })
}

//añadir a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;

    tweets = obtenerTwlocalStorage();

    //añadir nuevo tw

    tweets.push(tweet);
    //convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//Comprobar que haya elementos en LS
function obtenerTwlocalStorage() {
    let tweets;

    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }

    return tweets;
}

//Eliminar tw del LSs
function borrarTweetLocalStorage(tweet) {
    let tweets = obtenerTwlocalStorage();
    // Elimina la X del Tweet
    let twBorrar = tweet.substring(0, tweet.length - 1);

    tweets.forEach(function (tweet, index) {
        if (twBorrar === tweet) {
            tweets.splice(index, 1);
        }
    })

    localStorage.setItem('tweets', JSON.stringify(tweets));
}