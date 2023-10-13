import { createSlice } from '@reduxjs/toolkit'

export const searchInputSlice = createSlice({
  name: 'searchInput',
  initialState: {
    input: '',
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.input = action.payload
    },
  },
})

export const { setSearchInput } = searchInputSlice.actions

export const selectSearchInput = (state) => state.searchInput.input

export default searchInputSlice.reducer