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
    selectedId: null,
  },
  reducers: {
    filterLocations: (state, action) => {
      if(action.payload === ''){
        state.filteredList = [];
      }
      else{
        state.filteredList = state.list.filter( local => 
          local.name.toLowerCase().startsWith(action.payload.toLowerCase())
        );
      }

      for(let item of state.filteredList)
        if(item.id === state.selectedId)
          return;
      state.selectedId = null;
    },
    setLocation: (state, action) => {
      state.selectedId = action.payload;
    }
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

export const { filterLocations, setLocation } = locationsSlice.actions

export const selectSelectedId = (state) => state.locations.selectedId;
export const selectLocations = (state) => state.locations.list;
export const selectFilteredLocations = (state) => state.locations.filteredList;


export default locationsSlice.reducer;