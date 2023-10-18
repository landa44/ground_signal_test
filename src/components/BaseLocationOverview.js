import React from "react";
import Image from "next/image";

export default function BaseLocationOverview({item, style="", specialIcon=false, handlerClick=()=>{}}) {
  return (
      <div className={"flex p-2 " + style} onClick={handlerClick}>
          <Image src={specialIcon? "icon-pin-gold.svg":"icon-pin.svg"} 
          alt="Pin Icon" width={17} height={17} className="ml-2 mr-3" />

          <div >
              <p className="text-sm font-bold">{item.name}</p>
              <p className="text-sm text-gray-400">{`${item.location.lat}, ${item.location.lon}`}</p>

          </div>
      </div>
  );
}
