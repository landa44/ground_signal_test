import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '@/features/Location/locationsSlice';

export default configureStore({
  reducer: {
    locations: locationsReducer,
  },
});
