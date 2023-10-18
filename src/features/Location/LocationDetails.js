import React from "react";
import Link from "next/link";
import LocationOverview from "../../components/BaseLocationOverview";
import BaseButton from "@/components/BaseButton";
import CloseButton from "@/components/CloseButton";


export default function LocationDetail({location, handleClose}){
  return (
    <>
      <div className="h-screen w-full top-0 left-0 fixed bg-gray-800 bg-opacity-70 z-50">
            <CloseButton handleClick={handleClose}/>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-gray-50 rounded text-black">
              <div className="flex justify-between">
                <LocationOverview item={location}/>

                {location.details !== undefined && location.details.website !== undefined &&
                  <Link 
                    href={location.details.website} 
                    >
                    <BaseButton>
                      Visit Website
                    </BaseButton>
                  </Link>
                }
              </div>
              <hr/>
              <p className="px-2 py-3">
                {location.details !== undefined && location.details.description !== undefined?
                  location.details.description:
                  "Sorry we don't have info about this location."
                }
              </p>

              {location.images !== undefined && 
                <div className="flex flex-wrap px-1 justify-between overflow-auto max-h-64">
                  {location.images.map( (imagePath, idx) =>
                    <img key={idx} className="p-1 w-1/3" src={imagePath}/>
                  )}
                </div>

              }
            </div>
          </div>
    </>
  );
        
}