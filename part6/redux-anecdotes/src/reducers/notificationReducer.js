import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  hidden: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.hidden = false;
    },
    removeNotification: (state) => {
      state.message = "";
      state.hidden = true;
    },
  },
});

export const setNotificationWithTimeout = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification({ message }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, duration * 1000);
  };
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
