import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { filterLocations, selectFilteredLocations, fetchLocations } from './locationsSlice';
import { useSelector, useDispatch } from 'react-redux';

const ItemList = ({item}) => {
  return (
    <>
      <div className="flex p-2">
        <Image src="icon-pin.svg" alt="Pin Icon" width={17} height={17} className="ml-2 mr-3" />

        <div >
            <p className='text-sm font-bold'>{item.name}</p>
            <p className='text-sm text-gray-400'>{`${item.location.lat}, ${item.location.lon}`}</p>

        </div>
      </div>
    </>
  );
}

const ResultList = ({list}) => {
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
      <div classname='mb-2'>
        {list.map( (item)=> (<ItemList key={item.id} item={item}/>))}
      </div>
    </>
  );
}

export default function SearchBar() {
  const handleInputChange = e => {
    const newValue = e.target.value;
    setInput(newValue);
    dispatch(filterLocations(newValue));
  };

  const [input, setInput] = useState('');

  const dispatch = useDispatch();
  const locations = useSelector(selectFilteredLocations);
  const locationsStatus = useSelector(state => state.locations.status);
  const error = useSelector(state => state.locations.error);

  useEffect(() => {
    if (locationsStatus === 'idle') {
      dispatch(fetchLocations());
    }
  }, [locationsStatus, dispatch]);

  return (
    <div className="fixed left-4 top-4 w-96">
      <div className='flex p-2 bg-gray-50 rounded'>
        <Image src={input===''? "icon-search-gray.svg": "icon-search.svg"} alt="Search Icon" width={14} height={14} className="ml-2 mr-3"/>

        <input
          type="text"
          placeholder="Search..."
          value={input}
          className="bg-transparent outline-none h-7 text-lg"
          onChange={handleInputChange}
        />
      </div>

      <div className='mt-4 w-full rounded bg-gray-50' >
        {input!='' && <ResultList list={locations}/>}
      </div>
    </div>
  );
}