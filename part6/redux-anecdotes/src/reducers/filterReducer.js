import { createSlice } from "@reduxjs/toolkit";

// Create slice using createSlice
const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

// Extract action creator from slice
export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
