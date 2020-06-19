// SELECCIONAMOS NUESTRO CANVA
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// El borde de nuestro canvas
cvs.style.border = "1px solid #0ff";

// La lineas para dibujar el canvas
ctx.lineWidth = 3;

// Las variables y constantes del juego que ocuparemos
const largo = 100;
const abajo = 50;
const ancho = 20;
const bolita_radio = 8;
let vidas = 3; // Nuestro jugador tendra 3 vidas
let score = 0;
const unidad = 10;
let nivel = 1;
const max_nivel = 3;
let lose = false;
let leftArrow = false;
let rightArrow = false;

// Creacion del tablero
const paddle = {
    x : cvs.width/2 - largo/2,
    y : cvs.height - abajo - ancho,
    width : largo,
    height : ancho,
    dx :5
}
// Dibujar nuestra paleta que utilizaremos para rebotar
function drawPaddle(){
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Controles
document.addEventListener("keydown", function(event){
   if(event.keyCode == 37){
       leftArrow = true;
   }else if(event.keyCode == 39){
       rightArrow = true;
   }
});
document.addEventListener("keyup", function(event){
   if(event.keyCode == 37){
       leftArrow = false;
   }else if(event.keyCode == 39){
       rightArrow = false;
   }
});

// movimiento de la barra
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

// creacion de la bola
const ball = {
    x : cvs.width/2,
    y : paddle.y - bolita_radio,
    radius : bolita_radio,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}

// dibujo la bola
function drawBall(){
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);

    ctx.fill();


    ctx.stroke();

    ctx.closePath();
}

// El movimiento de la bola
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// Deteccion de los choques ballWallCollision
function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        choque.play();
    }

    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        choque.play();
    }

    if(ball.y + ball.radius > cvs.height){
        vidas--; // LOSE LIFE
        vidaPerdida.play();
        resetBall();
    }
}

// Regresa bolita
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - bolita_radio;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

// Pelotita y la barra collisionan haciendo que rebote
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){

        // Sonido play cada vz que choque
        PADDLE_HIT.play();

        // Checa si la pelota choca con el paddle
        let collidePoint = ball.x - (paddle.x + paddle.width/2);

        // Normaliza los valores
        collidePoint = collidePoint / (paddle.width/2);

        // Calcula el angulo de la pelotita
        let angle = collidePoint * Math.PI/3;
        //Podriamos modificar la velocidad
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

// Creacion de los valores para nuestrso bloques de arriba
const brick = {
    row : 1,
    column : 5,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 40,
    fillColor : "#2e3548",
    strokeColor : "#FFF"
}

let bricks = [];
//Creacion de los bloques de arriba
function createBricks(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : r * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}
//Lalo a la funcion
createBricks();

// Aghora solo los dibujo
function drawBricks(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // if the brick isn't broken
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);

                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

// La collision con los bloques enemigos hara que amente nuestro puntaje
function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // Si nuestro bloqeu choca
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                    romperB.play();
                    ball.dy = - ball.dy;
                    b.status = false; //El bloque choca
                    score += unidad;
                }
            }
        }
    }
}

// Muestra el estado de nuestro juego incorporando nuestras imagenes
function showGameStats(text, textX, textY, img, imgX, imgY){
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);

    // dibujar imagenes
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

// Con esta funcion llamaremos a nuestras funciones creadas anteriormente y ademas esaremos actualizansdo nuestras vidas y puntajes y niveles
function draw(){
    drawPaddle();

    drawBall();

    drawBricks();

    // Mostrar el score
    showGameStats(score, 35, 25, scoreiImagen, 5, 5);
    // Mostrar las vidas
    showGameStats(vidas, cvs.width - 25, 25, vida_imagen, cvs.width-55, 5);
    // Mostrar el nivel en el que estas
    showGameStats(nivel, cvs.width/2, 25, imagen_nivel, cvs.width/2 - 30, 5);
}

// Juego perdido
function gameOver(){
    if(vidas <= 0){
        window.location="GameOver.html";
        lose = true;
    }
}

// Siguiente nivel
function levelUp(){
    let isLevelDone = true;

    // Checa si todos los bloques se han rotos
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
    }

    if(isLevelDone){
        gano.play();
        if(nivel >= max_nivel){
            window.location="GameWon.html";
            lose = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.5;
        resetBall();
        nivel++;
    }
}

// Actualizar l juego
function update(){
    movePaddle();

    moveBall();

    ballWallCollision();

    ballPaddleCollision();

    ballBrickCollision();

    gameOver();

    levelUp();
}

// E4sta parte es importante aqui estaremos limpiando y generando canvas
function loop(){
    // Limpiar las canvas
    ctx.drawImage(fondo, 0, 0);

    draw();

    update();

    if(! lose){
        requestAnimationFrame(loop);
    }
}
loop();


// Seleccionar nuestro elemento sound
const soundElement  = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);

function audioManager(){
    // Nuestrso sonidos e imagenes acomodados, siendo sound nuestro interruptor del sonido
    let imgSrc = soundElement.getAttribute("src");
    let SOUND_IMG = imgSrc == "../statics/img/SOUND_ON.png" ? "../statics/img/SOUND_OFF.png" : "../statics/img/SOUND_ON.png";

    soundElement.setAttribute("src", SOUND_IMG);

    // Interruptor de sonidos
    choque.muted = choque.muted ? false : true;
    PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
    romperB.muted = romperB.muted ? false : true;
    gano.muted = gano.muted ? false : true;
    vidaPerdida.muted = vidaPerdida.muted ? false : true;
}

// Mostrar mensaje de gameover
/* elementos seleccionados */
const gameover = document.getElementById("gameover");
const restart = document.getElementById("restart");
