import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '@/pages/api/client';

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
  const response = await client.get('http://localhost:3000/api/fakeData');
  return response.data.locations;
});

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    filteredList: [],
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    filterLocations: (state, action) => {
      if(action.payload === ''){
        state.filteredList = [];
        return;
      }
      state.filteredList = state.list.filter( local => 
        local.name.toLowerCase().startsWith(action.payload.toLowerCase())
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { filterLocations } = locationsSlice.actions

export const selectLocations = (state) => state.locations.list;
export const selectFilteredLocations = (state) => state.locations.filteredList;


export default locationsSlice.reducer;