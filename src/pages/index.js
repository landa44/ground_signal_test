import { Inter } from 'next/font/google';
import SearchBar from '@/features/searchBar/SearchBar';
import Map from '@/features/Map';
// import { TileLayer, Marker } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectFilteredLocations } from '@/features/searchBar/locationsSlice';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const locations = useSelector(selectFilteredLocations);
  return (
    <>
      <div className='relative -z-0'>
      <Map>
        { (TileLayer, Marker) =>
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {
            locations.map( item =>
              <Marker key={item.id} position={[item.location.lat, item.location.lon]}/>
            )}
          </>
        }
      </Map>

      </div>

      <SearchBar></SearchBar>

    </>
  );
}
