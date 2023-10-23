import { React, useEffect } from "react";
import SearchBar from "@/features/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  selectFetchStatus,
  statusEnum,
} from "@/features/Location/locationsSlice";
import CustomMap from "@/features/Map/CustomMap";

const DEFAULT_CENTER = [42.354022, -71.046245];

export default function Home() {
  const dispatch = useDispatch();
  const locationsFetchStatus = useSelector(selectFetchStatus);

  useEffect(() => {
    if (locationsFetchStatus === statusEnum.IDLE) {
      dispatch(fetchLocations());
    }
  }, [locationsFetchStatus, dispatch]);

  return (
    <>
      {locationsFetchStatus === statusEnum.FAILED &&
        window.alert("Sorry. We are having some issues.")}

      <CustomMap
        className="w-full h-screen relative -z-0"
        defaultCenter={DEFAULT_CENTER}
      />

      <SearchBar className="fixed left-0 top-0 px-4 pt-4 w-full text-black sm:w-96" />
    </>
  );
}
