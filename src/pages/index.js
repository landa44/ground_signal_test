import {React, useState} from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import SearchBar from '@/features/searchBar/SearchBar';
import { ItemList } from '@/features/searchBar/SearchBar';
import Map from '@/features/Map';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredLocations, selectLocations, selectSelectedLocation, setLocation } from '@/features/searchBar/locationsSlice';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const locations = useSelector(selectFilteredLocations);
  const selectedLocation = useSelector(selectSelectedLocation);
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();

  console.log(showDetail);

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

      <SearchBar></SearchBar>
      
      {showDetail && 
        (
          <div className='h-screen w-full top-0 left-0 fixed bg-gray-800 bg-opacity-70 z-50'>
            <button type="button" class="fixed right-0 rounded p-2 items-center text-gray-400 hover:bg-red-500">
              <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-gray-50 rounded text-black">
              <div className='flex justify-between'>
                <ItemList item={selectedLocation}/>

                {selectedLocation.details !== undefined && selectedLocation.details.website !== undefined &&
                  <Link 
                    href={selectedLocation.details.website} 
                    className='m-2 bg-blue-500 rounded py-2 px-4 text-white shadow-md hover:bg-blue-300 transition-all'>
                    Visit Website
                  </Link>
                }
              </div>
              <hr/>
              <p className='px-2 py-3'>
                {selectedLocation.details !== undefined && selectedLocation.details.description !== undefined?
                  selectedLocation.details.description:
                  "Sorry we don't have info about this location."
                }
              </p>

              {selectedLocation.images !== undefined && 
                <div className='flex flex-wrap px-1 justify-between overflow-auto max-h-64'>
                  {selectedLocation.images.map( (imagePath, idx) =>
                    <img key={idx} className='p-1 w-1/3' src={imagePath}/>
                  )}
                </div>

              }
            </div>
          </div>

        )
      
      }
    </>
  );
}
