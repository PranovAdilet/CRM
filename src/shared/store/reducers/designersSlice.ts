import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { getDesigners } from "../actions/designers";
import {IDesignersState, IFiltersDesigners} from "../types/types";

const initialState: IDesignersState = {
    designers: null,
    filter: {
        key: null,
        status: null,
        page: 1,
        limit: 16
    },
    sortBy: null,
    status: null,
    error: null
};


interface setSortProps {
    key: keyof IFiltersDesigners
    value: string | null | number
}

const designersSlice = createSlice({
    name: "designers",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<setSortProps>) => {
            const { key, value } = action.payload;
            state.filter[key] = value as never;
        },

        setSort: (state, action) => {
            state.sortBy = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDesigners.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getDesigners.fulfilled, (state, action) => {
                state.status = "resolved";
                state.designers = action.payload;
            })
            .addCase(getDesigners.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    },
});

export const {setSort, setFilter} = designersSlice.actions

export default designersSlice.reducer;
