var intervalo = 0;
var noI = 0;

//Función que limpia cajita
function Limpiar(){
    for(var fi = 3; fi >= 0; fi--){
        for(var co = 3; co >= 0; co--){
            $("#c"+fi+"_"+co).removeClass("I").removeClass("O").removeClass("T").removeClass("S").removeClass("Z").removeClass("L").removeClass("J");
        }
    }
}

//Función que elige una pieza random para mostrar en la caja 
function Cajita(){
    var pieza = Math.round(Math.random() * 18);
    switch(pieza){
        case 0 : $("#c0_1, #c1_1, #c2_1, #c3_1").addClass("I") 
        break; 
        case 1 : $("#c0_1, #c1_1, #c0_2, #c1_2").addClass("O") 
        break;
        case 2 : $("#c0_1, #c1_0, #c1_1, #c1_2").addClass("T") 
        break;
        case 3 : $("#c0_1, #c0_2, #c1_0, #c1_1").addClass("S") 
        break;
        case 4 : $("#c0_1, #c0_2, #c1_2, #c1_3").addClass("Z") 
        break;
        case 5 : $("#c0_1, #c1_1, #c2_1, #c2_2").addClass("L") 
        break;
        case 6 : $("#c0_1, #c1_1, #c2_1, #c2_0").addClass("J") 
        break;
        case 7 : $("#c0_0, #c0_1, #c0_2, #c0_3").addClass("I") 
        break; 
        case 8 : $("#c0_1, #c1_1, #c1_2, #c2_1").addClass("T") 
        break;
        case 9 : $("#c1_1, #c0_0, #c0_1, #c0_2").addClass("T") 
        break;
        case 10 : $("#c0_1, #c1_1, #c2_1, #c1_0").addClass("T") 
        break;
        case 11 : $("#c0_1, #c1_1, #c1_2, #c2_2").addClass("S") 
        break;
        case 12 : $("#c0_1, #c1_0, #c1_1, #c2_0").addClass("Z") 
        break;
        case 13 : $("#c0_1, #c0_2, #c1_2, #c2_2").addClass("L") 
        break;
        case 14 : $("#c0_2, #c1_0, #c0_0, #c0_1").addClass("L") 
        break;
        case 15 : $("#c1_0, #c1_1, #c1_2, #c2_0").addClass("L") 
        break;
        case 16 : $("#c0_0, #c0_1, #c0_2, #c1_2").addClass("J") 
        break;
        case 17 : $("#c1_0, #c1_1, #c1_2, #c0_0").addClass("J") 
        break;
        case 18 : $("#c0_1, #c1_1, #c2_1, #c0_2").addClass("J") 
        break;
    }
}

//Función que lleva la cuenta del puntaje
function Puntaje (puntos){
    //Toma el texto del puntaje del php
    var points = $("#puntaje").text();
    //Separa la cadena, para tomar solo el valor
    points = points.split(": ");
    //Toma el valor del php y le suma puntos, setter
    $("#puntaje").text("Puntaje: "+ (parseInt(points[1]) + puntos)); 
}

//Función que copia la pieza de la cajita al juego
function Juego (){
    //Checa color en filas de abajo hacia arriba
    for(var fi = 3; fi >= 0; fi--){
        //Checa color en columnas de derecha a izquierda
        for(var co = 3; co >= 0; co--){
            if($("#c"+fi+"_"+co).hasClass("I")){
                $("#j"+fi+"_"+co).addClass("I").addClass("mov");
            }else if($("#c"+fi+"_"+co ).hasClass("O")){
                $("#j"+fi+"_"+co).addClass("O").addClass("mov");
            }else if($("#c"+fi+"_"+co ).hasClass("S")){
                $("#j"+fi+"_"+co).addClass("S").addClass("mov");
            }else if($("#c"+fi+"_"+co ).hasClass("Z")){
                $("#j"+fi+"_"+co).addClass("Z").addClass("mov");
            }else if($("#c"+fi+"_"+co ).hasClass("T")){
                $("#j"+fi+"_"+co).addClass("T").addClass("mov");
            }else if($("#c"+fi+"_"+co ).hasClass("L")){
                $("#j"+fi+"_"+co).addClass("L").addClass("mov");
            }else if($("#c"+fi+"_"+co ).hasClass("J")){
                $("#j"+fi+"_"+co).addClass("J").addClass("mov");
            }
        }
    } 
}

