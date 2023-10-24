import { React, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredLocations,
  selectChosenLocation,
  setLocation,
} from "@/features/Location/locationsSlice";
import LocationDetail from "@/features/Location";

//since Leaflet use client side rendering, import it disabling ssr
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function CustomMap({ className, defaultCenter }) {
  const [showDetail, setShowDetail] = useState(false);

  const dispatch = useDispatch();
  const chosenLocation = useSelector(selectChosenLocation);
  const locations = useSelector(selectFilteredLocations);

  const handlerMarkerClick = (location) => {
    dispatch(setLocation(location));
    setShowDetail(true);
  };

  return (
    <>
      <Map className={className} defaultCenter={defaultCenter}>
        {(TileLayer, Marker, SelectedLocationMarker, Leaflet) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Displaying the filtered list */}
            {locations.map((item) =>
              chosenLocation === null || chosenLocation.id != item.id ? (
                <Marker
                  key={item.id}
                  position={[item.location.lat, item.location.lon]}
                  icon={Leaflet.icon({
                    iconUrl: "leaflet/images/marker-icon.png",
                    iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
                    iconSize: [25, 41],
                  })}
                  eventHandlers={{
                    click: () => handlerMarkerClick(item),
                  }}
                />
              ) : (
                <SelectedLocationMarker
                  key={item.id}
                  position={[item.location.lat, item.location.lon]}
                  handlerMarkerClick={() => handlerMarkerClick(item)}
                />
              )
            )}
          </>
        )}
      </Map>

      {showDetail && (
        <LocationDetail
          location={chosenLocation}
          handleClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
