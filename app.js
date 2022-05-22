// Dibujando una hoja con canvas
let pantalla = document.querySelector("canvas");
let pincel = pantalla.getContext("2d");    

function dibujarHoja(){
    pincel.fillStyle = "#ddd";
    pincel.fillRect(0,0,300,400); 
    
    pincel.fillStyle = "#aaa";
    pincel.beginPath();
    pincel.arc(25, 30, 6, 0, 2*3.14);
    pincel.fill();
    pincel.beginPath();
    pincel.arc(25, 200, 6, 0, 2*3.14);
    pincel.fill();
    pincel.beginPath();
    pincel.arc(25, 370, 6, 0, 2*3.14);
    pincel.fill();
    
    pincel.fillStyle = "red";
    pincel.beginPath();
    pincel.fillRect(50,0,1,400); 
    
    for(let i=40; i<400; i+=20){
        pincel.fillStyle = "#000";
        pincel.fillRect(0,i,300,1); 
    }
    
    pincel.font = "600 15px Comic Sans MS";
    pincel.fillText("Juan Pedro", 60, 40);
    pincel.fillText("Alura", 250, 40);
    pincel.fillText("Usadas", 230, 80);
}
dibujarHoja();

// creo el conjunto de palabras.
const arrayPalabras = ["HTML", "JavaScript", "arreglos", "css", "challenge" ]; 

// Las paso a minuscula. 
const palabras = [];
arrayPalabras.forEach(palabra => palabras.push(palabra.toLowerCase())); 

// Genero una palabra random entre las que estan. 
const elegirPalabra = arrayPalabras[Math.floor(Math.random() * arrayPalabras.length)]; 
const randomPalabra = elegirPalabra.toLowerCase(); 
const reduce_randomPalabra = [... new Set(randomPalabra)]; // saco las letras que usa la palabra (no repetidas)

//console.log("Trampa Palabra Ahorcado: ", randomPalabra);

// arreglo con las letras ingresadas
const letrasMalas = [];


// Dibujo la cantidad de lugares según el largo de la palabra
for(let i = 0; i <randomPalabra.length; i++){
    pincel.strokeStyle = "blue"; 
    let espacios = i*30 + 60;
    if (i < 8 ){
        pincel.strokeText("_", espacios, 320); 
    } else{
        espacios = (i-8)*30 + 60;
        pincel.strokeText("_", espacios, 360); 
    }
}

let contador = 0;
// Funcion para dibujar al ahorcado segun la cantidad de errores
function dibujarAhorcado(cantidadErrores){
        
    switch(cantidadErrores){
        case 1: 
            // Error 1 - pie del poste
            pincel.strokeStyle = "blue"; 
            pincel.lineWidth = 2;
            pincel.moveTo(82,250);
            pincel.lineTo(50,270);
            pincel.stroke();

            pincel.moveTo(80,250);
            pincel.lineTo(110,270);
            pincel.stroke();
            break;
        case 2: 
            // Error 2 - poste
            pincel.fillStyle = "blue"
            pincel.fillRect(80,90,2,180); 
            break;
        case 3: 
            // Error 3 - horizontal arriba cabeza
            pincel.fillStyle = "blue"
            pincel.fillRect(80,90,100,2); 
            break;
        case 4: 
            // Error 4 - vertical arriba cabeza
        pincel.fillStyle = "blue"
        pincel.fillRect(180,90,2,30); 
            break;
        case 5: 
        // Error 5 - cabeza
        pincel.beginPath();
        pincel.arc(182, 130, 12, 0, 2*3.14);
        pincel.stroke();
            break;
        case 6: 
        // Error 6 - cuerpo
            pincel.fillStyle = "blue"
            pincel.fillRect(180,140,2,60); 
            break;
        case 7: 
            // Error 7 - pie izq
            pincel.moveTo(182,200);
            pincel.lineTo(160,220);
            pincel.stroke();
            break;
        case 8: 
            // Error 8 - pie der
            pincel.moveTo(182,200);
            pincel.lineTo(202,220);
            pincel.stroke();
            break;
        case 9: 
            // Error 9 -  Brazos der
            pincel.moveTo(182,150);
            pincel.lineTo(202,170);
            pincel.stroke();
            break;
        case 10: 
            // Error 10 -Brazos izq
            pincel.moveTo(182,150);
            pincel.lineTo(160,170);
            pincel.stroke();
        case 11:  
            pincel.fillStyle ="red";
            pincel.font = "600 30px Comic Sans MS";
            pincel.fillText("Perdiste", 40, 200);
    }   
}

const letrasAcertadas = [];

// Event Listener teclado 
window.addEventListener("keydown",(event)=>{

    let permitidos= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
    let letraInput = event.key.toLocaleLowerCase();

    if(permitidos.includes(letraInput)){    // aca verifico que sea solo letras, intente con regex no lo logré. 
        
        let acerto = false;
        pincel.fillStyle = "blue";
        pincel.font = "30px Arial";
        
        for(let i=0; i < randomPalabra.length; i++){
            if(letraInput == randomPalabra[i]){
                acerto = true;

                //Agrego al arreglo de acertadas si es que no esta
                if(!letrasAcertadas.includes(letraInput)){
                    letrasAcertadas.push(letraInput);
                }
                
                // Agrego la palabra segun el ligar donde se encuentra
                let espacios = i*30 + 60;
                if (i < 8 ){
                    pincel.fillText(letraInput, espacios, 315); 
                } else{
                    espacios = (i-8)*30 + 60;
                    pincel.fillText(letraInput, espacios, 355); 
                }
                
                if(letrasAcertadas.length == reduce_randomPalabra.length){ 
                    pincel.fillStyle ="green";
                    pincel.font = "600 30px Comic Sans MS";
                    pincel.fillText("Ganaste!!!", 60, 200);
                    alert("Felicidades has ganado!!!")
                    pincel.fillStyle ="blue";
                }
            }
        
        } 

        // Agrego a usadas (max 10) si no acierta y verifico que no la ingreso previamente
        if(!acerto && !letrasMalas.includes(letraInput) && contador < 10){
            letrasMalas.push(letraInput);
            contador++; 
            dibujarAhorcado(contador);
            // La dibujo en la hoja
            pincel.font = "20px Arial";
            pincel.fillText(letraInput, 240, 80+(contador*20));
        }
    }
})

// botones nuevo juego y desistir
const juegoNuevo = document.querySelector('.btn__nuevoJuego');
juegoNuevo.addEventListener("click", () => {
    location.reload();
})

const desistir = document.querySelector('.btn__desistir');
desistir.addEventListener("click", ()=>{
    for(let i=0; i<=11;i++)
    dibujarAhorcado(i);
    contador = 11;
})




// falta cartel123 o gano 

// tomar desde el celu
// agregar palabras... 