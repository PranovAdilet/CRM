import styles from "./styles.module.scss"
import {FC} from "react";
import clsx from "clsx";

interface IProps {
    type?: "empty" | "default"
}

const Error: FC<IProps> = ({type }) => {
    return (
        <>
            {
                type === "empty" ? (
                    <h3 className={clsx("h3", styles.error)}>Упс, нету данных</h3>
                    ) : (
                    <h3 className="h3">Упс, произошла ошибка при запросе</h3>
                )
            }
        </>
    );
};

export default Error;