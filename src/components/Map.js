import React, { useEffect } from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSrc from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { getData } from './Gallery';

const artIcon = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDMxLjk4NSA0MzEuOTg1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzEuOTg1IDQzMS45ODU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDIzLjI1Nyw1MS44MjljLTAuODA4LTIuMDQ1LTIuNjctMy40ODQtNC44NTMtMy43NTFjLTIuMTc3LTAuMjY2LTQuMzM1LDAuNjgyLTUuNjEyLDIuNDcyICAgYy03LjU4MSwxMC42MjktMTcuNTI5LDE0LjE3Mi0yOS4wNTMsMTguMjc1Yy05LjI5MiwzLjMxLTE4LjkwMSw2LjczLTI5LjI4NiwxNC4xODZjLTE0LjY4NywxMC41NDQtMjEuNDA1LDI0LjkxNy0xOC4wNTUsMzguNTQgICBsLTAuMzU4LDAuNDU5Yy02LjEzMy04Ljg5Ny0xMi44MDYtMTcuMTI2LTE5Ljg0OC0yNC40NzRjLTMyLjk0Ny0zNC4zNzgtNzguOTg0LTU1LjA0Ni0xMjYuMzExLTU2LjcwMyAgIGMtMi4wODUtMC4wNzMtNC4yMDQtMC4xMS02LjI5OC0wLjExYy01Mi44NDYsMC0xMDMuNDI4LDIzLjYyNC0xMzguNzc1LDY0LjgxM0M5LjY0NiwxNDYuNTEyLTUuOTM5LDE5OS44NTMsMi4wNTEsMjUxLjg4MiAgIGMwLjY2OCw0LjM0OSwxLjUwNCw4Ljc0MywyLjQ4NywxMy4wNjNjMTIuOTk2LDU3LjIwMiw0Ni4xODksMTAwLjcxNyw5MS4wNjksMTE5LjM4M2MxMS4wNjMsNC42MDIsMjIuMjIyLDYuOTM0LDMzLjE2Myw2LjkzNCAgIGMyNy4xODMsMCw1MC45MjYtMTQuNTM5LDY1LjE0My0zOS44ODljNS40MDQtOS42NDYsOC44OTEtMTkuNjIxLDEwLjM2LTI5LjY1MWMwLjg2Ni01LjkyLDAuMjc0LTExLjgzNS0wLjMtMTcuNTY3ICAgYy0wLjU5MS01LjktMS4xNDktMTEuNDc2LTAuMjU2LTE3LjA5YzIuMDQ3LTEyLjg2OSwxMS4wMzYtMjAuNTUzLDI0LjA0Ny0yMC41NTNjMy43MDEsMCw3LjQ4MywwLjYwOSwxMS4yNiwxLjgxMiAgIGMtNC40MjIsOC4xMS04LjQzOCwxNS44NTQtMTEuOTQ3LDIzLjAzMmMtNy40MzcsMTUuMjEyLTEyLjU2NywyNy44MS0xNS4yNTIsMzcuNDRjLTEuNjU1LDUuOTM5LTYuMDUyLDIxLjcyMiw0LjY3LDI5LjE2NCAgIGMzLjQwNSwyLjM2Myw3LjcyMiwzLjE5NywxMi4yMTUsMi4zNjFjNC4wNDktMC43NTIsMTYuMzY5LTMuMDQxLDUxLjM3OC00Mi44OTZjOS4zOTYtMTAuNjk1LDE5LjUyMS0yMy4wNzIsMzAuMTA0LTM2Ljc5NCAgIGMyNy4xNjgtOS4xNSw0OC4zMS0zMS45MjEsNTMuOTAzLTU4LjA4N2MxLjQtNi41NDEsMS45ODQtMTMuNTQxLDEuNzM1LTIwLjgxMmMxMC4xNzItMTUuNzIsMTkuMDk0LTMwLjM4OCwyOC4wNzItNDYuMTU2ICAgYzAuMTcyLTAuMzA0LDAuMzQyLTAuNjI4LDAuNTEtMC45NmMxMy4wMzEtMy41NjksMjQuMjU0LTEzLjcxLDMwLjg0Mi0yNy44OTFDNDM0Ljg3MiwxMDYuMDI4LDQzNC4xNjMsNzkuNDI4LDQyMy4yNTcsNTEuODI5eiAgICBNMjc2LjM4NSwxNDkuODM0Yy00LjcxMyw3LjQ4NS0xMi44MTQsMTEuOTU0LTIxLjY3MywxMS45NTRjLTQuODEsMC05LjUxNS0xLjM2MS0xMy42MDUtMy45MzcgICBjLTUuNzgyLTMuNjQyLTkuODAzLTkuMzE3LTExLjMxNi0xNS45OHMtMC4zNDUtMTMuNTE4LDMuMjk4LTE5LjMwMWM0LjcxNC03LjQ4NSwxMi44MTYtMTEuOTU0LDIxLjY3NS0xMS45NTQgICBjNC44MTEsMCw5LjUxNSwxLjM2MSwxMy42MDQsMy45MzhjNS43ODIsMy42NCw5LjgwMiw5LjMxNSwxMS4zMTYsMTUuOTc5QzI4MS4xOTcsMTM3LjE5NywyODAuMDI2LDE0NC4wNTEsMjc2LjM4NSwxNDkuODM0eiAgICBNMzA5LjU5MiwxOTYuMTg3YzEyLjkzNC0xOS4wNTcsMjYuNjEyLTM4LDM5LjYwNC01NC44NWMyLjEwNiwxLjkwMiw0LjQ2MSwzLjc2LDcuMDEyLDUuNTNjNC4yMjcsMi45MzMsOC42NDgsNS4yMDEsMTMuMTY0LDYuNzU0ICAgYy0xMC45NjksMTguNzU4LTIyLjc2MywzNy4zNDItMzcuMDQzLDU4LjM3NWMtMjMuNDYzLDM0LjU3MS00Ny44NTksNjYuNjg0LTY4LjY5NSw5MC40MjQgICBjLTExLjYzOCwxMy4yNi0yMS44MjMsMjMuNDk4LTI5LjY3MSwyOS44MzljMy4wMjktOS42OSw4LjgxOC0yMi45ODksMTYuODc1LTM4Ljc0NiAgIEMyNjUuMjQ1LDI2NS4zMzYsMjg2LjExMSwyMzAuNzcyLDMwOS41OTIsMTk2LjE4N3ogTTgyLjUwNiwxOTYuMDIzYy00LjgxMSwwLTkuNTE2LTEuMzYxLTEzLjYwNy0zLjkzOCAgIGMtNS43ODItMy42NDEtOS44MDEtOS4zMTQtMTEuMzE1LTE1Ljk3OWMtMS41MTQtNi42NjQtMC4zNDItMTMuNTE5LDMuMzAxLTE5LjMwMmM0LjcxMS03LjQ4NCwxMi44MTMtMTEuOTUzLDIxLjY3MS0xMS45NTMgICBjNC44MTIsMCw5LjUxNywxLjM2MSwxMy42MDcsMy45MzhjMTEuOTM2LDcuNTE4LDE1LjUzMiwyMy4zNDUsOC4wMTksMzUuMjc5Qzk5LjQ2NiwxOTEuNTU0LDkxLjM2MywxOTYuMDIzLDgyLjUwNiwxOTYuMDIzeiAgICBNNTUuNjg4LDI1Mi4zNThjNC43MTMtNy40ODYsMTIuODE0LTExLjk1NSwyMS42NzMtMTEuOTU1YzQuODEsMCw5LjUxNCwxLjM2MiwxMy42MDYsMy45MzhjNS43ODIsMy42NDEsOS44MDEsOS4zMTUsMTEuMzE1LDE1Ljk3OSAgIGMxLjUxNSw2LjY2MiwwLjM0MywxMy41MTYtMy4zMDEsMTkuMzAxYy00LjcxMSw3LjQ4My0xMi44MTMsMTEuOTUzLTIxLjY3MSwxMS45NTNjLTQuODExLDAtOS41MTctMS4zNjEtMTMuNjA5LTMuOTM4ICAgYy01Ljc4Mi0zLjY0Mi05LjgtOS4zMTUtMTEuMzEzLTE1Ljk3OUM1MC44NzYsMjY0Ljk5NSw1Mi4wNDksMjU4LjE0LDU1LjY4OCwyNTIuMzU4eiBNMTM3LjYyLDEwMC40MTQgICBjNC43MTMtNy40ODUsMTIuODE1LTExLjk1NCwyMS42NzMtMTEuOTU0YzQuODA5LDAsOS41MTQsMS4zNjEsMTMuNjA0LDMuOTM3YzExLjkzNyw3LjUxNiwxNS41MzMsMjMuMzQ0LDguMDE5LDM1LjI4ICAgYy00LjcxNSw3LjQ4Ni0xMi44MTcsMTEuOTU1LTIxLjY3NSwxMS45NTVjLTQuODEsMC05LjUxNS0xLjM2MS0xMy42MDUtMy45MzhjLTUuNzgxLTMuNjQtOS43OTktOS4zMTQtMTEuMzEzLTE1Ljk3OSAgIEMxMzIuODA3LDExMy4wNTIsMTMzLjk3OSwxMDYuMTk4LDEzNy42MiwxMDAuNDE0eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';

const iconStyle = new Style({
  image: new Icon(({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: artIcon,
    scale: 0.04,
  })),
});

let STHLMmap = '';

export function ArtMap() {
  useEffect(() => {
    setMap();
  }, []);
  return (
    <div className="map" id="map" />
  );
}

function setMap() {
  const mapCenter = fromLonLat([18.068581, 59.329323]);
  const map = document.querySelector('.map');
  map.style.height = '100%';
  map.style.width = '100%';
  map.style.position = 'fixed';

  STHLMmap = new Map({
    view: new View({
      center: mapCenter,
      zoom: 13,

    }),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    target: 'map',
  });
  const data = getData();
  if (data) {
    data.map(el => addMarker(el.title, el.longitude, el.latitude));
  }
}

function addMarker(name, lon, lat) {
  const marker = new Feature({
    geometry: new Point(fromLonLat([lon, lat])),
    name: `${name}`,
  });
  marker.setStyle(iconStyle);

  const src = new VectorSrc({
    features: [marker],
  });

  const markersLayer = new VectorLayer({
    source: src,
  });

  return STHLMmap.addLayer(markersLayer);
}

export default addMarker;
