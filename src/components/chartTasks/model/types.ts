import {ITask} from "@/shared/store/types/types.ts";

export interface ChartDataTypes {
    week: string;
    profit: number;
    expenses: number;
    difference: number;
    startOfWeekDate: Date;
}

export interface ChartProps {
    tasks: ITask[];
}