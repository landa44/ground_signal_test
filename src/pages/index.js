import { Inter } from 'next/font/google';
import SearchBar from '@/features/searchBar/SearchBar';
import Map from '@/features/Map';
import { useSelector } from 'react-redux';
import { selectFilteredLocations, selectSelectedId } from '@/features/searchBar/locationsSlice';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const locations = useSelector(selectFilteredLocations);
  const selectedLocationId = useSelector(selectSelectedId);

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
              locations.map( item => {
                console.log("heeey");
                console.log(selectedLocationId);
                if(selectedLocationId != item.id)
                  return (
                    <Marker 
                    key={item.id} 
                    position={[item.location.lat, item.location.lon]} 
                    icon={Leaflet.icon({
                      iconUrl: 'leaflet/images/marker-icon.png',
                      iconRetinaUrl: 'leaflet/images/marker-icon-2x.png', 
                      iconSize:[25, 41], 
                    })}
                    />
                  );
                return(
                  <Marker 
                    key={item.id} 
                    position={[item.location.lat, item.location.lon]} 
                    icon={Leaflet.icon({
                      iconUrl: 'leaflet/images/marker-icon-gold.png',
                      iconRetinaUrl: 'leaflet/images/marker-icon-2x-gold.png', 
                      iconSize:[25, 41], 
                    })}
                  />
                )
              })
            }
          </>
        }
      </Map>

      </div>

      <SearchBar></SearchBar>

    </>
  );
}
