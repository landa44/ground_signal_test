import React from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false
});

export default function CustomMap({ className, defaultCenter, locations, selectedLocation, handlerMarkerClick }) {
  return (
    <Map className={className} defaultCenter={defaultCenter}>
      {(TileLayer, Marker, SelectedLocationMarker, Leaflet) =>
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {
            locations.map(item => selectedLocation === null || selectedLocation.id != item.id ?
              <Marker
                key={item.id}
                position={[item.location.lat, item.location.lon]}
                icon={Leaflet.icon(
                  {
                    iconUrl: "leaflet/images/marker-icon.png",
                    iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
                    iconSize: [25, 41],
                  }
                )}
                eventHandlers={{
                  click: () => handlerMarkerClick(item),
                }}
              /> :
              <SelectedLocationMarker
                key={item.id}
                position={[item.location.lat, item.location.lon]}
                handlerMarkerClick={() => handlerMarkerClick(item)}
              />
            )
          }
        </>
      }
    </Map>
  );
}