import {FC, useCallback} from 'react';
import {useTranslation} from "react-i18next";
import {PieChart, Pie, Cell, Tooltip, Legend, PieLabelRenderProps} from 'recharts';
import {ITask} from "@/shared/store/types/types.ts";
import {COLORS, statusesPieCharts} from "./model/helper";
import styles from "./styles.module.scss"

interface StatusPieChartProps {
    tasks: ITask[];
}

const PieChartComponent: FC<StatusPieChartProps> = ({ tasks }) => {
    const {t} = useTranslation()
    const statusFormat = statusesPieCharts(t)

    const getStatusCounts = useCallback((tasks: ITask[]) => {
        const statusCounts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.keys(statusCounts).map(status => ({
            name: statusFormat[status as keyof typeof statusFormat] || status,
            value: statusCounts[status],
        }));
    },[t, statusFormat, tasks]);

    const getLabel = ({name, percent}: PieLabelRenderProps) => {
        const percentage = percent ? (percent * 100).toFixed(0) : '0';
        return `${name}: ${percentage}%`
    }

    const data = getStatusCounts(tasks);

    return (
        <div className={styles.pieChart}>
            <PieChart width={400} height={400} className={styles.pieChart__container}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={getLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend align="left" className={styles.pieChart__legend}/>
            </PieChart>
        </div>
    );
};

export default PieChartComponent;
