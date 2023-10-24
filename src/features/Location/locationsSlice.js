import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { locationsService } from "@/services/location.service";

export const statusEnum = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => (await locationsService.getLocations()).locations
);

export const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    filteredLocations: [],
    locations: [],
    fetchLocationsInfo: {
      status: statusEnum.IDLE,
      error: null,
    },
    chosenLocation: null,
  },
  reducers: {
    filterLocations: (state, action) => {
      // when the input is empty, go back to initial state of filteredLocations
      if (action.payload === "") {
        state.filteredLocations = [];
      } else {
        state.filteredLocations = state.locations.filter((local) =>
          local.name.toLowerCase().startsWith(action.payload.toLowerCase())
        );
      }

      // if the chosenLocation is not contained in the result filteredLocations we clean the state
      if (
        state.chosenLocation != null &&
        state.filteredLocations.every(
          (location) => location.id !== state.chosenLocation.id
        )
      )
        state.chosenLocation = null;
    },
    setLocation: (state, action) => {
      state.chosenLocation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.fetchLocationsInfo = {
          ...state.fetchLocationsInfo,
          status: statusEnum.LOADING,
        };
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.fetchLocationsInfo = {
          ...state.fetchLocationsInfo,
          status: statusEnum.SUCCEEDED,
        };
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.fetchLocationsInfo = {
          error: action.error.message,
          status: statusEnum.FAILED,
        };
      });
  },
});

export const { filterLocations, setLocation } = locationsSlice.actions;

export const selectChosenLocation = (state) => state.locations.chosenLocation;
export const selectLocations = (state) => state.locations;
export const selectFilteredLocations = (state) =>
  state.locations.filteredLocations;
export const selectFetchError = (state) =>
  state.locations.fetchLocationsInfo.error;
export const selectFetchStatus = (state) =>
  state.locations.fetchLocationsInfo.status;

export default locationsSlice.reducer;
