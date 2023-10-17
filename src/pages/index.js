import {React, useState, useEffect} from 'react';
import { Inter } from 'next/font/google';
import SearchBar from '@/features/SearchBar/SearchBar';
import Map from '@/features/Map';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredLocations, selectSelectedLocation, setLocation, fetchLocations } from '@/features/Location/locationsSlice';
import LocationDetail from '@/features/Location/LocationDetails';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  
  const dispatch = useDispatch();
  const selectedLocation = useSelector(selectSelectedLocation);
  const locations = useSelector(selectFilteredLocations);
  const locationsStatus = useSelector(state => state.locations.status);

  useEffect(() => {
    if (locationsStatus === 'idle') {
      dispatch(fetchLocations());
    }
  }, [locationsStatus, dispatch]);

  const [showDetail, setShowDetail] = useState(false);
  
  const handlerMarkerClick = location => {
    dispatch(setLocation(location));
    setShowDetail(true);
  }

  return (
    <>

      <div className='relative -z-0'>
        <Map>
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
      </div>

      <SearchBar/>
      
      {showDetail && <LocationDetail location={selectedLocation} handleClose={() => setShowDetail(false)}/>}
    </>
  );
}
