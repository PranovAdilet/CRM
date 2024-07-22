import { combineReducers } from "@reduxjs/toolkit";
import comments from "./commentsSlice";
import designers from "./designersSlice";
import tasks from "./tasksSlice.ts";

const rootReducer = combineReducers({
    comments,
    designers,
    tasks
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
