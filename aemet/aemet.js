let xhr = new XMLHttpRequest();
let recibido = "";

xhr.open("GET", "https://www.el-tiempo.net/api/json/v2/provincias/33 ", true); // Hacemos la petición por GET
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        recibido = JSON.parse(xhr.responseText);

        console.log(recibido);

        actualizarTiempoHoy(recibido["today"]["p"]);
        actualizarTiempoManiana(recibido["tomorrow"]["p"]);

        crearTablaCiudades(recibido["ciudades"]);

    } else {
        console.log("Cargando datos de la AEMET");
    }
}

xhr.send();

/**
 * Actualizamos los datos del tiempo de hoy
 * @param {string} tiempoHoy 
 */
function actualizarTiempoHoy(tiempoHoy) {
    document.getElementById("hoy").innerHTML = tiempoHoy;
}

/**
 * Actualizamos los datos del tiempo de mañana
 * @param {string} tiempoManiana 
 */
function actualizarTiempoManiana(tiempoManiana) {
    document.getElementById("maniana").innerHTML = tiempoManiana;
}

function crearCabeceraTablaCiudades() {
    //Creamos las cabeceras de la tabla
    let nombre = document.createElement("th"); //Nombre de la ciudad
    nombre.innerText = "Ciudad";
    let codPostal = document.createElement("th"); //Cod. Postal de la ciudad
    codPostal.innerText = "Cód. Postal";
    let tiempoActual = document.createElement("th"); //Tiempo actual de la ciudad
    tiempoActual.innerText = "Tiempo Actual";
    let maxHoy = document.createElement("th"); //Máxima de hoy de la ciudad
    maxHoy.innerText = "MAX (ºC)";
    let minHoy = document.createElement("th"); //Mínima de hoy de la ciudad
    minHoy.innerText = "MIN (ºC)";
    // Las añadimos en el thead
    let cabecera = document.createElement("thead");
    cabecera.append(nombre);
    cabecera.append(codPostal);
    cabecera.append(tiempoActual);
    cabecera.append(maxHoy);
    cabecera.append(minHoy);
    // Añadimos la cabcera completa a la tabla
    let tabla = document.getElementById("ciudades");
    tabla.append(cabecera);
}

/**
 * Creamos la tabla con la información de las ciudades
 * @param {Array} ciudades listado de las ciudades
 */
function crearTablaCiudades(ciudades) {
    crearCabeceraTablaCiudades(); // Creamos la cabecera de la tabla
    let tabla = document.getElementById("ciudades");

    // Recorremos el Array de las ciudades
    for(i=0; i<ciudades.length; i++){
        fila=document.createElement("tr");
        nombre=document.createElement("td");
        nombre.innerText=ciudades[i]["name"];
        codPostal=document.createElement("td");
        codPostal.innerText=ciudades[i]["id"];
        tiempoActual=document.createElement("td");
        tiempoActual.innerText=ciudades[i]["stateSky"]["description"];
        maxHoy=document.createElement("td");
        maxHoy.innerText=ciudades[i]["temperatures"]["max"];
        minHoy=document.createElement("td");
        minHoy.innerText=ciudades[i]["temperatures"]["min"];
        // Añadimos los datos
        fila.append(nombre);
        fila.append(codPostal);
        fila.append(tiempoActual);
        fila.append(maxHoy);
        fila.append(minHoy);
        // Añadimos la fila a la tabla
        tabla.append(fila);
    }
}