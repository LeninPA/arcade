/* Este programa es un juego inspirado en Space invaders
 * Una nave del usuario se mueve con las teclas a, d, h, y l.
 * Empieza con tres vidas que se van reduciendo cada que es golpeda con un disparo
 * Se gana si se sigue vivo para cuando lleguen los refuerzos.
 * La puntuación se guarda en una cookie y se muestra en una sitio externo
*/
// Objetos
class Nave{
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
  }
}
class NaveUsr{
  constructor(){
    this.x = 45;
    this.vidas = 3;
    this.viva = true;
    this.width = 0;
  }
}
// Creación de un proto-tablero
class Nivel{
  constructor(filNum, colNum, t1Num, t2Num, t3Num) {
    this.x = 1;
    this.y = 1;
    this.nFilas = filNum;
    this.nCols = colNum;
    /**La suma de los distintos tipos de naves debe de ser igual al 
     * producto de las filas por las columnas
     */
    this.t1Num = t1Num;
    this.t2Num = t2Num;
    this.t3Num = t3Num;
    this.filas = new Array();
    this.cols = new Array();
    this.naves = new Array();
    // Asignación aletoria de los tipos a las naves
    if ((this.nFilas * this.nCols) == (this.t1Num + this.t2Num + this.t3Num)){
      for (let i = 0; i < this.nFilas; i++){
        for (let j = 0; j < this.nCols; j++) {
          let bool = true; 
          do{
            let n = Math.round(Math.random() * 2) + 1
            if (n == 1 && this.t1Num > 0){
              bool = false;
              this.t1Num--;
              this.naves.push(new Nave(j, i, 1));
            }
            else if (n == 2 && this.t2Num > 0){
              bool = false;
              this.t2Num--;
              this.naves.push(new Nave(j, i, 2));
            }
            else if (n == 3 && this.t3Num > 0) {
              bool = false;
              this.t3Num--;
              this.naves.push(new Nave(j, i, 3));
            }
          } while (bool);
        }
      }
    }
  }
}
// Adiquiere diversos valores de Nivel, pero agrega la longitud de cada nave
class Tablero{
  constructor(nivel){
    this.cols = nivel.nCols;
    this.fil = nivel.nFilas;
    this.naves = nivel.naves;
    this.widthN = (window.innerWidth*0.5)/this.cols;
    console.log(this.widthN);
  }
  // Genera una longitud actualizada
  calcWidth(){
    this.widthN = (window.innerWidth * 0.5) / this.cols;
    return this.widthN
  }
}

