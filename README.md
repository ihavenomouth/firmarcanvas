# firmarcanvas
Prueba de concepto para gestionar un campo en el que se pueda firmar con el ratón o dedo.

## Uso

Añade un elemento `<canvas>` a tu HTML, indicando el ancho y el alto.
```html
<canvas id="canvasFirma" width="320" height="200"></canvas>
```

En tu código Javascript impórtalo junto con las funciones necesarias:
```js
import {firma,borrarFirma} from "./firma.js";

const canvasFirma = document.querySelector("#canvasFirma");

// Gestionamos el canvas para que se pueda firmar
firma(canvasFirma);
```

Añade un par de botones para gestionar el canvas:
```js
// Botón para borrar la firma
document.querySelector("#btnBorrar").addEventListener("click", e=>{
  borrarFirma();
});


// Botón para procesar la firma
document.querySelector("#btnFirmar").addEventListener("click", e=>{
  
  const datosEnBase64ParaEnviarAlServidor = document.querySelector("#datosEnBase64ParaEnviarAlServidor");

  //TODO: Importante - El usar toDataUrl() es cómodo, pero hace que ocupe un 33% más
  // la imagen resultante. Normalmente esto no será un problema, pero podría serlo con imágenes grandes.
  // Otra manera de hacerlo sería usar el método toBlob(), que genera los datos en binario.

  // datos de la firma: imagen en base64
  const datosBase64 = canvasFirma.toDataURL("image/png");
  
  // Se muestran los datos que se mandarían al servidor en la web
  datosEnBase64ParaEnviarAlServidor.textContent = datosBase64;

  // Se muestra la imagen que se crea con los datos que devolvería el servidor
  imagenRecuperadaDelServidor.src = datosBase64;
});
```



