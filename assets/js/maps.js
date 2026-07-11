class UserLocation {

  static get(callback) {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((location) => {

        callback({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });

      });

    } else {
      alert("Necesitas activar la ubicación");
    }

  }

}


// 📏 Función para calcular distancia en km
function calcularDistancia(lat1, lon1, lat2, lon2) {

  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}



document.addEventListener("DOMContentLoaded", function () {

  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  // Si IntersectionObserver no está soportado, cargar inmediatamente
  if (!("IntersectionObserver" in window)) {
    cargarLeaflet(() => {
      inicializarMapa();
    });
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cargarLeaflet(() => {
          inicializarMapa();
        });
        observer.unobserve(mapElement);
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(mapElement);

});

function cargarLeaflet(callback) {
  // Cargar CSS de Leaflet si no está cargado
  if (!document.querySelector('link[href*="leaflet.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
    document.head.appendChild(link);
  }

  // Cargar JS de Leaflet si no está cargado
  if (typeof L === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
}

function inicializarMapa() {
  const my_place = {
    lat: -34.940517536528084,
    lng: -58.03743728108097
  };

  const map = L.map('map').setView([my_place.lat, my_place.lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([my_place.lat, my_place.lng])
    .addTo(map)
    .bindPopup("Alana Indumentaria")
    .openPopup();

  UserLocation.get((coords) => {

    // 📍 Marcador del usuario
    /*L.marker([coords.lat, coords.lng])
      .addTo(map)
      .bindPopup("Estás acá");*/

    // 📏 Calcular distancia
    const distancia = calcularDistancia(
      coords.lat,
      coords.lng,
      my_place.lat,
      my_place.lng
    );
    
    const messageEl = document.querySelector("#message");
    if (messageEl) {
      messageEl.innerHTML = `Estás a <strong>${distancia.toFixed(2)} km</strong> de distancia.`;
    }

    console.log("Distancia en línea recta:", distancia.toFixed(2), "km");

  });
}