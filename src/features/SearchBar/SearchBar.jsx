import { React, useState } from "react";
import Image from "next/image";
import {
  filterLocations,
  selectFilteredLocations,
  selectChosenLocation,
  setLocation,
} from "../Location/locationsSlice";
import { useSelector, useDispatch } from "react-redux";
import BaseLocationOverview from "@/components/BaseLocationOverview";
import useDebounce from "@/hooks/debounce";

const ResultList = ({ filteredLocations, selectedItem, handlerClick }) => {
  return (
    <>
      {/* in case we don't have result to show a red banner shows up */}
      {filteredLocations.length === 0 ? (
        <div className="p-2 bg-red-500 rounded">
          <p className="text-sm text-gray-50 ml-2">
            Sorry, any data matched with this prefix
          </p>
        </div>
      ) : (
        <div className="p-2 bg-blue-500 rounded-t">
          <p className="text-sm text-gray-50 ml-2">
            Found {filteredLocations.length} Results:
          </p>
        </div>
      )}
      <ul className="mb-2">
        {filteredLocations.map((item) => (
          <li key={item.id}>
            <BaseLocationOverview
              item={item}
              style="hover:bg-blue-100"
              specialIcon={selectedItem !== null && item.id === selectedItem.id}
              handlerClick={() => handlerClick(item)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default function SearchBar({ className }) {
  const [input, setInput] = useState("");
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);

  const dispatch = useDispatch();
  const chosenLocation = useSelector(selectChosenLocation);
  const locations = useSelector(selectFilteredLocations);

  //updating the debounce with the new input typed
  const debouncedRequest = useDebounce(() => {
    dispatch(filterLocations(input));
    //setting the search as completed to render the list of results
    setIsSearchCompleted(true);
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
    //initializing the search process and hiding results until filter is done
    setIsSearchCompleted(false);

    debouncedRequest();
  };

  return (
    <div className={className}>
      <div className="flex p-2 bg-gray-50 rounded shadow-md">
        <Image
          src={input === "" ? "icon-search-gray.svg" : "icon-search.svg"}
          alt="Search Icon"
          width={14}
          height={14}
          className="ml-2 mr-3"
        />

        <input
          type="text"
          placeholder="Search..."
          value={input}
          className="bg-transparent outline-none h-7 text-lg"
          onChange={handleInputChange}
        />
      </div>

      {isSearchCompleted && (
        <div className="mt-4 w-full rounded bg-gray-50 shadow-md">
          {input != "" && (
            <ResultList
              filteredLocations={locations}
              selectedItem={chosenLocation}
              handlerClick={(item) => dispatch(setLocation(item))}
            />
          )}
        </div>
      )}
    </div>
  );
}
