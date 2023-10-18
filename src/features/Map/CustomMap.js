import React from "react";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
    ssr: false
});

export default function CustomMap({className, center, locations, selectedLocation, handlerMarkerClick}) {
  return (
    <Map className={className} center={center}>
      { (TileLayer, Marker, Leaflet) =>
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {
            locations.map( item =>
              <Marker 
                key={item.id} 
                position={[item.location.lat, item.location.lon]} 
                icon={Leaflet.icon(
                  selectedLocation === null || selectedLocation.id != item.id?
                  {
                    iconUrl: 'leaflet/images/marker-icon.png',
                    iconRetinaUrl: 'leaflet/images/marker-icon-2x.png', 
                    iconSize:[25, 41], 
                  }:
                  {
                    iconUrl: 'leaflet/images/marker-icon-gold.png',
                    iconRetinaUrl: 'leaflet/images/marker-icon-2x-gold.png', 
                    iconSize:[25, 41], 
                  }
                )}
                eventHandlers={{
                  click: () => handlerMarkerClick(item),
                }}
              
              />
            )
          }
        </>
      }
    </Map>
  );
}