console.log("Xochipilli");

// let canvas = $("#juego");
// let ctx = canvas.getContext("2d");

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
          console.log("aaa")
          do{
            let n = Math.round(Math.random() * 2) + 1
            if (n == 1 && this.t1Num > 0){
              console.log("uwu")
              bool = false;
              this.t1Num--;
              this.naves.push(new Nave(j, i, 1));
            }
            else if (n == 2 && this.t2Num > 0){
              console.log("uwu")
              bool = false;
              this.t2Num--;
              this.naves.push(new Nave(j, i, 2));
            }
            else if (n == 3 && this.t3Num > 0) {
              console.log("uwu")
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
    this.widthN = (window.innerWidth*0.8)/nivel.nCols;
  }
}

let nivel1 = new Nivel(4, 5, 10, 5, 5);
console.log(nivel1.naves);