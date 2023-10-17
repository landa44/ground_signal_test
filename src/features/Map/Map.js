import {React, useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { selectFilteredLocations } from '../Location/locationsSlice';
import { useSelector } from 'react-redux';
import Leaflet from 'leaflet';

const customMapStyle = {
  width: '100%',
  height: '100vh'
};

export default function Map({children}) {
  const locations = useSelector(selectFilteredLocations);

  return ( 
      <MapContainer style={customMapStyle} center={[42.354022, -71.046245]} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        {children(TileLayer, Marker, Leaflet)}
      </MapContainer>
    );
}
