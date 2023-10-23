import React from "react";
import Link from "next/link";
import BaseLocationOverview from "../../components/BaseLocationOverview";
import BaseButton from "@/components/BaseButton";
import CloseButton from "@/components/CloseButton";
import BarChart from "../BarChart/BarChart";

export default function LocationDetail({ location, handleClose }) {
  return (
    <>
      <div className="h-full w-full top-0 left-0 fixed bg-gray-800 bg-opacity-70 z-50">
        <CloseButton handleClick={handleClose} />

        <div className="fixed top-1/2 left-1/2 w-full p-2 transform -translate-x-1/2 -translate-y-1/2 sm:w-96 bg-gray-50 rounded text-black">
          <div className="flex justify-between">
            <BaseLocationOverview item={location} />

            {location.details !== undefined &&
              location.details.website !== undefined && (
                <Link href={location.details.website}>
                  <BaseButton>Visit Website</BaseButton>
                </Link>
              )}
          </div>
          <hr />

          <div className="max-h-[80vh] overflow-auto  sm:max-h-96">
            <p className="py-3">
              {location.details !== undefined &&
              location.details.description !== undefined
                ? location.details.description
                : "Sorry we don't have info about this location."}
            </p>

            {location.details !== undefined &&
              location.details.avgStoreTraffic !== undefined && (
                <BarChart data={location.details.avgStoreTraffic} />
              )}

            {location.images !== undefined && (
              <div className="flex flex-wrap my-2">
                {location.images.map((imagePath, idx) => (
                  <img
                    key={idx}
                    className="p-1 w-1/2 sm:w-1/3"
                    src={imagePath}
                    alt={`Picture #${idx + 1} of ${location.name}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
