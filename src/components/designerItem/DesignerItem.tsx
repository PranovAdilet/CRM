import {FC} from "react";
import {IDesignerItem} from "@/shared/store/types/types.ts";
import {useTranslation} from "react-i18next";
import styles from "../commentItem/styles.module.scss";

interface IProps extends IDesignerItem{
    completedTasks: number
    medianTaskDuration: number
}

const DesignerItem: FC<IProps> = ({avatar, username, completedTasks, medianTaskDuration}) => {
    const {t} = useTranslation()
    return (
        <div className={styles.card}>
            <div className={styles.card__left}>
                <img
                    className={styles.card__image}
                    src={avatar}
                    alt="avatar"

                />
                <h4 className={styles.card__title}>{username}</h4>
            </div>

            <div>
                <p>{t("home.medianTasks")} {medianTaskDuration.toFixed(2)} часов</p>
                <p>{t("home.numberTasks")} {completedTasks}</p>
            </div>
        </div>
    );
};

export default DesignerItem;