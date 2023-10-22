import {React, useState}  from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import Leaflet from 'leaflet';


function SelectedLocationMarker({position, key, handlerMarkerClick}) {
  const map = useMap();
  map.flyTo(position, 13);
  
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


export default function Map({children, className, defaultCenter}) {
  const [center, setCenter] = useState(null);

  navigator.geolocation.getCurrentPosition(
    (location) => {
      // Successful retrieval of user's location
        setCenter( [
        location.coords.latitude,
        location.coords.longitude
      ])
    },
    (error) => {
      setCenter(defaultCenter);
    }
  );

  return ( <>
  {center !== null && <MapContainer className={className} center={center} zoom={13} scrollWheelZoom={true} zoomControl={false}>
    {children(TileLayer, Marker, SelectedLocationMarker, Leaflet)}
  </MapContainer>}
  
  </>
  );
}
