import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterStatus } from "../enums/CharacterStatus";

const initialState: string = "";
const favoriteChar = createSlice({
  name: "favoriteChar",
  initialState,
  reducers: {
    setFavoriteChar: (state, action: PayloadAction<string>) => {
      const favChar = action.payload;
      if (favChar === state) {
        state = "";
      } else {
        state = favChar;
      }
      return state;
    },
  },
});

export const { setFavoriteChar } = favoriteChar.actions;

export default favoriteChar.reducer;
