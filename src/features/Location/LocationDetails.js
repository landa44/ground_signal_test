import React from "react";
import Link from "next/link";
import LocationOverview from "./LocationOverview";


export default function LocationDetail({location, handleClose}){
  return (
    <>
      <div className='h-screen w-full top-0 left-0 fixed bg-gray-800 bg-opacity-70 z-50'>
            <button type="button" class="fixed right-0 rounded p-2 items-center text-gray-400 hover:bg-red-500" onClick={handleClose}>
              <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-gray-50 rounded text-black">
              <div className='flex justify-between'>
                <LocationOverview item={location}/>

                {location.details !== undefined && location.details.website !== undefined &&
                  <Link 
                    href={location.details.website} 
                    className='m-2 bg-blue-500 rounded py-2 px-4 text-white shadow-md hover:bg-blue-300 transition-all'>
                    Visit Website
                  </Link>
                }
              </div>
              <hr/>
              <p className='px-2 py-3'>
                {location.details !== undefined && location.details.description !== undefined?
                  location.details.description:
                  "Sorry we don't have info about this location."
                }
              </p>

              {location.images !== undefined && 
                <div className='flex flex-wrap px-1 justify-between overflow-auto max-h-64'>
                  {location.images.map( (imagePath, idx) =>
                    <img key={idx} className='p-1 w-1/3' src={imagePath}/>
                  )}
                </div>

              }
            </div>
          </div>
    </>
  );
        
}