// Función para dibujar las naves
function iniciaNaves(){
  let velocidad = 500;
  let direccion = 1;
  let boolDibNaves = true;
  setTimeout(function dibNaves() {
    let v = $(window).width() / 100 * direccion;
    let topPos = parseInt($("#naves").css("top")) + 20;
    let left = parseInt($("#naves").css("left"), 10);
    let navesWidth = parseInt($("#naves").css("width"), 10);
    let tabWidth = parseInt($("#tablero").css("width"), 10);
    let padding = parseInt($("#tablero").css("padding"), 10);
    let pos = left + v;
    if (left + navesWidth >= tabWidth - v + padding){
      direccion = -1;
      $("#naves").css("top", topPos + "px");
    }
    else if (left <= -padding - v) {
      direccion = 1;
      $("#naves").css("top", topPos + "px");
    }else{
      $("#naves").css("left", pos + "px");
    }
    setTimeout(() => {
      boolDibNaves = verifGanar(tab1);
      if (!boolDibNaves){
        dibNaves();
      }
    }, velocidad);
  }, velocidad);
}
// Función que genera los disparos
function dispara(naveUsr, puntuacion) {
  // Posición del disparo
  let posLeft = Math.round(Math.random() * 109) - 19;
  // Clases del disparo
  let BalaUsr = $("<div>");
  BalaUsr.addClass("bala");
  BalaUsr.addClass("advertencia");
  BalaUsr.css("top", "-45%");
  BalaUsr.css("left", 0 + "%");
  $("#tablero").append(BalaUsr)
  // Cambio de advertencia a disparo
  setTimeout(function disparoEnemigo() {
    // Tablero
    let tabWidth = parseInt($("#tablero").css("width"), 10);
    // Usuario
    let leftUsr = naveUsr.x;
    let rightUsr = naveUsr.width + leftUsr;
    //Disparo
    let left = parseInt(BalaUsr.css("left"), 10) + tabWidth * 0.13;
    let width = parseInt(BalaUsr.css("width"), 10) - tabWidth * 0.05;
    let right = left + width;
    //Cambio de clases
    BalaUsr.removeClass("advertencia");
    BalaUsr.addClass("disparo");
    setTimeout(() => {
      // Evaluación de posiciones
      if ((leftUsr < left && rightUsr > left) || (leftUsr < right && rightUsr > right)){
        $("#vida-" + naveUsr.vidas).remove();
        naveUsr.vidas--;
      }
      setTimeout(() => {
        // Actualización de la posición
        puntuacion++;
        document.cookie = "scoreTerranos=" + puntuacion;
        BalaUsr.remove();
        // Verfica si se cumplen las condiciones de victoria
        let ganar = verifGanar(tab1);
        if(ganar){
          alert("Has ganado uwu")
        }
        else{
          // De no ser así, verfica las vidas
          if(naveUsr.vidas > 0){
            //Si sigue vivo, continúa disparando
            dispara(naveUsr, puntuacion);
          }
          else if (naveUsr.vidas == 0){
            //De lo contrario, se manda al otro sitio
            window.location = "./score-terranos.html";
          }
        }
      }, 600);
    }, 50);
  }, 1000);
}
// Función que evalúa las condiciones de victoria
function verifGanar(tablero){
  //Refuerzos
  let top = parseInt($("#naves").css("top"), 10);
  let heightNaves = parseInt($("#naves").css("height"), 10);
  let padding = parseInt($("#naves").css("padding"), 10);
  //Tablero
  let heightTab = parseInt($("#tablero").css("height"), 10) - tablero.widthN - padding;

  let boolGanar = false;
  if(heightNaves + top >= heightTab){
    boolGanar = true;
    window.location = "./score-terranos.html";
  }
  return boolGanar
}

// Instanciación de nivel y tablero
let nivel1 = new Nivel(4, 6, 10, 10, 4);
let tab1 = new Tablero(nivel1);
let navesGraf = new Array();
// Dibuja las naves en el tablero
for (let i = 0; i < tab1.cols; i++) {
  navesGraf[i] = new Array();
  for (let j = 0; j < tab1.fil; j++) {
    navesGraf[i][j] = $("<div>");
    navesGraf[i][j].addClass("terrano");
    navesGraf[i][j].css("width",tab1.widthN);
    navesGraf[i][j].css("height", tab1.widthN);
    var nave;
    nivel1.naves.forEach((elem, index)=>{
      if(elem.x == i && elem.y == j){
        navesGraf[i][j].addClass("t" + elem.tipo);
      }
    })
    $("#naves").append(navesGraf[i][j]);
  }
}
// Instanciación de la nave de usuario
let jugador = new NaveUsr()
// Dibuja la nave del usuario
let naveUsrGraf = $("<div>");
naveUsrGraf.addClass("usr");
naveUsrGraf.css("width", tab1.widthN);
jugador.width = tab1.widthN;
naveUsrGraf.css("height", tab1.widthN);
$("#tablero").append(naveUsrGraf);
// En caso de cambiar el tamaño de la ventana
$(window).resize(() => {
  window.location.reload();
})
// Eventos de teclas
let empJuego = true;
$(document).keypress((event) => {
  // Medidas del tablero
  let padding = parseInt(($("#tablero").css("padding")), 10);
  let tabWidth = parseInt(($("#tablero").css("width")), 10);
  let left = parseInt(naveUsrGraf.css("left"), 10);
  // Movimiento a la izquierda
  if (event.key == 'a' || event.key == 'h') {
    let anterior = left - tabWidth / 100;
    if (anterior > -padding) {
      naveUsrGraf.css("left", anterior + "px");
      jugador.x = anterior;
    }
    if (empJuego) {
      dispara(jugador, 0, 0);
      iniciaNaves();
      empJuego = false;
    }
  }
  // Movimiento a la derecha
  else if (event.key == 'd' || event.key == 'l') {
    let anterior = left + tabWidth / 100;
    if (anterior < tabWidth - padding) {
      naveUsrGraf.css("left", anterior + "px");
      jugador.x = anterior;
    }
    if (empJuego) {
      dispara(jugador, 0, 0);
      iniciaNaves();
      empJuego = false;
    }
  }
})