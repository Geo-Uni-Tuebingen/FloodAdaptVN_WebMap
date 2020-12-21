//#### KARTEN-SETUP ####

var mymap = L.map('mapid').setView([16.35, 107.6], 10);
L.control.scale({
  imperial: false,
  metric: true,
  maxWidth: 150,
  position: 'bottomleft'
}).addTo(mymap); // Maßstab wird Karte hinzugefügt

// #### BASEMAPS ####

var minimapbase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 1,
  maxZoom: 19,
}); // Variable Für die Basemap der Minimap wird erstellt

var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//#### RASTERDATEN ####
// versteh ich selbst nicht so genau, ist aus der in QGIS automatisch erstellbaren Webkarte entnommen und angepasst.
// Der Wert nach style.zIndex gibt an ob das Objekt vorne oder hinten angeordnet ist (überlappung) hohe zahlen sind im vordergrund, niedrige weiter hinten.

mymap.createPane('pane_PAZ_20191203_2');
mymap.getPane('pane_PAZ_20191203_2').style.zIndex = 303;
var img_PAZ_20191203_2 = 'Daten/PAZ_20191203_2.png';
var img_bounds_PAZ_20191203_2 = [
  [16.412986579934838, 107.52032026444753],
  [16.523355302540804, 107.64768331559847]
];
var layer_PAZ_20191203_2 = new L.imageOverlay(img_PAZ_20191203_2,
  img_bounds_PAZ_20191203_2, {
    pane: 'pane_PAZ_20191203_2'
  });

mymap.createPane('pane_PAZ_20191031_3');
mymap.getPane('pane_PAZ_20191031_3').style.zIndex = 302;
var img_PAZ_20191031_3 = 'Daten/PAZ_20191031_3.png';
var img_bounds_PAZ_20191031_3 = [
  [16.412682356987847, 107.51977089904621],
  [16.523523144275618, 107.64722836313351]
];
var layer_PAZ_20191031_3 = new L.imageOverlay(img_PAZ_20191031_3,
  img_bounds_PAZ_20191031_3, {
    pane: 'pane_PAZ_20191031_3'
  });

mymap.createPane('pane_PAZ_20191009_4');
mymap.getPane('pane_PAZ_20191009_4').style.zIndex = 301;
var img_PAZ_20191009_4 = 'Daten/PAZ_20191009_4.png';
var img_bounds_PAZ_20191009_4 = [
  [16.41288263723653, 107.52150350645333],
  [16.52353459865158, 107.64886655760426]
];
var layer_PAZ_20191009_4 = new L.imageOverlay(img_PAZ_20191009_4,
  img_bounds_PAZ_20191009_4, {
    pane: 'pane_PAZ_20191009_4'
  });


//#### INFOBANNER ####

var Infobanner = L.control({
  position: 'bottomright'
});

Infobanner.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info-legend');
  div.innerHTML += '<table><tr><td>' + '<center><font size=0>' + '<a href="' + 'https://floodadapt.eoc.dlr.de' + '">' + '<img src="Grafiken/FloodAdapt.png" alt="" width="50%"></img>' + '</a>' 
  + '<br>' +'FloodAdaptVN – Integrating Ecosystem-based Approaches into Flood Risk' + '<br>' 
  + 'Management for Adaptive and Sustainable Urban Development in Central Viet Nam' + '</a></td>'
  + '<td><font size=0>' + '<center>' + 'sponsored by' + '<br>'+ '<a href="' + 'https://www.bmbf.de/en/index.html' + '">' + '<img src="Grafiken/Ministerium.png" alt="" width="70%"></img>' + '</a></td></tr>'
  
  return div;
};


Infobanner.addTo(mymap);

//#### POPUPS ####

var Popupoptionen = {
  'maxWidth': '600',
  'className': 'custom'
}; // Optionen für die Popups

function Popup_wards(feature, layer) {
  layer.bindPopup('<b><center>' + feature.properties.VARNAME_3 + '</center></b>', Popupoptionen)
}; // Popups für die Stadteile werden definiert, greifen auf die feature.properties.VARNAME_3 hinterlege Information als Inhalt zurück und halten sich an die definierten Optionen für Popups


// #### Stationen ####

var Stations_all =
  L.geoJSON(stations, {
    pointToLayer: function (feature, latlng) {
      if (feature.properties.class == "rainfall") {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "Marker/station_rainfall.svg",
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        })
      } else if (feature.properties.class == "hydrological") {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "Marker/station_hydrological.svg",
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        })
      } else if (feature.properties.class == "hydro-meteorology") {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "Marker/station_hydrometeorological.svg",
            iconSize: [15, 15],
            iconAnchor: [7.5, 7.5]
          })
        })
      }
    }
  }).addTo(mymap) // Messtationen werden aus dem geoJSON Format eingelesen und bekommen je nach Stationstyp einem einen anderen Marker, der im Ordner "marker" als svg hinterlegt ist

// #_2_# Anfang //
//Legende bzw. Downloadlink für die Messstationen
var legend_stations = L.control({
  position: 'bottomleft'
});

legend_stations.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info-legend');

  div.innerHTML += '<strong><center><font size=3>Messstationen </strong>' + '<br>'
  div.innerHTML += '<img src="Marker/station_rainfall.svg" width=15, height=15>' + '&nbsp' + '&nbsp' + 'Niederschlag' + '<br>'
  div.innerHTML += '<img src="Marker/station_hydrological.svg" width=15, height=15>' + '&nbsp' + '&nbsp' + 'Hydrologie' + '<br>'
  div.innerHTML += '<img src="Marker/station_hydrometeorological.svg" width=15, height=15>' + '&nbsp' + '&nbsp' + 'Hydrologie und Niederschlag' + '<br>'
  div.innerHTML += '<center><a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/blob/master/Daten/hydrometeorological_stations.js' + '">' + '<img src="Grafiken/Download.svg" height=20>' + '</a>' //Downlaodlink für die Messstationen

  return div;
};

