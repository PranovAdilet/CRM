import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "@/shared/store/actions/comments.ts";
import {ICommentsState} from "../types/types";


const initialState: ICommentsState = {
    comments: [],
    status: null,
    error: null
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.status = "resolved";
                if (action.payload.length > 9){
                    state.comments = action.payload.slice(-9);
                }
            })
            .addCase(getComments.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    },
});


export default commentsSlice.reducer;
