import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../../../types";

interface ChatState {
  list: Chat[];
}

const initialState: ChatState = {
  list: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setChats } = chatSlice.actions;
export default chatSlice.reducer;
