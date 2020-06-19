<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../statics/Espacio.css" type="text/css">
        <link rel="icon" type="image/png" sizes="32x32" href="../statics/img/favicon_io/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../statics/img/favicon_io/favicon-16x16.png">
        <script type="text/javascript" src="../lib/jquery-3.5.1.min.js"></script>
        <script type="text/javascript" src="Espacio.js"></script>
        <title>Tetris</title>
    </head>
    <body>
        <!--Lado izquierdo de la pantalla-->
        <div id="letras">
            <!--Caja que muestra la pieza siguiente-->
            <div id="caja">
                <table>
                <?php
                    $fil = 4;
                    $col = 4;
                    for($fi = 0; $fi < $fil; $fi++){
                        echo "<tr id='c".$fi."'>";
                        for($co = 0; $co < $col; $co++){
                            echo "<td id='c".$fi."_".$co."' class='celda'></td>";
                        }
                        echo "</tr>";
                    }
                ?>
                </table>
            </div>
            <!--Apartado que muestra puntaje-->
            <div id="puntaje">
                Puntaje: 0
            </div>
        </div>
        <!--Lado derecho de la pantalla, tablero-->
        <div id="juego">
            <table>
                <?php
                    $fila = 20;
                    $columna = 10;
                    for($f = 0; $f < $fila; $f++){
                        echo "<tr id='j".$f."'>";
                        for($c = 0; $c < $columna; $c++){
                            echo "<td id='j".$f."_".$c."' class='celda'></td>";
                        }
                        echo "</tr>";
                    }
                ?>
            </table>
        </div>
        <button onclick="location.href='../templates/header.html'">Regresa al principio</button>
    </body>
</html>