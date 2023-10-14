import React, {useEffect} from 'react';
import Image from 'next/image';
import { filterLocations, selectFilteredLocations, fetchLocations } from './locationsSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function SearchBar() {
  const handleInputChange = e => {
    const newValue = e.target.value;
    dispatch(filterLocations(newValue));
  };

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
    <div>
      <div className="absolute left-4 top-4 w-96">
        <Image src="icon-search.svg" alt="Search Icon" width={15} height={15} className="absolute left-4 top-1/2  -translate-y-1/2"/>
    
        <input
          type="text"
          placeholder="Search..."
          className="pl-14 w-full border rounded p-2 h-12 bg-gray-50 outline-none"
          onChange={handleInputChange}
        />
      </div>

    </div>
  );
}