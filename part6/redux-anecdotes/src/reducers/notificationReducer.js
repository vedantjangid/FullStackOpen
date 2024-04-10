import { createSlice } from "@reduxjs/toolkit";

const notification = {
  message: "",
  hidden: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notification,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
      state.hidden = false;
    },
    removeNotification: (state) => {
      state.message = "";
      state.hidden = true;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
