import { configureStore } from '@reduxjs/toolkit';
import searchInputReducer from '@/features/searchBar/searchInputSlice';

export default configureStore({
  reducer: {
    searchInput: searchInputReducer,
  },
});