//Función que hace que la pieza baje
function Baja(){
    var arreglo = new Array;
    var para = 0;
    //Selecciona celdas pertenecientes a la pieza
    $(".mov").each(function(){
        //Mete id's al arreglo 
        arreglo.push($(this).attr("id"));
        //Saca id=this=f_c de cada celda y divide la cadena
        var cuad = $(this).attr("id").replace("j","").split("_");
        //Si la celda debajo de las celdas coloreadas, pertenece a otra pieza, debe parar
        if( ($("#j"+(parseInt(cuad[0])+1)+"_"+parseInt(cuad[1])).hasClass("stat")) == true ){
            para = 1;
        //Si la celda debajo de las celdas coloreadas, está en la última fila, debe parar
        }else if((parseInt(cuad[0])+1) == 20){
            para = 1;
        }
    });
    //Invierte el orden de sus elementos para recorrer de abajo hacia arriba
    arreglo.reverse();
    //Si debe parar, deja de moverse, se quita .mov, y agrega .stat y se ganan 10 puntos
    if(para == 1){
        Puntaje(10);
        $(".mov").each(function(){
            $(this).removeClass("mov").addClass("stat");
        });
        //Una vez que para, inicia el nuevo ciclo
        Rompe();
        var ciao = PerdedorPorSiempre();
        //Si no ha llegado hasta arriba, continúa el juego
        if(ciao == ""){
            Limpiar();
            Cajita();
            Juego();
            clearInterval(intervalo);
            intervalo = setInterval(Baja, 1000);
        }
        //Envía mensaje y finaliza
        else{
            var p = $("#puntaje").text();
            p = p.split(": ");
            $("#puntaje").text("Perdiste, tu puntaje final es: "+p[1]);
            document.cookie = "Puntaje="+p[1];
        }
    }
    //Si debe continuar moviéndose, lo hará
    else{
        $.each(arreglo, function(){
            //Se queda solo la clase del color
            var color = $("#"+this).attr("class").replace("mov", "").replace("celda", "").trim();          
            //Deja al valor del id separado
            var cuad = this.replace("j","").split("_");
            //A la pieza debajo le añade las clases mov y color
            $("#j"+(parseInt(cuad[0])+1)+"_"+parseInt(cuad[1])).addClass("mov").addClass(color);
            //A la pieza en la que se encontraba, le remueve clases mov y color
            $("#"+this).removeClass(color).removeClass("mov");
        });
    }
}

//Función que mueve la pieza a los lados, acelera caída y pausa o reanuda
function Teclas(e){
    if(e.code == "ArrowLeft"){
        var arreglo = new Array;
        var para = 0;
        //Selecciona celdas pertenecientes a la pieza
        $(".mov").each(function(){
            //Mete id's al arreglo 
            arreglo.push($(this).attr("id"));
            //Saca id de cada celda y divide la cadena
            var cuad = $(this).attr("id").replace("j","").split("_");
            //Si a la izquierda de las celdas coloreadas, pertenece a otra pieza, debe parar
            if( ($("#j"+parseInt(cuad[0])+"_"+(parseInt(cuad[1])-1)).hasClass("stat")) == true ){
                para = 1;
            //Si a la izquierda de las celdas coloreadas, está en la primera columna, debe parar
            }else if( (parseInt(cuad[1])-1) < 0 ){
                para = 1;
            }
        });
        //Si debe parar, deja de moverse
        //Si debe continuar moviéndose, lo hará
        if(para == 0){
            $.each(arreglo, function(){
                //Deja al valor del id separado
                var cuad = this.replace("j","").split("_");
                //Se queda solo la clase del color
                var color = $("#"+this).attr("class").replace("mov", "").replace("celda", "").trim();          
                //A la pieza de la izquierda se le añade las clases mov y color
                $("#j"+parseInt(cuad[0])+"_"+(parseInt(cuad[1])-1)).addClass("mov").addClass(color);
                //A la pieza en la que se encontraba, le remueve clases mov y color
                $("#"+this).removeClass(color).removeClass("mov");
            });
        }
    }
    else if(e.code == "ArrowRight"){
        var arreglo = new Array;
        var para = 0;
        //Selecciona celdas pertenecientes a la pieza
        $(".mov").each(function(){
            //Mete id's al arreglo 
            arreglo.push($(this).attr("id"));
            //Saca id de cada celda y divide la cadena
            var cuad = $(this).attr("id").replace("j","").split("_");
            //Si a la derecha de las celdas coloreadas, pertenece a otra pieza, debe parar
            if( ($("#j"+parseInt(cuad[0])+"_"+(parseInt(cuad[1])+1)).hasClass("stat")) == true ){
                para = 1;
            //Si a la derecha de las celdas coloreadas, está en la última columna, debe parar
            }else if( (parseInt(cuad[1])+1) > 9 ){
                para = 1;
            }
        });
        arreglo.reverse();
        //Si debe parar, deja de moverse
        //Si debe continuar moviéndose, lo hará
        if(para == 0){
            $.each(arreglo, function(){
                //Deja al valor del id separado
                var cuad = this.replace("j","").split("_");
                //Se queda solo la clase del color
                var color = $("#"+this).attr("class").replace("mov", "").replace("celda", "").trim();          
                //A la pieza de la derecha se le añade las clases mov y color
                $("#j"+parseInt(cuad[0])+"_"+(parseInt(cuad[1])+1)).addClass("mov").addClass(color);
                //A la pieza en la que se encontraba, le remueve clases mov y color
                $("#"+this).removeClass(color).removeClass("mov");
            });
        }
    }
    //Al presionar flecha abajo, se acelera la velocidad de bajada de la pieza    
    else if(e.code == "ArrowDown"){
        clearInterval(intervalo);
        intervalo = setInterval(Baja, 100);
    }
    //Pausa o reanuda el juego al presionar P
    else if(e.code == "KeyP"){
        if(noI == 0){
            clearInterval(intervalo);
            noI = clearInterval(intervalo);
        }
        else{
            clearInterval(intervalo);
            intervalo = setInterval(Baja, 1000);
            noI = 0;
        }
    }
}

