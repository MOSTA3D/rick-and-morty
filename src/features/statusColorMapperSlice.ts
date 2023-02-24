import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterStatus } from "../enums/CharacterStatus";

export interface StatusColorMapperState {
  [CharacterStatus.Dead]: string;
  [CharacterStatus.Alive]: string;
  [CharacterStatus.Unknown]: string;
}

interface SetStatusColorPayload {
  status: CharacterStatus;
  color: string;
}

const initialState: StatusColorMapperState = {
  [CharacterStatus.Dead]: "",
  [CharacterStatus.Alive]: "",
  [CharacterStatus.Unknown]: "",
};

const statusColorMapperSlice = createSlice({
  name: "statusColorMapper",
  initialState,
  reducers: {
    setStatusColor: (state, action: PayloadAction<SetStatusColorPayload>) => {
      const { status, color } = action.payload;
      state[status] = color;
    },
    setStatusColorMapper: (
      state,
      action: PayloadAction<StatusColorMapperState>
    ) => {
      state = action.payload;
    },
  },
});

export const { setStatusColor, setStatusColorMapper } = statusColorMapperSlice.actions;

export default statusColorMapperSlice.reducer;
