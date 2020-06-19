/**Este programa devuelve la puntuación que obtuvo el usuario 
 * jugando terranos.
 */
function lectura_cookies(cookie) {
  let c = document.cookie
  let cookies = c.split(";");
  let regex = new RegExp(cookie, "i");
  for (indice in cookies) {
    let coincidencia = cookies[indice].search(regex);
    if (coincidencia > -1) {
      var posCookie = indice;
      break;
    }
    else {
      var posCookie = -1;
    }
  }
  if (posCookie != -1) {
    let valor_cookie = cookies[posCookie].split("=")[1];
    return valor_cookie
  }
  else {
    return false
  }
}
// Impresión de puntuación
let score = lectura_cookies("scoreTerranos");
console.log(score);
$("#score").text(score);
document.cookie = `scoreTerranos=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;