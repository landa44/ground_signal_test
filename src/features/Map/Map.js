import {React, useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { selectFilteredLocations } from '../Location/locationsSlice';
import { useSelector } from 'react-redux';
import Leaflet from 'leaflet';


export default function Map({children, className, center}) {
  const locations = useSelector(selectFilteredLocations);

  return ( 
      <MapContainer className={className} center={center} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        {children(TileLayer, Marker, Leaflet)}
      </MapContainer>
    );
}
