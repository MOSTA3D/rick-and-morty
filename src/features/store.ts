import { configureStore } from "@reduxjs/toolkit";
import setColorMapperReducer from "./statusColorMapperSlice";
import favoriteCharReducer from "./favoriteCar";

const store = configureStore({
  reducer: {
    colorStatusMapper: setColorMapperReducer,
    favoriteChar: favoriteCharReducer,
  },
});


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
