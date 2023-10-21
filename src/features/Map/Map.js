import React  from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import Leaflet from 'leaflet';


function SelectedLocationMarker({position, key, handlerMarkerClick}) {
    const map = useMap();
    map.flyTo(position, map.getZoom(13));
  

  return (
    <Marker 
    key={key} 
    position={position} 
    icon={Leaflet.icon(
      {
        iconUrl: 'leaflet/images/marker-icon-gold.png',
        iconRetinaUrl: 'leaflet/images/marker-icon-2x-gold.png', 
        iconSize:[25, 41], 
      }
    )}
    eventHandlers={{
      click: handlerMarkerClick,
    }}
  
  />
  );
}


export default function Map({children, className, center}) {

  return ( 
      <MapContainer className={className} center={center} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        {children(TileLayer, Marker, SelectedLocationMarker, Leaflet)}
      </MapContainer>
    );
}
