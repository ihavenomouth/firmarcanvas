
/**
 * Función auxiliar que sirve para saber la posición dentro del canvas en la que se produjo un evento
 * de ratón (mouseenter, mouseleave, mouseup...)
 * @param {MouseEvent|Touch} e 
 * @param {HTMLCanvasElement} canvas
 * @returns Object - Objeto {x,y} con la posición dentro del canvas 
 */
const calcularPosiciónDelEventoEnElCanvas = (e, canvas) => {
  // Posición del canvas dentro de la web
  const posiciónCanvas = canvas.getBoundingClientRect();

  //Posición  del canvas donde se ha producido el evento:
  return {
    x: e.clientX - posiciónCanvas.left,
    y: e.clientY - posiciónCanvas.top
  }

}



const característicasDeLaLínea = (ctx) => {
  // Características de la línea
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
}




/**
 * Gestiona un canva para que se pueda firmar dentro de él
 * @param {HTMLCanvasElement} canvas 
 */
const firma = (canvas) => {

  const ctx = canvas.getContext("2d");

  //Establecemos las características de la línea
  característicasDeLaLínea(ctx);

  // variable que indica si se está dibujando (el botón está pulsado) o simplemente el ratón
  // ha pasado por encima del canvas
  let dibujando = false;



  canvas.addEventListener("mousedown", e => {
    //Posición dentro del canvas donde se ha hecho click:
    const puntoInicio = calcularPosiciónDelEventoEnElCanvas(e, canvas);

    //Movemos el bolígrafo a la posición inicial y marcamos que se está dibujando
    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    dibujando = true;
  });





  canvas.addEventListener("mousemove", e => {
    //Posición dentro del canvas donde se ha movido:
    const puntoFinal = calcularPosiciónDelEventoEnElCanvas(e, canvas);

    //Dibujamos una línea desde el punto al que se estaba hasta la posición actual
    if (dibujando) {
      ctx.lineTo(puntoFinal.x, puntoFinal.y);
      ctx.stroke();
    }
  });




  canvas.addEventListener("mouseup", e => {
    //si dejamos de pulsar el botón se 
    //marca que ya no estamos dibujando 
    dibujando = false;
  });



  canvas.addEventListener("mouseleave", e => {
    //si salimos del canvas se dibuja lo que haya pendiente y se
    //marca que ya no estamos dibujando 
    dibujando = false;
  });







  canvas.addEventListener("touchstart", e => {
    e.preventDefault();

    //Posición dentro del canvas donde se ha hecho click:
    const puntoInicio = calcularPosiciónDelEventoEnElCanvas(e.touches[0], canvas);

    //Movemos el bolígrafo a la posición inicial y marcamos que se está dibujando
    ctx.beginPath();
    ctx.moveTo(puntoInicio.x, puntoInicio.y);
    dibujando = true;
  });


  canvas.addEventListener("touchmove", e => {
    e.preventDefault();

    
    //Dibujamos una línea desde el punto al que se estaba hasta la posición actual
    if (dibujando) {
      //Posición dentro del canvas donde se ha movido:
      const puntoFinal = calcularPosiciónDelEventoEnElCanvas(e.touches[0], canvas);
      ctx.lineTo(puntoFinal.x, puntoFinal.y);
      ctx.stroke();
    }
  });




  canvas.addEventListener("touchend", e => {
    //si dejamos de hacer touch se
    //marca que ya no estamos dibujando 
    dibujando = false;
  });

}



const borrarFirma = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.reset();
  //Reestablecemos las características de la línea
  característicasDeLaLínea(ctx);
}





export { firma, borrarFirma };



