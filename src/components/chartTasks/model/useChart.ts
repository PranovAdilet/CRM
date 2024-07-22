import { useCallback, useEffect, useState } from "react";
import { addWeeks, endOfWeek, startOfWeek, getWeek } from "date-fns";
import {useAppDispatch} from "@/shared/store";
import { ChartDataTypes, ChartProps } from "./types.ts";

export const useChart = ({ tasks }: ChartProps) => {
    const INITIAL_WEEKS_COUNT = 8;
    const dispatch = useAppDispatch()

    const [data, setData] = useState<ChartDataTypes[]>([]);
    const [weekCount, setWeekCount] = useState(INITIAL_WEEKS_COUNT);

    const processData = useCallback(() => {
        const currentDate = new Date();
        const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

        const weekData: ChartDataTypes[] = [];

        for (let i = 0; i < weekCount; i++) {
            const startOfWeekDate = addWeeks(startOfCurrentWeek, -i);
            const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });

            let profit = 0;
            let expenses = 0;

            tasks.forEach((task) => {
                const taskDate = new Date(task.date_finished);
                const taskStartedByDesigner = new Date(task.date_started_by_designer);
                const taskFinishedByDesigner = new Date(task.date_finished_by_designer);

                if (task.status !== "Done"){
                    return
                }

                //прибыль
                if (taskDate >= startOfWeekDate && taskDate <= endOfWeekDate) {
                    profit += task.received_from_client;
                }

                //расходы
                if (taskStartedByDesigner >= startOfWeekDate && taskFinishedByDesigner <= endOfWeekDate) {
                    expenses +=
                        task.send_to_project_manager +
                        task.send_to_account_manager +
                        task.send_to_designer;
                }
            });

            const calendarWeekNumber = getWeek(startOfWeekDate, { weekStartsOn: 1 });

            weekData.push({
                week: calendarWeekNumber.toString(),
                profit,
                expenses,
                difference: profit - expenses,
                startOfWeekDate,
            });
        }

        setData(weekData.reverse());
    }, [tasks, weekCount, dispatch]);

    useEffect(() => {
        processData();
    }, [tasks, weekCount, processData]);

    return {
        data,
        weekCount,
        setWeekCount,
    };
};
