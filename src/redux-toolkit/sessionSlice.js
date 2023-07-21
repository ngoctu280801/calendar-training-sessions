import { createSlice, current } from "@reduxjs/toolkit";
import { data } from "../common/data";
import uuid from "react-uuid";

export const sessionSlice = createSlice({
  name: "sessions",
  initialState: data,
  reducers: {
    addExerciseToSession: (state, action) => {
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
    addSession: (state, action) => {
      const { payload } = action;
      const filterDate = state?.filter((item) => item.date === payload.date);
      if (filterDate.length > 0) {
        state?.forEach((session) => {
          if (session.date === payload.date) {
            session.sessions.push({
              id: uuid(),
              name: payload.name,
              exercises: [],
            });
          }
        });
      } else {
        state.push({
          date: payload.date,
          sessions: [{ id: uuid(), name: payload.name, exercises: [] }],
        });
      }
    },
    changeIndexOfExercise: (state, action) => {
      const { payload } = action;
      state?.forEach((session) => {
        if (session.date === payload.date) {
          session.sessions.forEach((item) => {
            if (item.id === payload.id) {
              item.exercises = payload.exercises;
            }
          });
        }
      });
    },
    changeSessionInDay: (state, action) => {
      const { payload } = action;
      state?.forEach((session) => {
        if (session.date === payload.date) {
          session.sessions = payload.sessions;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addExerciseToSession,
  addSession,
  changeIndexOfExercise,
  changeSessionInDay,
} = sessionSlice.actions;

export default sessionSlice.reducer;
