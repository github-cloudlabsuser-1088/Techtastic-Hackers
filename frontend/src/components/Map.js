// Map.js
import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ countries, selectedCountryCode }) => (
  <MapContainer center={countries[selectedCountryCode]?.latlng || [0, 0]} zoom={4} style={{ height: '400px', width: '100%', marginTop: '20px' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {Object.entries(countries).map(([code, { latlng, name }]) => (
      <Circle key={code} center={latlng} radius={50000} color="blue" fillColor="blue">
        <Popup>{name}</Popup>
      </Circle>
    ))}
  </MapContainer>
);

export default Map;
