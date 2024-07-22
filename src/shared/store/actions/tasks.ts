import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/shared/api/instance.ts";
import {ITask} from "../types/types"


type GetCommentsThunk = AsyncThunk<ITask[], void, {}>;

export const getTasks: GetCommentsThunk = createAsyncThunk(
    "issues/getIssues",
    async () => {
        try {
            const response= await instance.get("/issue/");
            return response.data;
        } catch (err) {
            console.error("Ошибка при получении задач:", err);
            throw err;
        }
    }
);
