//LLAMADA A FUNCIÓN SIN PARÁMETROS
btn.addEventListener('click', miFuncion); 
//OJO, llamada función SIN PARÉNTESIS, 
// SI NO, se EJECUTARÁ INMEDIATAMENTE AL CARGAR la PÁGINA y no al hacer clic en el botón!!


//LAMADA A FUNCIÓN CON PARÁMETROS CON FUNCIÓN TRADICIONAL 
//(PERMITE MANEJAR OBJETO QUE DESATA EVENTO CON this)
btn.addEventListener('click', function(){
    //this.disabled = true; //deshabilitamos el botón (para evitar que se pulse varias veces seguidas)
    miFuncion(a, 3, 'pepe');
});

//LAMADA A FUNCIÓN CON PARÁMETROS CON FUNCIÓN FLECHA 
//(MÁS SIMPLE, PERO NO PERMITE MANEJAR OBJETO QUE DESATA EVENTO CON this)
btn.addEventListener('click', () => miFuncion(a,3,'pepe')); 