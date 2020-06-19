/*Estas variables nos ayudaran para cualquier dsipositivo obteniendo el ancho y largo de la pantall*/
var w = window.innerWidth;
/*Nuestra altura sera necesaria para crear el efecto de que se vaya hacia arriba*/
var h = window.innerHeight;
//Guardamos nuestro elemento intro en una variable homonima
var intro = document.getElementsByClassName("intro")[0];
var historia = document.getElementsByClassName("historia")[0];
var parrafos = document.getElementsByClassName("parrafos")[0];
//Agregamos nuestra variable sonido
var sonido = document.getElementById("sonido");
//esta seccion lo que hara es que conforme el ancho y largo de la pantalla se le asignara el tamaño de la letra
intro.style.fontSize = w / 30 + "px";
historia.style.fontSize = w / 20 + "px";
parrafos.style.height = h + "px";
//Esta parte hara que se adaptable, en caso de que se reduzca la pantalla hara la function
//Que hara que nuestrso valores se actualizen

window.addEventListener("resize", function() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  intro.style.fontSize = w / 30 + "px";
/*Tdo el tamaño de la letra de nuestro parrafo sera proporcional al ancho de nuestra ventana*/
  historia.style.fontSize = w / 20 + "px";
  parrafos.style.height = h + "px";
  /*Fondo de estrellas*/
  inicio();
  nevada();
});
/*Esta parte nos servira para agregar dos nuevas clases una en el elemento intro y la otra en el elemento */
function animar() {
  intro.className = 'intro texto_intro animacion_intro';
  historia.className = 'historia texto_historia animacion_historia';
  sonido.play();
}


/*Fondo de estrellas*/
