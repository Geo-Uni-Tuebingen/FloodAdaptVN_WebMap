//#### KARTEN-SETUP ####

var mymap = L.map('mapid').setView([16.35, 107.6], 10);

//#### KARTENOPTIONEN ####

mymap.doubleClickZoom.disable(); // damit der Zoom beim Doppelklick ausgeschalten wird

L.control.scale({
  imperial: false,
  metric: true,
  maxWidth: 150,
  position: 'bottomleft'
}); // Maßstab wird Karte hinzugefügt

// #### BASEMAPS ####

var minimapbase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 1,
  maxZoom: 19,
}); // Variable Für die Basemap der Minimap wird erstellt

var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  maxZoom: 16
}).addTo(mymap);

//#### INFOBANNER ####//

var Infobanner = L.control({
  position: 'bottomright'
}); //Variable fürs Infobanner unten rechts (Bottomright)

Infobanner.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info');
  div.innerHTML += '<table><tr><td>' + '<font size=0>' + '<a href="' + 'https://floodadapt.eoc.dlr.de' + '">' + '<img src="Grafiken/FloodAdapt.png" alt="" width="50%"></img>' + '</a>' +
    '<br>' + 'FloodAdaptVN – Integrating Ecosystem-based Approaches into Flood Risk' + '<br>' +
    'Management for Adaptive and Sustainable Urban Development in Central Viet Nam' + '</a></td>' +
    '<td><font size=0>' + '' + 'sponsored by' + '<br>' + '<a href="' + 'https://www.bmbf.de/en/index.html' + '">' + '<img src="Grafiken/Ministerium.png" alt="" width="70%"></img>' + '</a></td></tr>'
  return div;
}; //HTML für den Inhalt des Banners. Organisiert und einer Tabelle

Infobanner.addTo(mymap); //Banner wird der Karte hinzugefügt

//#### POPUPS ####//

var Popupoptionen = {
  'maxWidth': '600',
  'className': 'custom'
}; // Optionen für die Popups

function Popup_wards(feature, layer) {
  layer.bindPopup('<b>' + feature.properties.VARNAME_3 + '</center></b>', Popupoptionen)
}; // Popups für die Stadteile werden definiert, greifen auf die feature.properties.VARNAME_3 hinterlege Information als Inhalt zurück und halten sich an die definierten Optionen für Popups


//#### Daten ####

//# Landnutzung#
var hash = new L.Hash(mymap);
var autolinker = new Autolinker({
  truncate: {
    length: 30,
    location: 'smart'
  }
});
var bounds_group = new L.featureGroup([]);

function setBounds() {}
mymap.createPane('pane_BandoDCQH2020TTHue_jpeg90_0');
mymap.getPane('pane_BandoDCQH2020TTHue_jpeg90_0').style.zIndex = 300;
var img_BandoDCQH2020TTHue_jpeg90_0 = 'Daten/BandoDCQH2020TTHue_jpeg90_0.png';
var img_bounds_BandoDCQH2020TTHue_jpeg90_0 = [
  [15.994916751, 107.016077553],
  [16.743120093, 108.194437908]
];
var layer_BandoDCQH2020TTHue_jpeg90_0 = new L.imageOverlay(img_BandoDCQH2020TTHue_jpeg90_0,
  img_bounds_BandoDCQH2020TTHue_jpeg90_0, {
    pane: 'pane_BandoDCQH2020TTHue_jpeg90_0'
  });
bounds_group.addLayer(layer_BandoDCQH2020TTHue_jpeg90_0);

//Legende Landnutzung

var legend_landuse = L.control({
  position: 'bottomleft'
}); //Position der Legende wird in neu erstellter Variable geregelt.

legend_landuse.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info');
  div.innerHTML += '<strong><font size=3>Land use plan</strong>' + '<br>' + '<font size=1>Adjusted land use plan for 2016-2020' + '<br>'
  div.innerHTML += '<img src="Daten/Ban do DCQH2020 TT Hue_legend.jpg" width=500>' + '<br>'
  div.innerHTML += '<font size=0>Source: Adjusted land use plan of the Thua Thien Hue province from 06.06.2018 (Resolution No. 72 / ND-CP)'
  return div;
}; //HTML für den Inhalt der Legende.


