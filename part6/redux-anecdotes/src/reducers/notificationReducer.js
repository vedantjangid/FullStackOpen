import { createSlice } from "@reduxjs/toolkit";

const notification = {
  message: "Voted",
  hidden: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notification,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
