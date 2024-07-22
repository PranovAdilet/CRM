import {useTranslation} from "react-i18next";
import {ChangeEvent, FC} from "react";
import styles from "@/components/chartTasks/styles.module.scss"

interface ChartInputProps {
    weekCount: number
    setWeekCount: (val: number) => void
}

const ChartInput: FC<ChartInputProps> = ({setWeekCount, weekCount}) => {
    const {t} = useTranslation()
    const handleMaxNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        // if (value > 40) {
        //     alert(t("tasks.alert"))
        //     return
        // }
        setWeekCount(value)
    };
    return (
        <div>
            <label>{t("tasks.label")} </label>
            <input
                className={styles.chart__input}
                type="number"
                value={weekCount}
                onChange={handleMaxNumberChange}
                max={20}
                min={1}
            />
        </div>
    );
};

export default ChartInput;