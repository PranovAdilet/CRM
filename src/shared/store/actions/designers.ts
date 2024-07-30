import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/shared/api/instance.ts";
import {IDesignerResponse, IFiltersDesigners} from "../types/types";


type GetDesignerProps = {
    sortBy?: string | null
    filter?: IFiltersDesigners
}
type GetCommentsThunk = AsyncThunk<IDesignerResponse, GetDesignerProps, {}>;

export const getDesigners: GetCommentsThunk = createAsyncThunk(
    "designers/getDesigners",
    async ({sortBy, filter}, {rejectWithValue}) => {
        try {
            const response = await instance(`/designer/`, {
                params: {
                    ordering: sortBy,
                    key: filter?.key,
                    status: filter?.status,
                    limit: filter?.limit,
                    page: filter?.page,
                }
            })
            return response.data
        } catch (err) {
            console.error("Ошибка при получении дезайнеров:", err);
            return rejectWithValue(err);
        }
    }
);