mymap.on('overlayremove', function (event) {
  if (event.layer == layer_BandoDCQH2020TTHue_jpeg90_0) {
    legend_landuse.remove(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer "Stationts_all ist"

mymap.on('overlayadd', function (event) {
  if (event.layer == layer_BandoDCQH2020TTHue_jpeg90_0) {
    legend_landuse.addTo(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer "Stationts_all ist"

//# Gebäude #

mymap.createPane('pane_Buildings');
mymap.getPane('pane_Buildings').style.zIndex = 500;
var img_Buildings = 'Daten/Buildings.png';
var img_bounds_Buildings = [
  [16.394815359, 107.522653968],
  [16.509399468, 107.630200323]
];
var layer_Buildings = new L.imageOverlay(img_Buildings,
  img_bounds_Buildings, {
    pane: 'pane_Buildings'
  });
mymap.addLayer(layer_Buildings);

//Legende Gebäude

var legend_Buildings = L.control({
  position: 'bottomleft'
});

legend_Buildings.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info legend', );
  div.innerHTML += '<strong><font size=3>Buildings</strong>' + '<br>'
  div.innerHTML += '<strong>' + '<font size=0>Height [m]' + '<br>'
  div.innerHTML +=
    '<i style="background:' + '#5a0100' + '"></i> ' + '2 - 3' + '<br>' +
    '<i style="background:' + '#ad0104' + '"></i> ' + '4 - 5' + '<br>' +
    '<i style="background:' + '#ff0109' + '"></i> ' + '6 - 7' + '<br>' +
    '<i style="background:' + '#ff5b20' + '"></i> ' + '8 - 9' + '<br>' +
    '<i style="background:' + '#feb537' + '"></i> ' + '> 9' + '<br>'
  div.innerHTML += '<font size=0>Source: GIS Hue Project (2006-2011): <br>Thua Thien Hue Department of Science and Technology<br>and Vietnam natural resources and environment corporation <br>under regulation number of 2123/QĐ-UBND Thua Thien<br>Hue people committee 24/6/2005'
  return div;
};
legend_Buildings.addTo(mymap)
mymap.on('overlayremove', function (event) {
  if (event.layer == layer_Buildings) {
    legend_Buildings.remove(mymap);
  }
});

mymap.on('overlayadd', function (event) {
  if (event.layer == layer_Buildings) {
    legend_Buildings.addTo(mymap);
  }
});

//# Szenarien #

var hash = new L.Hash(mymap);

var autolinker = new Autolinker({
  truncate: {
    length: 30,
    location: 'smart'
  }
});

function Popup_Szenarien(feature, layer) {
  var popupContent = '<table>\
                    <tr>\
                        <th scope="row">Water depth [m]:</th>\
                        <td>' + (feature.properties['Maximum_wa'] !== null ? autolinker.link(feature.properties['Maximum_wa'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Flood duration [min]:</th>\
                        <td>' + (feature.properties['Duration_a'] !== null ? autolinker.link(feature.properties['Duration_a'].toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
  layer.bindPopup(popupContent, {
    maxHeight: 400
  });
}

function style_scenarios(feature) {
  if (feature.properties['Maximum_wa'] >= 0.000000 && feature.properties['Maximum_wa'] <= 0.100000) {
    return {
      stroke: false,
      fill: true,
      fillOpacity: 0.8,
      fillColor: 'rgba(255,235,190,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['Maximum_wa'] >= 0.100000 && feature.properties['Maximum_wa'] <= 0.500000) {
    return {
      stroke: false,
      fill: true,
      fillOpacity: 0.8,
      fillColor: 'rgba(49,219,109,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['Maximum_wa'] >= 0.500000 && feature.properties['Maximum_wa'] <= 1.000000) {
    return {
      stroke: false,
      fill: true,
      fillOpacity: 0.8,
      fillColor: 'rgba(40,235,194,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['Maximum_wa'] >= 1.000000 && feature.properties['Maximum_wa'] <= 2.000000) {
    return {
      stroke: false,
      fill: true,
      fillOpacity: 0.8,
      fillColor: 'rgba(40,198,243,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['Maximum_wa'] >= 2.000000 && feature.properties['Maximum_wa'] <= 3.000000) {
    return {
      stroke: false,
      fill: true,
      fillOpacity: 0.8,
      fillColor: 'rgba(49,109,239,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['Maximum_wa'] >= 3.000000 && feature.properties['Maximum_wa'] <= 20.000000) {
    return {
      stroke: false,
      fill: true,
      fillOpacity: 0.8,
      fillColor: 'rgba(4,19,133,1.0)',
      interactive: true,
    }
  }
}
mymap.createPane('pane_A0B0C0');
mymap.getPane('pane_A0B0C0').style['mix-blend-mode'] = 'normal';
var A0B0C0 = new L.geoJson(json_A0B0C0_0, {
  interactive: true,
  pane: 'pane_A0B0C0',
  onEachFeature: Popup_Szenarien,
  style: style_scenarios,
});

mymap.createPane('pane_A0B1C0');
mymap.getPane('pane_A0B1C0').style['mix-blend-mode'] = 'normal';
var A0B1C0 = new L.geoJson(json_A0B1C0_0, {
  interactive: true,
  pane: 'pane_A0B1C0',
  onEachFeature: Popup_Szenarien,
  style: style_scenarios,
});


mymap.createPane('pane_A0B2C0');
mymap.getPane('pane_A0B2C0').style['mix-blend-mode'] = 'normal';
var A0B2C0 = new L.geoJson(json_A0B2C0_0, {
  interactive: true,
  pane: 'pane_A0B2C0',
  onEachFeature: Popup_Szenarien,
  style: style_scenarios,
});


mymap.on('overlayadd', function (eo) {
  if (eo.name === 'A0B0C0') {
    setTimeout(function () {
      mymap.removeLayer(A0B2C0),
        mymap.removeLayer(A0B1C0)
    }, 10);
  } else if (eo.name === 'A0B1C0') {
    setTimeout(function () {
      mymap.removeLayer(A0B0C0),
        mymap.removeLayer(A0B2C0)
    }, 10);
  } else if (eo.name === 'A0B2C0') {
    setTimeout(function () {
      mymap.removeLayer(A0B0C0),
        mymap.removeLayer(A0B1C0)
    }, 10);
  }
});

// Legenden für die einzelnen Szenarien. Etwas globig aber eine schlankere Variante mit einer Legende für alle hat nicht funktioniert :c

var legend_A0B0C0 = L.control({
  position: 'bottomleft'
});

legend_A0B0C0.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info legend', );
  div.innerHTML += '<strong><font size=3>Flood scenario A0B0C0</strong>' + '<br>'
  div.innerHTML += '<font size=1>Without consideration of climate change' + '<br>'
  div.innerHTML += '<strong>' + '<font size=0>Water depth [m]' + '<br>'
  div.innerHTML +=
    '<i style="background:' + '#041385' + '"></i> ' + '> 3' + '<br>' +
    '<i style="background:' + '#316def' + '"></i> ' + '> 2 - 3' + '<br>' +
    '<i style="background:' + '#28c6f3' + '"></i> ' + '> 1 - 2' + '<br>' +
    '<i style="background:' + '#28ebc2' + '"></i> ' + '> 0.5 - 1' + '<br>' +
    '<i style="background:' + '#31db6d' + '"></i> ' + '> 0.1 - 0.5' + '<br>' +
    '<i style="background:' + '#ffebbe' + '"></i> ' + '< 0.1' + '<br>'
  div.innerHTML += '<font size=0>Source: M-BRACE project (2014): Tuyen, H.T., Hoa, N.V., Minh, N.D.:<br>Assessing Flood Drainage Capacity of Hue City under Impacts of <br>Urban Development and Climate Change, Technical Report.'
  return div;
};

mymap.on('overlayremove', function (event) {
  if (event.layer == A0B0C0) {
    legend_A0B0C0.remove(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer einer der Szenarien ist

mymap.on('overlayadd', function (event) {
  if (event.layer == A0B0C0) {
    legend_A0B0C0.addTo(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer einer der Szenarien ist

var legend_A0B1C0 = L.control({
  position: 'bottomleft'
});

legend_A0B1C0.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info legend', );
  div.innerHTML += '<strong><font size=3>Flood scenario A0B1C0</strong>' + '<br>'
  div.innerHTML += '<font size=1>Precipiation increase of 22.9%, sea level rise of 13 cm' + '<br>'
  div.innerHTML += '<strong>' + '<font size=0>Water depth [m]' + '<br>'
  div.innerHTML +=
    '<i style="background:' + '#041385' + '"></i> ' + '> 3' + '<br>' +
    '<i style="background:' + '#316def' + '"></i> ' + '> 2 - 3' + '<br>' +
    '<i style="background:' + '#28c6f3' + '"></i> ' + '> 1 - 2' + '<br>' +
    '<i style="background:' + '#28ebc2' + '"></i> ' + '> 0.5 - 1' + '<br>' +
    '<i style="background:' + '#31db6d' + '"></i> ' + '> 0.1 - 0.5' + '<br>' +
    '<i style="background:' + '#ffebbe' + '"></i> ' + '< 0.1' + '<br>'
  div.innerHTML += '<font size=0>Source: M-BRACE project (2014): Tuyen, H.T., Hoa, N.V., Minh, N.D.:<br>Assessing Flood Drainage Capacity of Hue City under Impacts of <br>Urban Development and Climate Change, Technical Report.'
  return div;
};

mymap.on('overlayremove', function (event) {
  if (event.layer == A0B1C0) {
    legend_A0B1C0.remove(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer einer der Szenarien ist

mymap.on('overlayadd', function (event) {
  if (event.layer == A0B1C0) {
    legend_A0B1C0.addTo(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer einer der Szenarien ist

var legend_A0B2C0 = L.control({
  position: 'bottomleft'
});

legend_A0B2C0.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info legend', );
  div.innerHTML += '<strong><font size=3>Flood scenario A0B2C0</strong>' + '<br>'
  div.innerHTML += '<font size=1>Precipiation increase of 44.3%, sea level rise of 26 cm ' + '<br>'
  div.innerHTML += '<strong>' + '<font size=0>Water depth [m]' + '<br>'
  div.innerHTML +=
    '<i style="background:' + '#041385' + '"></i> ' + '> 3' + '<br>' +
    '<i style="background:' + '#316def' + '"></i> ' + '> 2 - 3' + '<br>' +
    '<i style="background:' + '#28c6f3' + '"></i> ' + '> 1 - 2' + '<br>' +
    '<i style="background:' + '#28ebc2' + '"></i> ' + '> 0.5 - 1' + '<br>' +
    '<i style="background:' + '#31db6d' + '"></i> ' + '> 0.1 - 0.5' + '<br>' +
    '<i style="background:' + '#ffebbe' + '"></i> ' + '< 0.1' + '<br>'
  div.innerHTML += '<font size=0>Source: M-BRACE project (2014): Tuyen, H.T., Hoa, N.V., Minh, N.D.:<br>Assessing Flood Drainage Capacity of Hue City under Impacts of <br>Urban Development and Climate Change, Technical Report.'
  return div;
};

mymap.on('overlayremove', function (event) {
  if (event.layer == A0B2C0) {
    legend_A0B2C0.remove(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer einer der Szenarien ist

mymap.on('overlayadd', function (event) {
  if (event.layer == A0B2C0) {
    legend_A0B2C0.addTo(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer einer der Szenarien ist

//# Messstationen #
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

// Messstationen: Legende 
var legend_stations = L.control({
  position: 'bottomleft'
}); //Position der Legende wird in neu erstellter Variable geregelt.

legend_stations.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info');
  div.innerHTML += '<strong><font size=3>Climate stations </strong>' + '<br>'
  div.innerHTML += '<img src="Marker/station_rainfall.svg" width=15, height=15>' + '&nbsp' + '&nbsp' + 'Rainfall' + '<br>'
  div.innerHTML += '<img src="Marker/station_hydrological.svg" width=15, height=15>' + '&nbsp' + '&nbsp' + 'Hydrological' + '<br>'
  div.innerHTML += '<img src="Marker/station_hydrometeorological.svg" width=15, height=15>' + '&nbsp' + '&nbsp' + 'Hydro-Meterological' + '<br>'
  div.innerHTML += '<font size=0>Source: Sub-Institute of Hydrometeorology<br>and Climate Change (MONRE-IMHEN)'
  return div;
}; //HTML für den Inhalt der Legende.

legend_stations.addTo(mymap); // schon von Anfang an geladen, da Stationen bereits angezeigt werden

mymap.on('overlayremove', function (event) {
  if (event.layer == Stations_all) {
    legend_stations.remove(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer "Stationts_all ist"

mymap.on('overlayadd', function (event) {
  if (event.layer == Stations_all) {
    legend_stations.addTo(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer "Stationts_all ist"

//# Stadtteile #

function style_wards(feature) { // setzt nacher den style der STadtteile fest
  return {
    fillColor: 'white',
    weight: 1.8,
    opacity: 0.3,
    color: 'darkred',
    fillOpacity: 0.0
  };
};

var wards =
  L.geoJSON(wards, {
    style: style_wards,
    onEachFeature: Popup_wards
  }).addTo(mymap);


// Messstationen: Legende 
var legend_wards = L.control({
  position: 'bottomleft'
}); //Position der Legende wird in neu erstellter Variable geregelt.

legend_wards.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info');
  div.innerHTML += '<strong><font size=3>Wards </strong>' + '<br>'
  div.innerHTML += '<font size=0>Source: GADM (2020) version 3.6'
  return div;
}; //HTML für den Inhalt der Legende.

legend_wards.addTo(mymap); // schon von Anfang an geladen, da Stationen bereits angezeigt werden

mymap.on('overlayremove', function (event) {
  if (event.layer == wards) {
    legend_wards.remove(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer "wards" ist

mymap.on('overlayadd', function (event) {
  if (event.layer == wards) {
    legend_wards.addTo(mymap);
  }
}); // Hier wird die Legende aus bzw. angeschalten wenn der aktive Layer "wards" ist

//# SAR Imagery #
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


//#### LAYERCONTROL ####

var baseMaps = [{
  groupName: "Basemaps",
  expanded: true,
  layers: {
    "OSM": OpenStreetMap,
    "Open Topo Map": OpenTopoMap,
    "World Imagery": Esri_WorldImagery,
    "Light Gray": Esri_WorldGrayCanvas
  }
}]; // Variable für den Inhalt des Drop-Down Menüs "Basiskarten"

var overlays = [{
    groupName: "Flood scenarios",
    expanded: true,
    layers: {
      "A0B0C0": A0B0C0,
      "A0B1C0": A0B1C0,
      "A0B2C0": A0B2C0,
    }
  },
  {
    groupName: "Basedata",
    expanded: true,
    layers: {
      "Climate stations": Stations_all,
      "Wards": wards,
      "Buildings": layer_Buildings,
      "Landuse plan": layer_BandoDCQH2020TTHue_jpeg90_0
    }
  },
  {
    groupName: "SAR-Imagery",
    expanded: true,
    layers: {
      "09.10.2019": layer_PAZ_20191009_4,
      "31.10.2019": layer_PAZ_20191031_3,
      "03.12.2019": layer_PAZ_20191203_2 //,
      //"Downloadlinks": empty
    }
  }
]; // Variable für den Inhalt des Drop-Down Menüs "SAR-Bilder" und "Grunddaten"

var options = {
  container_width: "300px",
  container_maxHeight: "600px",
  group_maxHeight: "80px",
  exclusive: false,
  collapsed: false,
}; // Optionen für die Layerübersicht

var control = L.Control.styledLayerControl(baseMaps, overlays, options); // Erstellung der Layerübersicht aus den vorherig definierten Variablen
mymap.addControl(control); //Hinzufügen der erstellten Layerübersicht zur Karte

//#### MINIMAP ####

var miniMap_ctrl = new L.Control.MiniMap(minimapbase, {
  toggleDisplay: true,
  autoToggleDisplay: true,
  minimized: true,
  width: 250,
  heigth: 150,
  zoomLevelFixed: 9,
  aimingRectOptions: {
    color: 'blue'
  }
}).addTo(mymap); // Minimap wird erstellt und der Karte mit Optionen hinzugefügt

//#### DOWNLOADKASTEN ####//

var Downloadkasten = L.control({
  position: 'topright'
}); //Variable für den Downloadkasten oben rechts (Topright) aber unter der Layer-Control

Downloadkasten.onAdd = function (mymap) {
  var div = L.DomUtil.create('div', 'info');
  div.innerHTML += '<strong><font size=3> Data-Download </strong>' + '<br>'
  div.innerHTML += '<a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/raw/master/Downloadsektion/Nha_buildings_2000_WGS84_height.zip' + '">' + '<img src="Grafiken/Download.svg" height=12>' + '</a>' + '&nbsp' + 'Buildings' + '<br>' +
    '<a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/raw/master/Downloadsektion/hydrometeorological_stations.zip' + '">' + '<img src="Grafiken/Download.svg" height=12>' + '</a>' + '&nbsp' + 'Climate stations' + '<br>' +
    '<a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/raw/master/Downloadsektion/HueProvince_wards.zip' + '">' + '<img src="Grafiken/Download.svg" height=12>' + '</a>' + '&nbsp' + 'Wards' + '<br>' +
    '<a href="' + 'https://github.com/ManuN/FloodVPN_WebMap/raw/master/Downloadsektion/Flood_scenarios.zip' + '">' + '<img src="Grafiken/Download.svg" height=12>' + '</a>' + '&nbsp' + 'Flood scenarios'
  return div;
}; //HTML für den Inhalt des Downloadfensters

Downloadkasten.addTo(mymap); //Downloadkasten wird der Karte hinzugefügt