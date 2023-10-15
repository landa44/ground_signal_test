import React, {useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { selectFilteredLocations } from '../searchBar/locationsSlice';
import { useSelector } from 'react-redux';
import Leaflet from 'leaflet';
import dynamic from 'next/dynamic';

// Use dynamic import to load MapContainer on the client side

const customMapStyle = {
  width: '100%',
  height: '100vh'
};

function Map() {
  const locations = useSelector(selectFilteredLocations);

  // useEffect(() => {
  //   // Handle changes in the locations array and update markers on the map
  //   // For simplicity, we'll remove all existing markers and re-add them
  //   // You may want to implement more efficient marker management in a real-world app
  //   const map = L.map('map');

  //   // Clear existing markers
  //   map.eachLayer((layer) => {
  //     if (layer instanceof L.Marker) {
  //       map.removeLayer(layer);
  //     }
  //   });

  //   // Add markers for each location in the Redux state
  //   locations.forEach((item) => {
  //     L.marker([item.location.lat, item.location.lon]).addTo(map).bindPopup(item.name);
  //   });
  // }, [locations]);

  return ( 
      <MapContainer style={customMapStyle} center={[42.354022, -71.046245]} zoom={13} scrollWheelZoom={true} zoomControl={false}>
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="http://127.0.0.1:8000/tiles/{z}/{x}/{y}.png"
          /> */}
      </MapContainer>
    );
}

export default Map;