//Función que rompe filas llenas
function Rompe(){
    var romper = 1;
    var fi = 19;
    //Recorre filas 
    while(fi >= 0){
        //Variable que rompe fila
        romper = 1;
        //Recorre columnas
        for(var co = 9; co >= 0; co--){
            //Si no tiene clase stat, no rompe fila y regresa al for de columna
            if( ($("#j"+fi+"_"+co).hasClass("stat")) == false ){
                romper = 0;
            }
        }
        //Va a romper la fila
        if(romper == 1){
            Puntaje(100);
            //Borra las celdas de la fila que está llena
            for(co = 9; co >= 0; co--){
                $("#j"+fi+"_"+co).removeClass("stat").removeClass("I").removeClass("O").removeClass("T").removeClass("S").removeClass("Z").removeClass("L").removeClass("J");
            }
            //Recorre filas superiores a la eliminada  (fb = fila borrada)
            for(var fb = (fi-1); fb >=0; fb--){
                //Recorre columnas de las filas (cr = columna recorrida) 
                for(var cr = 9; cr>= 0; cr--){
                    //Obtiene clase del color de la celda en la que se encuentra
                    var color = $("#j"+fb+"_"+cr).attr("class").replace("stat", "").replace("celda", "").trim();
                    //Coloca clases a la fila debajo, siempre que sea una pieza, y se las quita en donde está
                    if(color != ""){
                        $("#j"+(fb+1)+"_"+cr).addClass("stat").addClass(color);
                    }
                    $("#j"+fb+"_"+cr).removeClass("stat").removeClass(color);
                }
            }
            //Si rompe, suma una fila(20) para checar si debe romper, desde abajo
            fi++;
            //Después resta la fila, para volver a la 19
        }
        //Si no rompe, resta una fila y continua buscando para romper
        fi--;
    }
}

//Función que termina el juego al perder
function PerdedorPorSiempre(){
    var adios = "";
    //Recorre las columnas en la fila 0 
    for(var co = 9; co >= 0; co--){
        //Si está llena, deshabilita que las piezas bajen
        if($("#j0_"+co).hasClass("stat")){
            clearInterval(intervalo);
            adios = "Perdiste!";
        }
    }
    //Finaliza función y devuelve mensaje
    return adios;
}

//Ejecuta funciones
$(document).ready(function(){
    Cajita();//Escoge pieza
    Juego();//Copia pieza a juego
    intervalo = setInterval(Baja, 1000);//Baja la pieza
    document.addEventListener("keyup", Teclas);//Mueve a los lados, acelera caída y pausa o reanuda
});