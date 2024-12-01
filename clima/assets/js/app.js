const api_key = "e7da5c9cd3424b8eaab202939243010";
const update = document.getElementById('update');

function getClima(latitud, longitud){
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${latitud},${longitud}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const climaContainer = document.getElementById('clima')
            climaContainer.innerHTML = `
            <h2>El clima en ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
            <h3>Hora: ${data.location.localtime}</h3>
            <h3>Temperatura: ${data.current.temp_c}°C</h3>
            <h3>Condición: ${data.current.condition.text}</h3>
            <img src="${data.current.condition.icon}" alt="Icono de clima">
            `
        })
        .catch(error => {
            console.error(error)
        });
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            const latitud =  position.coords.latitude;
            const longitud = position.coords.longitude
            console.log(latitud, longitud)
            getClima(latitud, longitud);
        }, error => {
            console.error('Error al obtener la ubicación', error)
            alert('No hemos podido obtener tu ubicación')
        });
    }
}

function updateClima() {
    const coordenadasInput = document.getElementById('cordenadas').value;
    const [latitud, longitud] = coordenadasInput.split(',').map(coord => coord.trim());
    if (latitud && longitud) {
        getClima(latitud, longitud);
    } else {
        alert('Por favor, ingresa coordenadas válidas (lat, lon)');
    }
}

window.onload = getLocation;
update.addEventListener('click', updateClima);
