var url = 'http://airemad.com/api/v1/pollen';
var title = document.getElementById('mainTitle');
title.textContent = 'Datos del Polen de Madrid Starter';
var contenedor = document.querySelector('.container');

const getDatos = url =>{
  fetch(url).then(response => response.json()).then(datos => processResponse2(datos)).catch(x => console.log(x));
}

function processResponse2(datos){
  var template = '';
  var result = datos.map(dato =>{
    template += `<h3 class="subTitle">${dato.name}</h3><div class="values">`;
    parametros = Object.keys(dato.parametros);
    //mediciones = Object.keys(dato.mediciones);
    parametros.forEach(element => {
      var medio = dato.parametros[element].medio;
      var alto = dato.parametros[element].alto;
      var muy_alto = dato.parametros[element].muy_alto;
      var valor = dato.mediciones[element].valor;
      var stilo = "color:green;";
      if(valor > medio) {stilo = "color:orange;"}
      if(valor>alto){stilo="color:brown;"}
      template +=
        `<div class="card"><h4>${element}` +
        `</h4><p>Nivel medio: ${medio}` +
        '</p><p>Nivel alto: ' +
        alto +
        '</p><p>Nivel muy alto: ' +
        muy_alto +
        '</p><p>Fecha: ' +
        new Date(dato.mediciones[element].fecha.slice(0, -1)).toDateString() +
        '</p><p>Valor: <span style="'+ stilo +'">' +
        valor +
        '</span></p><p>Resumen: ' +
        dato.mediciones[element].resumen +
        '</p></div>';
    });
  } 
  //`<h3 class="subTitle">${dato.name}</h3>`
  );
  
  contenedor.innerHTML = template;
}

function processResponse(datos) {
  var template = '';

  for (var i = 0; i < datos.length; i++) {
    var station = datos[i];
    var stationName = station.name;
    var parametros = station.parametros;
    var mediciones = station.mediciones;
    var paramsArray = Object.keys(station.parametros);
    var medicionesArray = Object.keys(station.mediciones);
    template +=
      '<h3 class="subTitle">' + stationName + '</h3><div class="values">';

    for (var j = 0; j < paramsArray.length; j++) {
      var paramName = paramsArray[j];
      var medio = parametros[paramName].medio;
      var alto = parametros[paramName].alto;
      var muyAlto = parametros[paramName].muy_alto;
      var medicionName;
      var fecha;
      var valor;
      var resumen;

      for (var k = 0; k < medicionesArray.length; k++) {
        medicionName = medicionesArray[k];
        fecha = mediciones[medicionName].fecha.slice(0, -1);
        fecha = new Date(fecha).toDateString();
        valor = mediciones[medicionName].valor;
        resumen = mediciones[medicionName].resumen;

        console.log('fecha**********', fecha);
      }

      template +=
        '<div class="card"><h4>' +
        paramName +
        '</h4><p>Nivel medio: ' +
        medio +
        '</p><p>Nivel alto: ' +
        alto +
        '</p><p>Nivel muy alto: ' +
        muyAlto +
        '</p><p>Fecha: ' +
        fecha +
        '</p><p>Valor: ' +
        valor +
        '</p><p>Resumen: ' +
        resumen +
        '</p></div>';
    }
    template += '</div>';
  }

  contenedor.innerHTML = template;
}

getDatos(url);
