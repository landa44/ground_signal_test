import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { filterLocations, selectFilteredLocations, fetchLocations, selectSelectedLocation, setLocation } from '../Location/locationsSlice';
import { useSelector, useDispatch } from 'react-redux';
import BaseLocationOverview from '@/components/BaseLocationOverview';


const ResultList = ({list, selectedItem, handlerClick}) => {  
  return (
    <>
      {list.length===0?
        <div className='p-2 bg-red-500 rounded'>
        <p className='text-sm text-gray-50 ml-2'>Sorry, any data matched with this prefix</p>
        </div>
      :
        <div className='p-2 bg-blue-500 rounded-t'>
          <p className='text-sm text-gray-50 ml-2'>Found {list.length} Results:</p>
        </div>
      }
      <div className='mb-2'>
        {list.map( item => (
          <BaseLocationOverview 
            key={item.id} 
            item={item} 
            style='hover:bg-blue-100'
            specialIcon={selectedItem !== null && item.id === selectedItem.id} 
            handlerClick={() => handlerClick(item)}
          />)
        )}
      </div>
    </>
  );
}

export default function SearchBar() {
  const [input, setInput] = useState('');
  
  const dispatch = useDispatch();
  const selectedLocation = useSelector(selectSelectedLocation);
  const locations = useSelector(selectFilteredLocations);
  
  const handleInputChange = e => {
    const newValue = e.target.value;
    setInput(newValue);
    dispatch(filterLocations(newValue));
  };

  return (
    <div className='fixed left-0 top-0 px-4 pt-4 w-full text-black sm:w-96'>
      <div className='flex p-2 bg-gray-50 rounded shadow-md'>
        <Image src={input===''? 'icon-search-gray.svg': 'icon-search.svg'} alt='Search Icon' width={14} height={14} className='ml-2 mr-3'/>

        <input
          type='text'
          placeholder='Search...'
          value={input}
          className='bg-transparent outline-none h-7 text-lg'
          onChange={handleInputChange}
        />
      </div>

      <div className='mt-4 w-full rounded bg-gray-50 shadow-md' >
        {input!='' && <ResultList list={locations} selectedItem={selectedLocation} handlerClick={(item) => dispatch(setLocation(item))}/>}
      </div>
    </div>
  );
}