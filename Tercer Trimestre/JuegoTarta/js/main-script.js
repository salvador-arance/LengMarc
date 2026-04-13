let imgSuma = document.getElementById("suma");
let imgResta = document.getElementById("resta");

let numComensalesActual = parseFloat(document.querySelector("#numcomensales").textContent);

const baseZanahoria = parseFloat(document.getElementById("zanahoria").textContent) / numComensalesActual;
const baseHarina = parseFloat(document.querySelector("#harina").textContent) / numComensalesActual;
const baseAzucar = parseFloat(document.querySelector("#azucar").textContent) / numComensalesActual;
const baseHuevos = parseFloat(document.querySelector("#huevos").textContent) / numComensalesActual;
const baseAceite = parseFloat(document.querySelector("#aceite").textContent) / numComensalesActual;
const basePolvo = parseFloat(document.querySelector("#polvo").textContent) / numComensalesActual;
const baseCanela = parseFloat(document.querySelector("#canela").textContent) / numComensalesActual;
const baseNuez = parseFloat(document.querySelector("#nuez").textContent) / numComensalesActual;
const baseSal = parseFloat(document.querySelector("#sal").textContent) / numComensalesActual;

function actualizarReceta(nuevosComensales) {
    if (nuevosComensales < 1){
        alert("QUÉ SUERTE!! TE HAS LIBRADO DE COCINAR");
        return;
    }

    if (nuevosComensales === 10){
        alert("No vas a dar de comer a un regimiento");
        return;
    }

    numComensalesActual = nuevosComensales;
    document.getElementById("zanahoria").innerText = baseZanahoria * nuevosComensales;
    document.getElementById("harina").innerText = baseHarina * nuevosComensales;
    document.getElementById("azucar").innerText = baseAzucar * nuevosComensales;
    document.getElementById("huevos").innerText = baseHuevos * nuevosComensales;
    document.getElementById("aceite").innerText = baseAceite * nuevosComensales;

    let cucharaditas = basePolvo * nuevosComensales;

    switch(cucharaditas){
        case 0.25:
            document.getElementById("polvo").innerText = '1/4';
            document.getElementById("canela").innerText = '1/4';
            document.getElementById("nuez").innerText = '1/4';
            document.getElementById("sal").innerText = '1/4';
            break;
        case 0.5:
            document.getElementById("polvo").innerText = '1/2';
            document.getElementById("canela").innerText = '1/2';
            document.getElementById("nuez").innerText = '1/2';
            document.getElementById("sal").innerText = '1/2';
            break;
        case 0.75:
            document.getElementById("polvo").innerText = '3/4';
            document.getElementById("canela").innerText = '3/4';
            document.getElementById("nuez").innerText = '3/4';
            document.getElementById("sal").innerText = '3/4';
            break;
        default:
            document.getElementById("polvo").innerText = basePolvo * nuevosComensales;
            document.getElementById("canela").innerText = baseCanela * nuevosComensales;
            document.getElementById("nuez").innerText = baseNuez * nuevosComensales;
            document.getElementById("sal").innerText = baseSal * nuevosComensales;
            break;
    }
    
    document.getElementById("numcomensales").innerText = nuevosComensales;
}

imgSuma.addEventListener('click', () => actualizarReceta(numComensalesActual + 1));
imgResta.addEventListener('click', () => actualizarReceta(numComensalesActual - 1));