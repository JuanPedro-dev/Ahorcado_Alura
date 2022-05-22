// Guardo las palabras ingresadas aca.
const palabrasNuevas = []; 

//// Para agregar palabras... 

const textInput = document.getElementsByClassName('text--input');
const guardar = document.querySelector('.btn__guardar');
const volver = document.querySelector('.btn__volver');

volver.addEventListener("click", ()=>{
    window.history.back();
})

guardar.addEventListener("click", ()=>{
    let cadena = textInput.texto.value;
    let primerPalabra = cadena.split(" ");
    let Regex = /[a-z]/g;
    let array_emparejamientos = primerPalabra[0].match(Regex);
    palabrasNuevas.push(array_emparejamientos.join(""));
    alert("Se agrego la palabra: " + array_emparejamientos.join(""))
    console.log(palabrasNuevas);
})


export {palabrasNuevas};