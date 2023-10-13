import React from 'react';
import Image from 'next/image';

export default function SearchBar() {
  
    return (
      <div>
        <div className="absolute left-2 top-2 w-96">
          <Image src="icon-search.svg" alt="Search Icon" width={15} height={15} className="absolute left-4 top-1/2  -translate-y-1/2"/>
      
          <input
            type="text"
            placeholder="Search..."
            className="pl-14 w-full border rounded p-2 h-12 bg-gray-50"
          />
        </div>
      </div>
    );
  };