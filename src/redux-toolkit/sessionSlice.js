import { createSlice, current } from "@reduxjs/toolkit";
import { data } from "../common/data";
import uuid from "react-uuid";

export const sessionSlice = createSlice({
  name: "sessions",
  initialState: data,
  reducers: {
    addExerciseToSession: (state, action) => {
      console.log(
        "🚀 ~ file: sessionSlice.js:10 ~ state:",
        current(state),
        action
      );
      const { payload } = action;
      state?.forEach((session) => {
        if (session.date === payload.date) {
          session.sessions.forEach((item) => {
            if (item.id === payload.id) {
              item.exercises?.push({
                id: uuid(),
                name: payload.name,
                information: payload.information,
              });
            }
          });
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addExerciseToSession } = sessionSlice.actions;

export default sessionSlice.reducer;
