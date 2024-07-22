import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Loading from "@/components/UI/loading/Loading.tsx";
import ChartTasks from "@/components/chartTasks/Chart"
import PieChartTasks from "@/components/pieChartTasks/PieChartTasks.tsx";
import Tabs from "@/components/UI/tabs/Tabs.tsx";
import {getTasks} from "@/shared/store/actions/tasks.ts";
import {selectTasks, useAppDispatch, useTypedSelector} from "@/shared/store";

import {typeChartButtons} from "./model/helper";
import styles from "./styles.module.scss"

const Tasks = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation()
    const {tasks, status} = useTypedSelector(selectTasks)
    const [type, setType] = useState("lineChart");

    useEffect(() => {
        dispatch(getTasks())
    }, []);

    if (status === "loading"){
        return <Loading/>
    }
    if (status === "rejected"){
        return <h3 className="h3">Упс, произошла ошибка при запросе</h3>
    }

    return (
        <div className={styles.tasks}>
            <Tabs
                type={type}
                setType={setType}
                options={typeChartButtons(t)}
            />
            {
                type === "lineChart" ? (
                    <ChartTasks tasks={tasks}/>
                ) : (
                    <PieChartTasks tasks={tasks}/>
                )
            }

        </div>
    );
};

export default Tasks;