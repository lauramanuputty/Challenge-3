//Open Weather
 var api = {
	 key: "a802a5a2c7629e3831353aabfc22371b",
	 url: "https://api.openweathermap.org/data/2.5/weather?q="
 }
 
var zoekbox = document.querySelector('.zoek-box-weer');
zoekbox/addEventListener('keypress', setQuery);


function setQuery(evt){
	if (evt.keyCode == 13){
		getResultaten(zoekbox.value);
		//console.log(zoekbox.value);
	}
}
 
function getResultaten(query){
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + zoekbox.value + '&units=metric&appid=' + 'a802a5a2c7629e3831353aabfc22371b')  
		.then(weather => {
			return weather.json();
		}).then(displayResultaten);
}
 
function displayResultaten(weather){
	//console.log(weather);
	let stad = document.querySelector('.locatie .stad');
	stad.innerText = `${weather.name}, ${weather.sys.country}`;
	
	let now = new Date();
	let datum = document.querySelector('.locatie .datum');
	datum.innerText = dataBuilder(now);
	
	let temp = document.querySelector('.huidig .temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
	
	let huidige_weer = document.querySelector('.huidig .weer');
	huidige_weer.innerText = weather.weather[0].main;

	let hoog_laag = document.querySelector('.huidig .hoog-laag');
	hoog_laag.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
	
	let wind = document.querySelector('.huidig .data-wind');
	wind.innerText = `Windkracht  ${weather.wind.speed}`;
}

function dataBuilder(d){
	let maanden = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
	let dagen = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
	
	let dag = dagen[d.getDay()];
	let data = d.getDate();
	let maand = maanden[d.getMonth()];
	let jaar = d.getFullYear();
	
	return dag +'  '+ data +'  '+ maand +'  '+ jaar;
}
 
 
//Mapbox map 
mapboxgl.accessToken = 'pk.eyJ1IjoiMTgwOTc2NzciLCJhIjoiY2s4azUwdTc2MGVzbzNvbXRmNXUxb3VhOCJ9.O18hLR1byTIf1kY3xf919g';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/18097677/ck8yd4pbd0ib81jnoku6f1pss',
  center: [20, 50],
  zoom: 2.5,
});

/*var popup = new mapboxgl.Popup().setHTML('<h4>Landingsplaats</h4> <p>Dit is een beschrikbare landingsplaats!  De coordinaten zijn [35.029520, 48.464860]</p>');

var marker = new mapboxgl.Marker()
	   .setLngLat([35.029520, 48.464860])
	   .setPopup(popup)
	   .addTo(map);*/
   
//marker 
var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [35.029520, 48.464860]
    },
    properties: {
      title: 'Mapbox',
      description: 'Oekraïne, Dnipro'
    }
  }]
};

//marker en popup
geojson.features.forEach(function(marker) {
  var el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
	 .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML('<h4>Landingsplaats</h4> <p>Dit is een beschikbare landingsplaats!  De coordinaten zijn [35.029520, 48.464860]</p>'))
    .addTo(map);
});

//zoekbalk
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

map.addControl(new mapboxgl.NavigationControl());
