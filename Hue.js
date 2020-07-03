//#### KARTEN-SETUP ####

var mymap = L.map('mapid').setView([16.35,107.6], 10);

// #### BASEMAPS ####


var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//#### RASTERDATEN ####
// versteh ich selbst nicht so genau, ist aus der in QGIS automatisch erstellbaren Webkarte entnommen und angepasst.
// Der Wert nach style.zIndex gibt an ob das Objekt vorne oder hinten angeordnet ist (überlappung) hohe zahlen sind im vordergrund, niedrige weiter hinten.

mymap.createPane('pane_PAZ_20191203_2');
mymap.getPane('pane_PAZ_20191203_2').style.zIndex = 303;
var img_PAZ_20191203_2 = 'Daten/PAZ_20191203_2.png';
var img_bounds_PAZ_20191203_2 = [[16.412986579934838,107.52032026444753],[16.523355302540804,107.64768331559847]];
var layer_PAZ_20191203_2 = new L.imageOverlay(img_PAZ_20191203_2,
                                      img_bounds_PAZ_20191203_2,
                                      {pane: 'pane_PAZ_20191203_2'});

mymap.createPane('pane_PAZ_20191031_3');
mymap.getPane('pane_PAZ_20191031_3').style.zIndex = 302;
var img_PAZ_20191031_3 = 'Daten/PAZ_20191031_3.png';
var img_bounds_PAZ_20191031_3 = [[16.412682356987847,107.51977089904621],[16.523523144275618,107.64722836313351]];
var layer_PAZ_20191031_3 = new L.imageOverlay(img_PAZ_20191031_3,
                                      img_bounds_PAZ_20191031_3,
                                      {pane: 'pane_PAZ_20191031_3'});

mymap.createPane('pane_PAZ_20191009_4');
mymap.getPane('pane_PAZ_20191009_4').style.zIndex = 301;
var img_PAZ_20191009_4 = 'Daten/PAZ_20191009_4.png';
var img_bounds_PAZ_20191009_4 = [[16.41288263723653,107.52150350645333],[16.52353459865158,107.64886655760426]];
var layer_PAZ_20191009_4 = new L.imageOverlay(img_PAZ_20191009_4,
                                      img_bounds_PAZ_20191009_4,
                                      {pane: 'pane_PAZ_20191009_4'}); 


//#### POPUPS ####

var Popupoptionen = {'maxWidth':'600','className': 'custom'}; // Optionen für die Popups

function Popup_wards (feature, layer){
  layer.bindPopup('<b><center>'+ feature.properties.VARNAME_3 + '</center></b>', Popupoptionen)
}; // Popups für die Stadteile werden definiert, greifen auf die feature.properties.VARNAME_3 hinterlege Information als Inhalt zurück und halten sich an die definierten Optionen für Popups


// #### Stationen ####

var Stations_all=
  L.geoJSON(stations, {
    pointToLayer: function(feature, latlng) {
      if (feature.properties.class =="rainfall"){
      return L.marker(latlng, {
        icon: L.icon({
          iconUrl: "Marker/station_rainfall.svg",
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      })}
      else if (feature.properties.class =="hydrological"){
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "Marker/station_hydrological.svg",
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        })}
      else if (feature.properties.class =="hydro-meteorology"){
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "Marker/station_hydrometeorological.svg",
            iconSize: [15, 15],
            iconAnchor: [7.5, 7.5]
          })
        })}
  }}).addTo(mymap) // Messtationen werden aus dem geoJSON Format eingelesen und bekommen je nach Stationstyp einem einen anderen Marker, der im Ordner "marker" als svg hinterlegt ist


// #### Stadtteile ####

function style_wards(feature) {  // setzt nacher den style der STadtteile fest
  return {
      fillColor: 'white',
      weight: 1.8,
      opacity: 0.5,
      color: 'red',
      fillOpacity: 0.0
  };
};

var wards=
  L.geoJSON(wards, {
    style: style_wards,
    onEachFeature: Popup_wards
    } 
  ).addTo(mymap);


  
//#### KONTROLLSTATION ####
mymap.doubleClickZoom.disable();    // damit der Zoom beim Doppelklick ausgeschalten wird


var baseMaps = [
  { 
    groupName : "Basiskarten",
    expanded : true,
    layers    : {
      "OSM": OpenStreetMap,
      "Open Topo Map": OpenTopoMap,
      "World Imagery": Esri_WorldImagery
    }
  }				
];	// Variable für den Inhalt des Drop-Down Menüs "Basiskarten"

var overlays = [
  {
    groupName : "SAR-Bilder",
    expanded  : true,
    layers    : { 
      "09.10.2019": layer_PAZ_20191009_4,
      "31.10.2019": layer_PAZ_20191031_3,
      "03.12.2019": layer_PAZ_20191203_2
    }	
   },	
  {
   groupName : "Grunddaten",
   expanded  : true,
   layers    : { 
     "Messstationen" : Stations_all,
     "Stadtteile" 	 : wards
   }	
  }	 
]; // Variable für den Inhalt des Drop-Down Menüs "SAR-Bilder" und "Grunddaten"

var options = {
  container_width 	: "300px",
  container_maxHeight : "350px", 
  group_maxHeight     : "80px",
  exclusive: false,
  collapsed: false
}; // Optionen für die Layerübersicht

var controles = L.Control.styledLayerControl(baseMaps, overlays, options); // Erstellung der Layerübersicht aus den vorherig definierten Variablen
mymap.addControl(controles); //Hinzufügen der erstellten Layerübersicht zur Karte


// ### MINIMAP & MAßSTAB ####

L.control.scale({imperial: false, metric: true, maxWidth: 150, position: 'bottomleft' }).addTo(mymap); // Maßstab wird Karte hinzugefügt

var minimapbase = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
	minZoom: 1,
  maxZoom: 19,
}); // Variable Für die Basemap der Minimap wird erstellt

var miniMap_ctrl = new L.Control.MiniMap(minimapbase, {toggleDisplay: true, width: 180, height: 160, aimingRectOptions: {color: 'blue'}}).addTo(mymap); // Minimap wird erstellt und der Karte mit Otionen hinzugefügt


