console.log("Xochipilli");
function dispara(naveUsr) {
  let posLeft = Math.round(Math.random() * 107) - 19;
  let BalaUsr = $("<div>");
  BalaUsr.addClass("bala");
  BalaUsr.addClass("advertencia");
  BalaUsr.css("top", "-45%");
  BalaUsr.css("left", posLeft + "%");
  $("#tablero").append(BalaUsr)
  // let condicion = true;
  setTimeout(function moverBala() {
    let leftUsr = naveUsr.x;
    let rightUsr = naveUsr.width + leftUsr;
    console.log("UsrL: " + leftUsr);
    console.log("UsrR: " + rightUsr);
    let left = parseInt(BalaUsr.css("left"), 10);
    let width = parseInt(BalaUsr.css("width"), 10);
    let right = left + width;
    console.log("BalaL: " + left);
    console.log("BalaR: " + right);
    BalaUsr.removeClass("advertencia");
    BalaUsr.addClass("disparo");
    if ((leftUsr < left && rightUsr > left) || (leftUsr < right && rightUsr > right)){
      naveUsr.vidas--;
      console.log("Correeeeeeeeeeeeeee")
    }
    setTimeout(() => {
      console.log("uwupt2")
      BalaUsr.remove();
      if(naveUsr.vidas > 0){
        dispara(naveUsr);
      }
      else if (naveUsr.vidas == 0){
        alert("Has perdido")
      }
    }, 1000);
  }, 2000);
}
class Nave{
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    if(tipo == 1){
      this.vidas = 1;
    }
    else if (tipo == 2){
      this.vidas = 2;
    }
    else{
      this.vidas = 3;
    }
    this.viva = true;
    this.bala = false;
  }
}
class NaveUsr{
  constructor(){
    this.x = 45;
    this.vidas = 3;
    this.viva = true;
    this.disparo = false;
    this.width = 0;
  }
  dispara(){
    console.log("plas, pium");
  }
}
class Nivel{
  constructor(filNum, colNum, t1Num, t2Num, t3Num) {
    this.x = 1;
    this.y = 1;
    this.nFilas = filNum;
    this.nCols = colNum;
    this.t1Num = t1Num;
    this.t2Num = t2Num;
    this.t3Num = t3Num;
    this.filas = new Array();
    this.cols = new Array();
    this.naves = new Array();
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
  toString(){
  }
}
class Tablero{
  constructor(nivel){
    this.cols = nivel.nCols;
    this.fil = nivel.nFilas;
    this.naves = nivel.naves;
    this.widthN = (window.innerWidth*0.5)/this.cols;
    console.log(this.widthN);
  }
  calcWidth(){
    this.widthN = (window.innerWidth * 0.5) / this.cols;
    return this.widthN
  }
}

let nivel1 = new Nivel(4, 5, 10, 5, 5);
console.log(nivel1.naves);
let tab1 = new Tablero(nivel1);
console.log(tab1.widthN);
let navesGraf = new Array();
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
let jugador = new NaveUsr()
let naveUsrGraf = $("<div>");
naveUsrGraf.addClass("usr");
naveUsrGraf.css("width", tab1.widthN);
jugador.width = tab1.widthN;
naveUsrGraf.css("height", tab1.widthN);
$("#tablero").append(naveUsrGraf);
$(window).resize( () => {
  window.location.reload();
} )
//Eventos de teclas
$(document).keypress((event)=>{
  let padding = parseInt(($("#tablero").css("padding")), 10);
  let tabWidth = parseInt(($("#tablero").css("width")), 10);
  let left = parseInt(naveUsrGraf.css("left"), 10);
  if (event.key == 'a' || event.key == 'h'){
    let anterior = left - tabWidth/100;
    if (anterior > -padding){
      naveUsrGraf.css("left", anterior + "px");
      jugador.x = anterior;
    }
  }
  else if (event.key == 'd' || event.key == 'l'){
    let anterior = left + tabWidth / 100;
    if (anterior < tabWidth - padding){
      naveUsrGraf.css("left", anterior + "px");
      jugador.x = anterior;
    }
  }
})
let velocidad = 2000;
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
    if (boolDibNaves){
      dibNaves();
    }
  }, velocidad);
}, velocidad);
dispara(jugador);
//tab1.naves[0].muerte(navesGraf[tab1.naves[0].x][tab1.naves[0].y])
//tab1.naves[1].dispara(navesGraf[tab1.naves[1].x][tab1.naves[1].y])