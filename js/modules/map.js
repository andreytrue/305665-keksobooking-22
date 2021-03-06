/* global L:readonly */

import {createCardTemplate} from './card.js';
import {setAddress} from './form.js';
import {enableMap, disableMap} from './filter.js';

disableMap();

const mapElement = document.querySelector('#map-canvas');

const MAIN_PIN_X = 35.6684415;
const MAIN_PIN_Y = 139.7616374;

const map = L.map(mapElement)
  .on('load', enableMap)
  .setView({
    lat: MAIN_PIN_X,
    lng: MAIN_PIN_Y,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const mainPinMarker = L.marker(
  {
    lat: MAIN_PIN_X,
    lng: MAIN_PIN_Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);
setAddress(mainPinMarker.getLatLng());

const addPointOnMap = (point) => {
  const lat = point.location.x
  const lng = point.location.y;

  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: pinIcon,
  });

  marker
    .addTo(map)
    .bindPopup(
      createCardTemplate(point),
    );
}

mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

export {disableMap, enableMap, addPointOnMap};
