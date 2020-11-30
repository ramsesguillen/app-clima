"use strict";

/** 
 * * App buscardor de clima
*/

/** 
 * * VARIABLES
*/
// Referencias del html 
var container = document.querySelector('.container');
var resultado = document.querySelector('#resultado');
var formulario = document.querySelector('#formulario');
/** 
 * * FUNCIONES
 * * buscar clima
*/

var buscarClima = function buscarClima(e) {
  e.preventDefault(); // validar 

  var ciudad = document.querySelector('#ciudad').value;
  var pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    mostrarError('Ambos campos son obligatorios');
    return;
  } // consultar api 


  consultarApi(ciudad, pais);
};
/** 
 * * Mostrar error
*/


var mostrarError = function mostrarError(mensaje) {
  var alerta = document.querySelector('.bg-red-100');

  if (!alerta) {
    // Crear alerta 
    var _alerta = document.createElement('div');

    _alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    _alerta.innerHTML = "\n            <strong class=\"font-bold\"> Error!</strong> \n            <span class=\"block\">".concat(mensaje, "</span>\n        ");
    container.appendChild(_alerta); // Se elimina la alerta después de 5 segundos 

    setTimeout(function () {
      _alerta.remove();
    }, 5000);
  }
};
/** 
 * * Consultar el pais
*/


var consultarApi = function consultarApi(ciudad, pais) {
  var appId = '2a5ba1153b875edc33f9f093d1d8cbc0';
  var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(ciudad, ",").concat(pais, "&appid=").concat(appId);
  spinner();
  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    if (data.cod === '404') {
      mostrarError('Ciudad no existe...');
      return;
    } // Imprime la respuesta en el HTML 


    limpiarHTML();
    mostrarClima(data);
  });
};
/** 
 * * Mostrar la temperatura en el html
*/


var mostrarClima = function mostrarClima(data) {
  var name = data.name,
      _data$main = data.main,
      temp = _data$main.temp,
      temp_max = _data$main.temp_max,
      temp_min = _data$main.temp_min;
  var centigrados = kelvinACentigrados(temp);
  var max = kelvinACentigrados(temp_max);
  var min = kelvinACentigrados(temp_min);
  var nombreCiudad = document.createElement('p');
  nombreCiudad.textContent = "El clima en ".concat(name);
  nombreCiudad.classList.add('font-bold', 'text-2xl');
  var actual = document.createElement('p');
  actual.innerHTML = "".concat(centigrados, " &#8451");
  actual.classList.add('font-bold', 'text-6xl');
  var tempMax = document.createElement('p');
  tempMax.innerHTML = "Max: ".concat(max, " &#8451");
  tempMax.classList.add('text-xl');
  var tempMin = document.createElement('p');
  tempMin.innerHTML = "Min: ".concat(min, " &#8451");
  tempMin.classList.add('text-xl');
  var resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);
  resultado.appendChild(resultadoDiv);
};
/** 
 * * Conversion de los grados kelvin a centigrados
*/


var kelvinACentigrados = function kelvinACentigrados(grados) {
  return parseInt(grados - 273.15);
};
/** 
 * * Limpiar html
*/


var limpiarHTML = function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};
/** 
 * * crear Spinner
*/


var spinner = function spinner() {
  limpiarHTML();
  var divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');
  divSpinner.innerHTML = "\n        <div class=\"sk-circle1 sk-circle\"></div>\n        <div class=\"sk-circle2 sk-circle\"></div>\n        <div class=\"sk-circle3 sk-circle\"></div>\n        <div class=\"sk-circle4 sk-circle\"></div>\n        <div class=\"sk-circle5 sk-circle\"></div>\n        <div class=\"sk-circle6 sk-circle\"></div>\n        <div class=\"sk-circle7 sk-circle\"></div>\n        <div class=\"sk-circle8 sk-circle\"></div>\n        <div class=\"sk-circle9 sk-circle\"></div>\n        <div class=\"sk-circle10 sk-circle\"></div>\n        <div class=\"sk-circle11 sk-circle\"></div>\n        <div class=\"sk-circle12 sk-circle\"></div>\n    ";
  resultado.appendChild(divSpinner);
};
/** 
 * * EVENTOS
*/


window.addEventListener('load', function () {
  formulario.addEventListener('submit', buscarClima);
});