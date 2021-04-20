const goodCampground = JSON.parse(campgroundLocation);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: goodCampground.coordinates, // starting position [lng, lat]
    zoom: 7 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(goodCampground.coordinates)
    .addTo(map)