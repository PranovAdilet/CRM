import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/shared/api/instance.ts";
import {IComment} from "../types/types"


type GetCommentsThunk = AsyncThunk<IComment[], void, {}>;

export const getComments: GetCommentsThunk = createAsyncThunk(
    "comments/getComments",
    async () => {
        try {
            const response= await instance.get("/comment/");
            return response.data;
        } catch (err) {
            console.error("Ошибка при получении комментариев:", err);
            throw err;
        }
    }
);
