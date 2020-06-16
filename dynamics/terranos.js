console.log("Xochipilli");


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
  dispara () {
    console.log("pium, pium");
  }
}
class NaveUsr extends Nave{
  constructor(x, y){
    super (x, y);
    this.vidas = 3;
    this.viva = true;
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
    console.log(this.filas * this.cols)
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
    $("#tablero").append(navesGraf[i][j]);
  }
}
let naveUsrGraf = $("<div>");
naveUsrGraf.addClass("usr");
naveUsrGraf.css("width", tab1.widthN);
naveUsrGraf.css("height", tab1.widthN);
$("#tablero").append(naveUsrGraf);
$(window).resize( () => {
  window.location.reload();
} )
$(document).keypress((event)=>{
  if (event.key == 'a' || event.key == 'h'){
    let anterior = parseInt(naveUsrGraf.css("left"), 10) - parseInt(($("#tablero").css("width")), 10)/100;
    if (anterior > parseInt(($("#tablero").css("width")), 10)*-57 / 100)
      naveUsrGraf.css("left", anterior + "px");
  }
  else if (event.key == 'd' || event.key == 'l'){
    let anterior = parseInt(naveUsrGraf.css("left"), 10) + parseInt(($("#tablero").css("width")), 10) / 100;
    if (anterior < parseInt(($("#tablero").css("width")), 10) * 45 / 100)
      naveUsrGraf.css("left", anterior + "px");
  }
})