import { React, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import Leaflet from "leaflet";

const MAP_ZOOM = 13;

function SelectedLocationMarker({ key, position, handlerMarkerClick }) {
  const map = useMap();
  map.flyTo(position, MAP_ZOOM);

  return (
    <Marker
      key={key}
      position={position}
      icon={Leaflet.icon({
        iconUrl: "leaflet/images/marker-icon-gold.png",
        iconRetinaUrl: "leaflet/images/marker-icon-2x-gold.png",
        iconSize: [25, 41],
      })}
      eventHandlers={{
        click: handlerMarkerClick,
      }}
    />
  );
}

export default function Map({ children, className, defaultCenter }) {
  const [center, setCenter] = useState(null);

  navigator.geolocation.getCurrentPosition(
    (location) => {
      setCenter([location.coords.latitude, location.coords.longitude]);
    },
    () => {
      setCenter(defaultCenter);
    }
  );

  return (
    <>
      {center !== null && (
        <MapContainer
          className={className}
          center={center}
          zoom={MAP_ZOOM}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          {children(TileLayer, Marker, SelectedLocationMarker, Leaflet)}
        </MapContainer>
      )}
    </>
  );
}
