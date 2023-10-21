import {React, useState, useEffect} from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import SearchBar from '@/features/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredLocations, selectSelectedLocation, setLocation, fetchLocations } from '@/features/Location/locationsSlice';
import LocationDetail from '@/features/Location/LocationDetails';
import CustomMap from '@/features/Map/CustomMap';

const inter = Inter({ subsets: ['latin'] })
const DEFAULT_CENTER = [42.354022, -71.046245];


export default function Home() {
  const [showDetail, setShowDetail] = useState(false);

  const dispatch = useDispatch();
  const selectedLocation = useSelector(selectSelectedLocation);
  const locations = useSelector(selectFilteredLocations);
  const locationsStatus = useSelector(state => state.locations.status);

  useEffect(() => {
    if (locationsStatus === 'idle') {
      dispatch(fetchLocations());
    }
  }, [locationsStatus, dispatch]);

  
  const handlerMarkerClick = location => {
    dispatch(setLocation(location));
    setShowDetail(true);
  }

  return (
    <>
      {locationsStatus === 'failed' && window.alert("Sorry. We are having some issues.")}
      <CustomMap 
        className='w-full h-screen relative -z-0' 
        center={DEFAULT_CENTER} 
        locations={locations} selectedLocation={selectedLocation} 
        handlerMarkerClick={handlerMarkerClick}
      />

      <SearchBar className='fixed left-0 top-0 px-4 pt-4 w-full text-black sm:w-96'/>  

      {showDetail && <LocationDetail location={selectedLocation} handleClose={() => setShowDetail(false)}/>}
    </>
  )
}
