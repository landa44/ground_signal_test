import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '@/features/searchBar/locationsSlice';

export default configureStore({
  reducer: {
    locations: locationsReducer,
  },
});
