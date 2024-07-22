import { createSlice } from "@reduxjs/toolkit";
import {getTasks} from "@/shared/store/actions/tasks.ts";
import {ITasksState} from "../types/types";


const initialState: ITasksState = {
    tasks: [],
    status: null,
    error: null
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status = "resolved";
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    },
});

export default tasksSlice.reducer;
