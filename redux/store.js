import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import donorReducer from './donorSlice';


const store = configureStore({
  reducer: {
    form: formReducer,
    donor: donorReducer,
  },
});

export default store;
