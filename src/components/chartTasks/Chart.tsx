import {FC} from 'react';
import {useTranslation} from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartInput from "../UI/input/ChartInput.tsx";

import {chartsBarData} from "./model/helper.ts";
import {useChart} from "./model/useChart.ts";
import {useLocalize} from "./model/useLocalize.ts";
import type {ChartProps} from "./model/types.ts";
import styles from "./styles.module.scss"

const TasksChart: FC<ChartProps> = ({ tasks }) => {
    const {t} = useTranslation()

    const {
        data,
        weekCount,
        setWeekCount
    } = useChart({tasks})

    const localizedData = useLocalize(data)

    return (
        <div className={styles.chart}>
            <h2 className={styles.chart__title}>{t("tasks.title")}</h2>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={localizedData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="week"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {
                        chartsBarData(t).map(({dataKey, name, fill}) =>
                            <Bar
                                dataKey={dataKey}
                                fill={fill}
                                name={name}
                                key={name}
                            />
                        )
                    }
                </BarChart>
            </ResponsiveContainer>

            <ChartInput weekCount={weekCount} setWeekCount={setWeekCount}/>

        </div>
    );
};

export default TasksChart;
