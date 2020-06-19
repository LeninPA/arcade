# Arcade Coyotito

<h2>Equipo: Los tres mosqueteros y Arantxa</h2>

Integrantes:
- Oscar Cortés
- Arantxa Junco
- Lenin Pavón
- Elizabeth Salgado

Introducción:
Este proyecto es un sitio Web en el que se encuentran 3 juegos distintos(un tetris difícil, un juego inspirado en space invaders, y un breakout con 3 niveles). Al inicio se escoge una paleta de colores y un nombre de usuario. Posteriormente se redirige al usuario a una página donde se encuentra una introducción a cada juego y se puede seleccionar uno para jugar. De igual forma en la parte superior se encuentran los créditos.

Guía de instalación:
Se deben adquirir los documentos de la rama master y descargarlos en la computadora en donde se desea accesar al arcade.
Para ingresar a la página se debe iniciar en el documento index.html y a partir de ahí, las demás páginas funcionan correctamente.
Antes de abrir los documentos se debe iniciar el servidor "Xampp" en el caso de Windows o "Mamp" en el caso de Mac, y los documentos se deben guardar en la carpeta "htdocs".
Para abrir el documento, en el navegador se debe escribir la ruta "localhost/templates/index.html".

Guía de configuración:
No requiere ninguna configuración adicional.

Características:
- Pantalla de primera vez
- Pantalla de bienvenida
  - Tarjetas individuales para cada juego
  - Pantallas individuales para cada juego
- Pantalla de créditos
- Sistema de puntajes en cada juego
- Juegos
  - Sirtet "Tetris recargado"
    - Se le prohibe al usuario rotar las piezas
    - Se le asigna una orientación aleatoria a cada pieza que cae al usuario
    - El usuario puede mover la pieza a los lados o acelerar su caí
    - Se le asigna una orientación aleatoria a cada pieza que cae al usuario con las teclas :arrow_backward::arrow_down::arrow_forward:
    - Al llenarse una fila, esta se destruya y si hay un bloque superior, este baja una casilla
    - El juego termina cuando se llena una columna
  - Terranos 
    - El usuario se dezplaza con  a la derecha o izquierda en lo que las naves llegan a un 80% de la altitud del tablero
    - El jugador tiene 3 vidas
    - Un disparo cae del cielo en una posición aleatoria 
    - Pierde una vida si se encuentra con un disparo
  - Breakout
    - Existe una pelota que rompe los bloques
    - La pelota tiene 3 vidas
    - Cuenta con 3 niveles en donde la dificultad va aumentando
    - La pelota debe rebotar en la barra inferior, o perderá
    - Cuenta con sonido
    - Gana al completar todos los niveles
    
Comentarios adicionales:
La integración de base de datos, que incluyen el registro del usuario y puntajes no se completó porque un integrante no pudo colaborar en el proyecto. Sin embargo, implementamos lo que consideramos más necesario para un mínimo funcionamiento de la página y fácil interfaz para el usuario.

Esperamos puedan disfrutar de los juegos que programamos y  agradecemos a los instructores del Curso Web por habernos brindado los conocimientos con los que llevamos a cabo este proyecto.
  
