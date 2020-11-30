 /** 
  * * App buscardor de clima
 */

 /** 
  * * VARIABLES
 */
// Referencias del html 
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');





/** 
 * * FUNCIONES
 * * buscar clima
*/
const buscarClima = ( e ) => {
    e.preventDefault();

    

    // validar 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if ( ciudad === '' || pais === '' ) {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // consultar api 
    consultarApi( ciudad, pais );
}


/** 
 * * Mostrar error
*/
const mostrarError = ( mensaje ) => {
    const alerta = document.querySelector('.bg-red-100');

    if ( !alerta ) {
        // Crear alerta 
        const alerta = document.createElement('div');
    
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold"> Error!</strong> 
            <span class="block">${mensaje}</span>
        `;
    
        container.appendChild( alerta );

        // Se elimina la alerta después de 5 segundos 
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

/** 
 * * Consultar el pais
*/
const consultarApi = ( ciudad, pais ) => {
    const appId = '2a5ba1153b875edc33f9f093d1d8cbc0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
    spinner();

    fetch( url )
        .then( resp => resp.json())
        .then( data => {
            if ( data.cod === '404') {
                mostrarError('Ciudad no existe...')
                return;
            }
            // Imprime la respuesta en el HTML 
            limpiarHTML();
            mostrarClima( data );
        });
}

/** 
 * * Mostrar la temperatura en el html
*/
const mostrarClima = ( data ) => {
    const { name, main: { temp, temp_max, temp_min } } = data;

    const centigrados = kelvinACentigrados( temp );
    const max = kelvinACentigrados( temp_max );
    const min = kelvinACentigrados( temp_min );

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent =  `El clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild( nombreCiudad );
    resultadoDiv.appendChild( actual );
    resultadoDiv.appendChild( tempMax );
    resultadoDiv.appendChild( tempMin );

    resultado.appendChild( resultadoDiv );
}

/** 
 * * Conversion de los grados kelvin a centigrados
*/
const kelvinACentigrados = grados => parseInt( grados - 273.15 );

/** 
 * * Limpiar html
*/
const limpiarHTML = () => {
    while ( resultado.firstChild ) {
        resultado.removeChild( resultado.firstChild );
    }
}


/** 
 * * crear Spinner
*/
const spinner = () => {

    limpiarHTML();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild( divSpinner );
}





/** 
 * * EVENTOS
*/
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima );
})