legend_stations.addTo(mymap); // schon von Anfang an geladen, da Stationen bereits angezeigt werden

mymap.on('overlayremove', function (event) {
  if (event.layer == Stations_all) {
    legend_stations.remove(mymap);
  }
});

mymap.on('overlayadd', function (event) {
  if (event.layer == Stations_all) {
    legend_stations.addTo(mymap);
  }
});
// #_2_# Ende //

// #_3_# Anfang //
//Legende bzw. Downloadlink für die Stadttteile
var legend_wards = L.control({
  position: 'bottomleft'
});

legend_wards.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info-legend');

  div.innerHTML += '<strong><center><font size=3> Stadtteile </strong>' + '<br>'
  div.innerHTML += '<center><a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/blob/master/Daten/HueProvince_wards.js' + '">' + '<img src="Grafiken/Download.svg" height=20>' + '</a>' //Downlaodlink für die Stadtteile

  return div;
};

legend_wards.addTo(mymap); // schon von Anfang an geladen, da Stadtteile bereits angezeigt werden

mymap.on('overlayremove', function (event) {
  if (event.layer == wards) {
    legend_wards.remove(mymap);
  }
});

mymap.on('overlayadd', function (event) {
  if (event.layer == wards) {
    legend_wards.addTo(mymap);
  }
});

//Legende bzw. Downloadlink für die Rasterbilder
var legend_SAR = L.control({
  position: 'bottomleft'
});

legend_SAR.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info-legend');

  div.innerHTML += '<strong><center><font size=3> SAR-Bilder </strong>' + '<br>'
  div.innerHTML += '<table><tr><td> 09.10.2019 </td><td> <a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/blob/master/Daten/PAZ_20191009_4.png' + '">' + '<img src="Grafiken/Download.svg" height=18>' + '</a></td></tr>'
  div.innerHTML += '<table><tr><td> 31.10.2019 </td><td> <a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/blob/master/Daten/PAZ_20191031_3.png' + '">' + '<img src="Grafiken/Download.svg" height=18>' + '</a></td></tr>'
  div.innerHTML += '<table><tr><td> 03.12.2019 </td><td> <a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/blob/master/Daten/PAZ_20191203_2.png' + '">' + '<img src="Grafiken/Download.svg" height=18>' + '</a></td></tr>'
  return div;
};

mymap.on('overlayremove', function (event) {
  if (event.layer == empty) {
    legend_SAR.remove(mymap);
  }
});

mymap.on('overlayadd', function (event) {
  if (event.layer == empty) {
    legend_SAR.addTo(mymap);
  }
});

var empty_test = 'Daten/empty.png';

mymap.createPane('pane_empty_test'); //lediglich erstellung eines leeren rasterbilds zur erstellung des "Downloads". Nicht sonderlich schön aber funktioniert.
mymap.getPane('pane_empty_test').style.zIndex = 303;
var empty_test = 'Daten/empty.png';
var empty_test_bounds = [
  [16.412986579934838, 107.52032026444753],
  [16.523355302540804, 107.64768331559847]
];
var empty = new L.imageOverlay(empty_test,
  empty_test_bounds, {
    pane: 'pane_empty_test'
  });
// #_3_# Ende //

// #### Stadtteile ####

function style_wards(feature) { // setzt nacher den style der STadtteile fest
  return {
    fillColor: 'white',
    weight: 1.8,
    opacity: 0.5,
    color: 'red',
    fillOpacity: 0.0
  };
};

var wards =
  L.geoJSON(wards, {
    style: style_wards,
    onEachFeature: Popup_wards
  }).addTo(mymap);



//#### KONTROLLSTATION ####
mymap.doubleClickZoom.disable(); // damit der Zoom beim Doppelklick ausgeschalten wird



var baseMaps = [{
  groupName: "Basiskarten",
  expanded: true,
  layers: {
    "OSM": OpenStreetMap,
    "Open Topo Map": OpenTopoMap,
    "World Imagery": Esri_WorldImagery
  }
}]; // Variable für den Inhalt des Drop-Down Menüs "Basiskarten"



var overlays = [{
    groupName: "SAR-Bilder",
    expanded: true,
    exclusive: true,
    layers: {
      "09.10.2019": layer_PAZ_20191009_4,
      "31.10.2019": layer_PAZ_20191031_3,
      "03.12.2019": layer_PAZ_20191203_2,
      "Downloadlinks": empty
    }
  },
  {
    groupName: "Grunddaten",
    expanded: true,
    layers: {
      "Messstationen": Stations_all,
      "Stadtteile": wards
    }
  }
]; // Variable für den Inhalt des Drop-Down Menüs "SAR-Bilder" und "Grunddaten"

var options = {
  container_width: "300px",
  container_maxHeight: "350px",
  group_maxHeight: "80px",
  exclusive: false,
  collapsed: false
}; // Optionen für die Layerübersicht


var controles = L.Control.styledLayerControl(baseMaps, overlays, options); // Erstellung der Layerübersicht aus den vorherig definierten Variablen
mymap.addControl(controles); //Hinzufügen der erstellten Layerübersicht zur Karte







var miniMap_ctrl = new L.Control.MiniMap(minimapbase, {
  toggleDisplay: true,
  width: 180,
  height: 160,
  aimingRectOptions: {
    color: 'blue'
  }
}).addTo(mymap); // Minimap wird erstellt und der Karte mit Optionen hinzugefügt